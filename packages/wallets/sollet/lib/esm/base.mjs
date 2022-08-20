import { BaseMessageSignerWalletAdapter, scopePollingDetectionStrategy, WalletAdapterNetwork, WalletConfigError, WalletConnectionError, WalletDisconnectedError, WalletDisconnectionError, WalletError, WalletLoadError, WalletNotConnectedError, WalletNotReadyError, WalletPublicKeyError, WalletReadyState, WalletSignMessageError, WalletSignTransactionError, WalletTimeoutError, WalletWindowBlockedError, WalletWindowClosedError, } from '@solana/wallet-adapter-base';
export class BaseSolletWalletAdapter extends BaseMessageSignerWalletAdapter {
    constructor({ provider, network = WalletAdapterNetwork.Mainnet, timeout = 10000 } = {}) {
        super();
        this._readyState = typeof window === 'undefined' || typeof document === 'undefined'
            ? WalletReadyState.Unsupported
            : WalletReadyState.NotDetected;
        this._disconnected = () => {
            const wallet = this._wallet;
            if (wallet) {
                wallet.off('disconnect', this._disconnected);
                this._wallet = null;
                this.emit('error', new WalletDisconnectedError());
                this.emit('disconnect');
            }
        };
        this._provider = provider;
        this._network = network;
        this._timeout = timeout;
        this._connecting = false;
        this._wallet = null;
        if (this._readyState !== WalletReadyState.Unsupported) {
            if (typeof this._provider === 'string') {
                this._readyState = WalletReadyState.Loadable;
            }
            else {
                scopePollingDetectionStrategy(() => {
                    var _a;
                    if (typeof ((_a = window.sollet) === null || _a === void 0 ? void 0 : _a.postMessage) === 'function') {
                        this._readyState = WalletReadyState.Installed;
                        this.emit('readyStateChange', this._readyState);
                        return true;
                    }
                    return false;
                });
            }
        }
    }
    get publicKey() {
        var _a;
        return ((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.publicKey) || null;
    }
    get connecting() {
        return this._connecting;
    }
    get connected() {
        var _a;
        return !!((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.connected);
    }
    get readyState() {
        return this._readyState;
    }
    async connect() {
        try {
            if (this.connected || this.connecting)
                return;
            if (this._readyState !== WalletReadyState.Loadable && this._readyState !== WalletReadyState.Installed)
                throw new WalletNotReadyError();
            this._connecting = true;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const provider = this._provider || window.sollet;
            let SolWalletAdapterClass;
            try {
                ({ default: SolWalletAdapterClass } = await import('@project-serum/sol-wallet-adapter'));
            }
            catch (error) {
                throw new WalletLoadError(error === null || error === void 0 ? void 0 : error.message, error);
            }
            let wallet;
            try {
                wallet = new SolWalletAdapterClass(provider, this._network);
            }
            catch (error) {
                throw new WalletConfigError(error === null || error === void 0 ? void 0 : error.message, error);
            }
            try {
                // HACK: sol-wallet-adapter doesn't reject or emit an event if the popup or extension is closed or blocked
                const handleDisconnect = wallet.handleDisconnect;
                let timeout;
                let interval;
                try {
                    await new Promise((resolve, reject) => {
                        const connect = () => {
                            if (timeout)
                                clearTimeout(timeout);
                            wallet.off('connect', connect);
                            resolve();
                        };
                        wallet.handleDisconnect = (...args) => {
                            wallet.off('connect', connect);
                            reject(new WalletWindowClosedError());
                            return handleDisconnect.apply(wallet, args);
                        };
                        wallet.on('connect', connect);
                        wallet.connect().catch((reason) => {
                            wallet.off('connect', connect);
                            reject(reason);
                        });
                        if (typeof provider === 'string') {
                            let count = 0;
                            interval = setInterval(() => {
                                const popup = wallet._popup;
                                if (popup) {
                                    if (popup.closed)
                                        reject(new WalletWindowClosedError());
                                }
                                else {
                                    if (count > 50)
                                        reject(new WalletWindowBlockedError());
                                }
                                count++;
                            }, 100);
                        }
                        else {
                            // HACK: sol-wallet-adapter doesn't reject or emit an event if the extension is closed or ignored
                            timeout = setTimeout(() => reject(new WalletTimeoutError()), this._timeout);
                        }
                    });
                }
                finally {
                    wallet.handleDisconnect = handleDisconnect;
                    if (interval)
                        clearInterval(interval);
                }
            }
            catch (error) {
                if (error instanceof WalletError)
                    throw error;
                throw new WalletConnectionError(error === null || error === void 0 ? void 0 : error.message, error);
            }
            if (!wallet.publicKey)
                throw new WalletPublicKeyError();
            wallet.on('disconnect', this._disconnected);
            this._wallet = wallet;
            this.emit('connect', wallet.publicKey);
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
        finally {
            this._connecting = false;
        }
    }
    async disconnect() {
        const wallet = this._wallet;
        if (wallet) {
            wallet.off('disconnect', this._disconnected);
            this._wallet = null;
            // HACK: sol-wallet-adapter doesn't reliably fulfill its promise or emit an event on disconnect
            const handleDisconnect = wallet.handleDisconnect;
            try {
                await new Promise((resolve, reject) => {
                    const timeout = setTimeout(() => resolve(), 250);
                    wallet.handleDisconnect = (...args) => {
                        clearTimeout(timeout);
                        resolve();
                        // HACK: sol-wallet-adapter rejects with an uncaught promise error
                        wallet._responsePromises = new Map();
                        return handleDisconnect.apply(wallet, args);
                    };
                    wallet.disconnect().then(() => {
                        clearTimeout(timeout);
                        resolve();
                    }, (error) => {
                        clearTimeout(timeout);
                        // HACK: sol-wallet-adapter rejects with an error on disconnect
                        if ((error === null || error === void 0 ? void 0 : error.message) === 'Wallet disconnected') {
                            resolve();
                        }
                        else {
                            reject(error);
                        }
                    });
                });
            }
            catch (error) {
                this.emit('error', new WalletDisconnectionError(error === null || error === void 0 ? void 0 : error.message, error));
            }
            finally {
                wallet.handleDisconnect = handleDisconnect;
            }
        }
        this.emit('disconnect');
    }
    async signTransaction(transaction) {
        try {
            const wallet = this._wallet;
            if (!wallet)
                throw new WalletNotConnectedError();
            try {
                return (await wallet.signTransaction(transaction)) || transaction;
            }
            catch (error) {
                throw new WalletSignTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
            }
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    async signAllTransactions(transactions) {
        try {
            const wallet = this._wallet;
            if (!wallet)
                throw new WalletNotConnectedError();
            try {
                return (await wallet.signAllTransactions(transactions)) || transactions;
            }
            catch (error) {
                throw new WalletSignTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
            }
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    async signMessage(message) {
        try {
            const wallet = this._wallet;
            if (!wallet)
                throw new WalletNotConnectedError();
            try {
                const { signature } = await wallet.sign(message, 'utf8');
                return Uint8Array.from(signature);
            }
            catch (error) {
                throw new WalletSignMessageError(error === null || error === void 0 ? void 0 : error.message, error);
            }
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
}
//# sourceMappingURL=base.js.map