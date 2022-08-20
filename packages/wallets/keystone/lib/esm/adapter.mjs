import { BaseMessageSignerWalletAdapter, WalletAccountError, WalletLoadError, WalletNotConnectedError, WalletNotReadyError, WalletPublicKeyError, WalletReadyState, WalletSignTransactionError, } from '@solana/wallet-adapter-base';
import { PublicKey } from '@solana/web3.js';
export const KeystoneWalletName = 'Keystone';
export class KeystoneWalletAdapter extends BaseMessageSignerWalletAdapter {
    constructor(config = {}) {
        super();
        this.name = KeystoneWalletName;
        this.url = 'https://keyst.one';
        this.icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjE2IiBmaWxsPSJ3aGl0ZSIvPgogICAgPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjIyIiBoZWlnaHQ9IjIyIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIxIi8+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE0LjY5NjUgNS40MzQ4N0MxNS4wOTEgNC43NTMxNiAxNi4wNzQ5IDQuNzUyMTEgMTYuNDcwOCA1LjQzMjk5TDE3LjMzOTggNi45MjcxOUMxNy42NDkgNy40NTg5NiAxNy42NDg3IDguMTE1ODggMTcuMzM4OSA4LjY0NzM0TDkuNjMxMjEgMjEuODcxQzkuMjE4NTEgMjIuNTc5MSA4LjE5NjIzIDIyLjU4MTEgNy43ODA3NiAyMS44NzQ2QzcuNzMxMzIgMjEuNzkwNiA3LjY5MzU4IDIxLjcwMDEgNy42Njg1OCAyMS42MDU4TDcuMzcwODggMjAuNDgyOUM3LjA5MjY2IDE5LjQzMzQgNy4yNDE4IDE4LjMxNjQgNy43ODU2MyAxNy4zNzY3TDE0LjY5NjUgNS40MzQ4N1pNMTIuNjYzNiAxOS4yODU4QzEzLjA2MzUgMTguNTk5NyAxNC4wMDM1IDE4LjQ3NTcgMTQuNTY3NyAxOS4wMzQ1TDE3LjQyODggMjEuODY4NkMxOC44NjA1IDIzLjI4NjcgMTguODU2NSAyNS42MDE2IDE3LjQyIDI3LjAxNDlDMTcuMjA0NSAyNy4yMjY5IDE2Ljg3OTggMjcuMjgyNSAxNi42MDYgMjcuMTU0MkwxMS42MDAyIDI0LjgwODFDMTAuNjkwNyAyNC4zODE5IDEwLjM0MyAyMy4yNjcxIDEwLjg0ODcgMjIuMzk5NEwxMi42NjM2IDE5LjI4NThaTTIwLjQzNSAxNi4zMzcyQzIxLjQ4OTcgMTYuMzM3MiAyMi4xNDc0IDE1LjE5MzkgMjEuNjE3MiAxNC4yODIyTDE5Ljc4MjggMTEuMTI4QzE5LjI1NTggMTAuMjIxOCAxNy45NDcxIDEwLjIyMTIgMTcuNDE5MiAxMS4xMjY5TDE1LjQzMDkgMTQuNTM4MUMxNC45NjYgMTUuMzM1OCAxNS41NDE0IDE2LjMzNzIgMTYuNDY0NyAxNi4zMzcyTDIwLjQzNSAxNi4zMzcyWiIgZmlsbD0iYmxhY2siLz4KICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjEuNzMwMyAxNy42NDU5QzIyLjg3MTMgMTcuNjQ1OSAyMy45MjYxIDE4LjI1MjcgMjQuNDk5OCAxOS4yMzlWMTkuMjM5QzI0LjY3NjMgMTkuNTQyNyAyNC42MjQ3IDE5LjkyNzQgMjQuMzc0MyAyMC4xNzM3TDIyLjA1MTEgMjIuNDU5QzIxLjQ1MDkgMjMuMDQ5NCAyMC40ODc3IDIzLjA0NzggMTkuODg5NSAyMi40NTUzTDE2LjUxMDEgMTkuMTA3OEMxNS45Njc3IDE4LjU3MDYgMTYuMzQ4MSAxNy42NDU5IDE3LjExMTYgMTcuNjQ1OUwyMS43MzAzIDE3LjY0NTlaIiBmaWxsPSIjMjE2MUZGIi8+Cjwvc3ZnPgo=';
        this._readyState = typeof window === 'undefined' || typeof document === 'undefined'
            ? WalletReadyState.Unsupported
            : WalletReadyState.Loadable;
        this._keyring = null;
        this._publicKey = null;
        this._connecting = false;
    }
    async connect() {
        try {
            if (this.connected || this.connecting)
                return;
            if (this._readyState !== WalletReadyState.Loadable)
                throw new WalletNotReadyError();
            this._connecting = true;
            let keyring;
            try {
                const { DefaultKeyring } = await import('@keystonehq/sol-keyring');
                keyring = DefaultKeyring.getEmptyKeyring();
            }
            catch (error) {
                throw new WalletLoadError(error === null || error === void 0 ? void 0 : error.message, error);
            }
            let account;
            try {
                await keyring.readKeyring();
                account = keyring.getAccounts()[0].pubKey;
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
            this._keyring = keyring;
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
    get connecting() {
        return this._connecting;
    }
    async disconnect() {
        if (this._keyring) {
            this._keyring = null;
            this._publicKey = null;
        }
        this.emit('disconnect');
    }
    get publicKey() {
        return this._publicKey;
    }
    get readyState() {
        return this._readyState;
    }
    async signTransaction(transaction) {
        var _a;
        try {
            const keyring = this._keyring;
            const publicKey = (_a = this._publicKey) === null || _a === void 0 ? void 0 : _a.toString();
            if (!keyring || !publicKey)
                throw new WalletNotConnectedError();
            try {
                return keyring.signTransaction(publicKey, transaction);
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
        var _a;
        try {
            const keyring = this._keyring;
            const publicKey = (_a = this._publicKey) === null || _a === void 0 ? void 0 : _a.toString();
            if (!keyring || !publicKey)
                throw new WalletNotConnectedError();
            try {
                return keyring.signMessage(publicKey, message);
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
        var _a;
        try {
            const keyring = this._keyring;
            const publicKey = (_a = this._publicKey) === null || _a === void 0 ? void 0 : _a.toString();
            if (!keyring || !publicKey)
                throw new WalletNotConnectedError();
            const signedTransactions = [];
            try {
                for (const transaction of transactions) {
                    signedTransactions.push(await keyring.signTransaction(publicKey, transaction));
                }
                return signedTransactions;
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