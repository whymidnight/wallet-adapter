import { BaseMessageSignerWalletAdapter, scopePollingDetectionStrategy, WalletAccountError, WalletConnectionError, WalletDisconnectedError, WalletDisconnectionError, WalletError, WalletNotConnectedError, WalletNotReadyError, WalletPublicKeyError, WalletReadyState, WalletSendTransactionError, WalletSignMessageError, WalletSignTransactionError, } from '@solana/wallet-adapter-base';
import { PublicKey } from '@solana/web3.js';
export const AvanaWalletName = 'Avana';
export class AvanaWalletAdapter extends BaseMessageSignerWalletAdapter {
    constructor(config = {}) {
        super();
        this.name = AvanaWalletName;
        this.url = 'https://www.avanawallet.com';
        this.icon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNi4yLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAyODkuNzg3ODEgMjg5Ljc4NzgxIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyODkuNzg3ODEgMjg5Ljc4NzgxIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiMxQzFDMUMiIGQ9Ik0yMTguNDM5MDEsMjg5Ljc4NzgxSDcxLjM0ODhDMzEuOTQzOTUsMjg5Ljc4NzgxLDAsMjU3Ljg0Mzg3LDAsMjE4LjQzOTAxVjcxLjM0ODgNCglDMCwzMS45NDM5NSwzMS45NDM5NSwwLDcxLjM0ODgsMGgxNDcuMDkwMjFjMzkuNDA0ODYsMCw3MS4zNDg4LDMxLjk0Mzk1LDcxLjM0ODgsNzEuMzQ4OHYxNDcuMDkwMjENCglDMjg5Ljc4NzgxLDI1Ny44NDM4NywyNTcuODQzODcsMjg5Ljc4NzgxLDIxOC40MzkwMSwyODkuNzg3ODF6Ii8+DQo8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzFfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjczLjU4NTUzIiB5MT0iMjE3Ljk4MDgzIiB4Mj0iMjA4LjY0NzQ5IiB5Mj0iLTY0LjU5NzU2IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMjkwLjc5MzAzKSI+DQoJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzE2RkVBOCIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuNCIgc3R5bGU9InN0b3AtY29sb3I6IzAwREFGRiIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuOTIiIHN0eWxlPSJzdG9wLWNvbG9yOiNEQzFGRkYiLz4NCgk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojREMxRkZGIi8+DQo8L2xpbmVhckdyYWRpZW50Pg0KPHBhdGggZmlsbD0idXJsKCNTVkdJRF8xXykiIGQ9Ik0yMzUuNzgxMjIsMjE3LjA0NTMzTDE1Ny43MjQ0Myw0OC40NTUyMmMtNS4wMzU4MS0xMC45MjA1NC0yMC41Mzk3Ni0xMC45MjA1NC0yNS41NzU1OSwwDQoJbC0zOS4xODM4OSw4NC41OTIxNGMtMS4xMDM0MiwyLjQwNDcyLTEuNjQwOTcsNC45NzkzNy0xLjY0MDk3LDcuNDY5MDZjMCw3LjEwMTA3LDQuMjQzNzUsMTMuODkxMTMsMTEuNDAxNDQsMTYuNjYzNjQNCgljOC44ODM2NCwzLjQ1MTY4LDE4LjkyNzEzLTEuMTAzMjMsMjIuOTQ0NjYtOS43NjA0OGw5Ljc4ODgyLTIxLjEzMzk2YzMuNzM0NTEtOC4wOTEzOCwxNS4yMjA5Mi04LjA5MTM4LDE4Ljk1NTQ2LDANCglsMTYuNDQ4MiwzNS41NTM0M2MyLjQxMjAyLDUuMjEzNjctMS43MDg5MiwxMS4wMjA4My03LjQzNzA5LDEwLjU4NzAxYy02Ny42NzI1LTUuMTI0OTQtMTA1LjA3MzAzLDM4LjcwMzA5LTEwNi4xNjQ3Niw0MC4wMDc3NA0KCWMtMC4wMjgxNCwwLjAyODMxLTAuMDI4MTQsMC4wMjgzMS0wLjAyODE0LDAuMDI4MzFjLTMuMDI3MjMsMy4xOTY5OS00Ljg5NDU4LDcuNDY5MDYtNC44OTQ1OCwxMi4yNTAxOA0KCWMwLDkuODE3MzEsNy45NDk5NCwxNy43NjcyNiwxNy43Mzg5MywxNy43NjcyNmM1LjE3NzQzLDAsOS44NDU0NS0yLjIzNDk5LDEzLjA5OTA1LTUuNzcxNDRjMCwwLDAuMDg0NzktMC4xMTMzLDAuMjU0NTMtMC4zMTEzNg0KCWMwLjExMzI4LTAuMTEzMTEsMC4yNTQ3MS0wLjI1NDUzLDAuMzk2MTMtMC40MjQyNmM0Ljk0NjEtNS4zMDEyNSwzNy42MTI0LTM3LjM5MDI3LDkyLjA2NjE1LTI2LjM1OTA3DQoJYzEyLjAxNzc4LDIuNDM0NTQsMjIuMDQ5NjgsMTAuNjgxNywyNy4yMTE2MiwyMS44MDQxNGwwLDBjMy4wMjcyMiw2LjUzNTM3LDkuNTA1OTcsMTEuMDYxOTgsMTYuNzIwMjksMTAuOTc3MDENCglDMjMyLjcyNTY2LDI0Mi4yMjQ4MiwyNDEuMjEzMTcsMjI4Ljc4NjI1LDIzNS43ODEyMiwyMTcuMDQ1MzN6Ii8+DQo8L3N2Zz4NCg==';
        this._readyState = typeof window === 'undefined' || typeof document === 'undefined'
            ? WalletReadyState.Unsupported
            : WalletReadyState.NotDetected;
        this._disconnected = () => {
            const wallet = this._wallet;
            if (wallet) {
                wallet.off('disconnect', this._disconnected);
                this._wallet = null;
                this._publicKey = null;
                this.emit('error', new WalletDisconnectedError());
                this.emit('disconnect');
            }
        };
        this._connecting = false;
        this._wallet = null;
        this._publicKey = null;
        if (this._readyState !== WalletReadyState.Unsupported) {
            scopePollingDetectionStrategy(() => {
                var _a, _b;
                if ((_b = (_a = window.avana) === null || _a === void 0 ? void 0 : _a.solana) === null || _b === void 0 ? void 0 : _b.isAvana) {
                    this._readyState = WalletReadyState.Installed;
                    this.emit('readyStateChange', this._readyState);
                    return true;
                }
                return false;
            });
        }
    }
    get publicKey() {
        return this._publicKey;
    }
    get connecting() {
        return this._connecting;
    }
    get connected() {
        var _a;
        return !!((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.isConnected);
    }
    get readyState() {
        return this._readyState;
    }
    async connect() {
        try {
            if (this.connected || this.connecting)
                return;
            if (this._readyState !== WalletReadyState.Installed)
                throw new WalletNotReadyError();
            this._connecting = true;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const wallet = window.avana.solana;
            if (!wallet.isConnected) {
                try {
                    return await wallet.connect();
                }
                catch (error) {
                    throw new WalletConnectionError(error === null || error === void 0 ? void 0 : error.message, error);
                }
            }
            if (!wallet.publicKey)
                throw new WalletAccountError();
            let publicKey;
            try {
                publicKey = new PublicKey(wallet.publicKey.toBytes());
            }
            catch (error) {
                throw new WalletPublicKeyError(error === null || error === void 0 ? void 0 : error.message, error);
            }
            wallet.on('disconnect', this._disconnected);
            this._wallet = wallet;
            this._publicKey = publicKey;
            this.emit('connect', publicKey);
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
            this._publicKey = null;
            try {
                await wallet.disconnect();
            }
            catch (error) {
                this.emit('error', new WalletDisconnectionError(error === null || error === void 0 ? void 0 : error.message, error));
            }
        }
        this.emit('disconnect');
    }
    async sendTransaction(transaction, connection, options = {}) {
        try {
            const wallet = this._wallet;
            if (!wallet)
                throw new WalletNotConnectedError();
            try {
                transaction = await this.prepareTransaction(transaction, connection);
                const { signers, ...sendOptions } = options;
                (signers === null || signers === void 0 ? void 0 : signers.length) && transaction.partialSign(...signers);
                sendOptions.preflightCommitment = sendOptions.preflightCommitment || connection.commitment;
                const { signature } = await wallet.signAndSendTransaction(transaction, sendOptions);
                return signature;
            }
            catch (error) {
                if (error instanceof WalletError)
                    throw error;
                throw new WalletSendTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
            }
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
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
                const { signature } = await wallet.signMessage(message);
                return signature;
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
//# sourceMappingURL=adapter.js.map