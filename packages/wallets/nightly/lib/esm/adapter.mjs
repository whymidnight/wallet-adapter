import { BaseSignerWalletAdapter, scopePollingDetectionStrategy, WalletAccountError, WalletConnectionError, WalletDisconnectedError, WalletNotConnectedError, WalletNotReadyError, WalletPublicKeyError, WalletReadyState, WalletSignTransactionError, } from '@solana/wallet-adapter-base';
import { PublicKey } from '@solana/web3.js';
export const NightlyWalletName = 'Nightly';
export class NightlyWalletAdapter extends BaseSignerWalletAdapter {
    constructor() {
        super();
        this.name = NightlyWalletName;
        this.url = 'https://nightly.app';
        this.icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ4IDk2Qzc0LjUwOTcgOTYgOTYgNzQuNTA5NyA5NiA0OEM5NiAyMS40OTAzIDc0LjUwOTcgMCA0OCAwQzIxLjQ5MDMgMCAwIDIxLjQ5MDMgMCA0OEMwIDc0LjUwOTcgMjEuNDkwMyA5NiA0OCA5NloiIGZpbGw9IiM2RDczRjgiLz4KPHBhdGggZD0iTTQ4IDg1LjYzNTZDNDggODUuNjM1NiA1Mi40NTMzIDg1LjYzNTYgNTUuNDQgODIuNTg2N0M1OC45MTU1IDc5LjI4MDEgNTcuMzUxMSA3NS40MzEyIDYyLjI3NTUgNzEuNDMxMkM2Ni45ODY2IDY3LjY0NDUgNzIuOTI0NCA3MC4zMzc5IDcyLjkyNDQgNzAuMzM3OUM3Ny4wMjIyIDYyLjEyNDUgNzQuNzkxMSA1Mi41NjkgNzQuNzkxMSA1Mi41NjlDODEuNzY4OCAzNC4yNTc5IDc1Ljk2NDQgMjEuMTU1NyA3NC40NDQ0IDE3LjM2MDFDNjkuNDQ4OCAyNC4zMzc5IDYzLjE5MTEgMjkuMTczNCA1NS43OTU1IDMyLjQwOUM1My4yMjY2IDMxLjcwNjggNTAuNTk1NSAzMS4zMzM0IDQ4IDMxLjM2MDFDNDUuNDEzMyAzMS4zMzM0IDQyLjc3MzMgMzEuNzA2OCA0MC4yMDQ0IDMyLjQwOUMzMi44MTc3IDI5LjE2NDUgMjYuNTUxMSAyNC4zMzc5IDIxLjU1NTUgMTcuMzYwMUMyMC4wMzU1IDIxLjE1NTcgMTQuMjMxMSAzNC4yNTc5IDIxLjIwODkgNTIuNTY5QzIxLjIwODkgNTIuNTY5IDE4Ljk3NzggNjIuMTI0NSAyMy4wNzU1IDcwLjMzNzlDMjMuMDc1NSA3MC4zMzc5IDI5LjAxMzMgNjcuNjQ0NSAzMy43MjQ0IDcxLjQzMTJDMzguNjU3NyA3NS40MzEyIDM3LjA4NDQgNzkuMjgwMSA0MC41NiA4Mi41ODY3QzQzLjU0NjYgODUuNjM1NiA0OCA4NS42MzU2IDQ4IDg1LjYzNTZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNDIuNDc5OSA2NS4yOThDNDIuMjkzMyA1OS4yMTggMzYuMzAyMSA1Ny4yNjI0IDMyLjIxMzMgNTkuODIyNEMzMi4yMTMzIDU5LjgyMjQgMzIuODUzMyA2Mi40MzU4IDM1LjgzOTkgNjMuNzUxM0MzOC4yNzU1IDY0LjgyNjkgMzkuMzI0NCA2My4zODY5IDQyLjQ3OTkgNjUuMjk4WiIgZmlsbD0iIzdCODFGOSIvPgo8cGF0aCBkPSJNMjIuNDk3NyAyMy4wOTM1QzIwLjA4ODggMzEuNTQ2OCAyMS4xMjg4IDQyLjI0MDIgMjQuOTMzMyA1MC4wMjY5QzI4LjgyNjYgNDcuMjcxMyAzMi45MTU1IDQzLjAxMzUgMzUuMDkzMyAzOC41MDY5QzI5Ljk2NDQgMzQuNzExMyAyNS42NjIyIDMxLjEwMjQgMjIuNDk3NyAyMy4wOTM1WiIgZmlsbD0iIzdCODFGOSIvPgo8cGF0aCBkPSJNNTMuNTE5OSA2NS4yOThDNTMuNzA2NiA1OS4yMTggNTkuNjk3NyA1Ny4yNjI0IDYzLjc4NjYgNTkuODIyNEM2My43ODY2IDU5LjgyMjQgNjMuMTQ2NiA2Mi40MzU4IDYwLjE1OTkgNjMuNzUxM0M1Ny43MjQzIDY0LjgyNjkgNTYuNjc1NSA2My4zODY5IDUzLjUxOTkgNjUuMjk4WiIgZmlsbD0iIzdCODFGOSIvPgo8cGF0aCBkPSJNNzMuNTAyMiAyMy4wOTM1Qzc1LjkxMTEgMzEuNTQ2OCA3NC44NzExIDQyLjI0MDIgNzEuMDY2NiA1MC4wMjY5QzY3LjE3MzMgNDcuMjcxMyA2My4wODQ0IDQzLjAxMzUgNjAuOTA2NiAzOC41MDY5QzY2LjAzNTUgMzQuNzExMyA3MC4zMzc3IDMxLjEwMjQgNzMuNTAyMiAyMy4wOTM1WiIgZmlsbD0iIzdCODFGOSIvPgo8cGF0aCBkPSJNNDcuOTk5OSA4NS4zMDY5QzUwLjE0MDQgODUuMzA2OSA1MS44NzU1IDgzLjc3ODcgNTEuODc1NSA4MS44OTM2QzUxLjg3NTUgODAuMDA4NCA1MC4xNDA0IDc4LjQ4MDIgNDcuOTk5OSA3OC40ODAyQzQ1Ljg1OTUgNzguNDgwMiA0NC4xMjQ0IDgwLjAwODQgNDQuMTI0NCA4MS44OTM2QzQ0LjEyNDQgODMuNzc4NyA0NS44NTk1IDg1LjMwNjkgNDcuOTk5OSA4NS4zMDY5WiIgZmlsbD0iIzdCODFGOSIvPgo8L3N2Zz4K';
        this._readyState = typeof window === 'undefined' || typeof document === 'undefined'
            ? WalletReadyState.Unsupported
            : WalletReadyState.NotDetected;
        this._connecting = false;
        this._connected = false;
        this._publicKey = null;
        this._wallet = null;
        if (this._readyState !== WalletReadyState.Unsupported) {
            scopePollingDetectionStrategy(() => {
                var _a;
                if ((_a = window === null || window === void 0 ? void 0 : window.nightly) === null || _a === void 0 ? void 0 : _a.solana) {
                    this._readyState = WalletReadyState.Installed;
                    this.emit('readyStateChange', this._readyState);
                    return true;
                }
                return false;
            });
        }
    }
    get connected() {
        return this._connected;
    }
    get connecting() {
        return this._connecting;
    }
    get readyState() {
        return this._readyState;
    }
    get publicKey() {
        return this._publicKey;
    }
    async connect() {
        try {
            if (this.connected || this.connecting)
                return;
            if (this._readyState !== WalletReadyState.Installed)
                throw new WalletNotReadyError();
            this._connecting = true;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const wallet = window.nightly.solana;
            try {
                await wallet.connect();
            }
            catch (error) {
                throw new WalletConnectionError(error === null || error === void 0 ? void 0 : error.message, error);
            }
            if (wallet.publicKey.toString() === '11111111111111111111111111111111')
                throw new WalletAccountError();
            let publicKey;
            try {
                publicKey = new PublicKey(wallet.publicKey.toBytes());
            }
            catch (error) {
                throw new WalletPublicKeyError(error === null || error === void 0 ? void 0 : error.message, error);
            }
            this._connected = true;
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
            this._publicKey = null;
            this._wallet = null;
            this._connected = false;
            try {
                await wallet.disconnect();
            }
            catch (error) {
                this.emit('error', new WalletDisconnectedError());
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
                return await wallet.signTransaction(transaction);
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
                return await wallet.signAllTransactions(transactions);
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
}
//# sourceMappingURL=adapter.js.map