import { BaseMessageSignerWalletAdapter, scopePollingDetectionStrategy, WalletAccountError, WalletNotConnectedError, WalletNotReadyError, WalletPublicKeyError, WalletReadyState, WalletSignMessageError, WalletSignTransactionError, } from '@solana/wallet-adapter-base';
import { PublicKey } from '@solana/web3.js';
export const CloverWalletName = 'Clover';
export class CloverWalletAdapter extends BaseMessageSignerWalletAdapter {
    constructor(config = {}) {
        super();
        this.name = CloverWalletName;
        this.url = 'https://clover.finance';
        this.icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzQiIGhlaWdodD0iNzQiIHZpZXdCb3g9IjAgMCA3NCA3NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTczLjg5NDcgMTguNTc4OEM3My44OTQ3IDI4Ljc4MTUgNjUuNjIzOCAzNy4wNTI1IDU1LjQyMTEgMzcuMDUyNUM0NS4yNTczIDM3LjA1MjUgMzcuMDEwNiAyOC44NDQ2IDM2Ljk0NzcgMTguNjk1NkMzNi44ODUzIDI4LjgxMyAyOC42ODk5IDM3LjAwMTUgMTguNTY5OSAzNy4wNTI3QzI4LjcyODQgMzcuMTA0NSAzNi45NDc0IDQ1LjM1NTUgMzYuOTQ3NCA1NS41MjYyQzM2Ljk0NzQgNjUuNzI4OSAyOC42NzY0IDczLjk5OTggMTguNDczNyA3My45OTk4QzguMjcwOTUgNzMuOTk5OCAwIDY1LjcyODkgMCA1NS41MjYyQzAgNDUuMzU1MyA4LjIxOTM5IDM3LjEwNDEgMTguMzc4MiAzNy4wNTI3QzguMjE5NzIgMzcuMDAwOSAwLjAwMDcxOTU3MiAyOC43NDk5IDAuMDAwNzE5NTcyIDE4LjU3OTNDMC4wMDA3MTk1NzIgOC4zNzY1NCA4LjI3MTY3IDAuMTA1NTkxIDE4LjQ3NDQgMC4xMDU1OTFDMjguNjM4MiAwLjEwNTU5MSAzNi44ODQ5IDguMzEzNDggMzYuOTQ3NyAxOC40NjI1QzM3LjAxMDMgOC4zMTMyNiA0NS4yNTcxIDAuMTA1MTAzIDU1LjQyMTEgMC4xMDUxMDNDNjUuNjIzOCAwLjEwNTEwMyA3My44OTQ3IDguMzc2MDUgNzMuODk0NyAxOC41Nzg4Wk01NS40MjExIDM3LjA1MjVDNDUuMjE4MyAzNy4wNTI1IDM2Ljk0NzQgNDUuMzIzNCAzNi45NDc0IDU1LjUyNjJDMzYuOTQ3NCA2NS43Mjg5IDQ1LjIxODMgNzMuOTk5OCA1NS40MjExIDczLjk5OThDNjUuNjIzOCA3My45OTk4IDczLjg5NDcgNjUuNzI4OSA3My44OTQ3IDU1LjUyNjJDNzMuODk0NyA0NS4zMjM0IDY1LjYyMzggMzcuMDUyNSA1NS40MjExIDM3LjA1MjVaIiBmaWxsPSIjMjdBNTc3Ii8+PC9zdmc+Cg==';
        this._readyState = typeof window === 'undefined' || typeof document === 'undefined'
            ? WalletReadyState.Unsupported
            : WalletReadyState.NotDetected;
        this._connecting = false;
        this._wallet = null;
        this._publicKey = null;
        if (this._readyState !== WalletReadyState.Unsupported) {
            scopePollingDetectionStrategy(() => {
                var _a;
                if ((_a = window.clover_solana) === null || _a === void 0 ? void 0 : _a.isCloverWallet) {
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
            const wallet = window.clover_solana;
            let account;
            try {
                account = await wallet.getAccount();
            }
            catch (error) {
                throw new WalletAccountError(error === null || error === void 0 ? void 0 : error.message, error);
            }
            let publicKey;
            try {
                publicKey = new PublicKey(account);
            }
            catch (error) {
                throw new WalletPublicKeyError(error === null || error === void 0 ? void 0 : error.message, error);
            }
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
        if (this._wallet) {
            this._wallet = null;
            this._publicKey = null;
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
                const { signature } = await wallet.signMessage(message);
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
//# sourceMappingURL=adapter.js.map