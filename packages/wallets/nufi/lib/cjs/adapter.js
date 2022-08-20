"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NufiWalletAdapter = exports.NufiWalletName = void 0;
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
const web3_js_1 = require("@solana/web3.js");
exports.NufiWalletName = 'NuFi';
class NufiWalletAdapter extends wallet_adapter_base_1.BaseMessageSignerWalletAdapter {
    constructor(config = {}) {
        super();
        this.name = exports.NufiWalletName;
        this.url = 'https://nu.fi';
        this.icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjMiIHZpZXdCb3g9IjAgMCAyMiAyMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzIxMjEyMSIgLz4KPHBhdGggZD0iTTQuMzA5OTkgOS4wMDAwOEM1LjMwODc3IDYuMjA0MDEgNy45ODA2OSA0LjIwMzA4IDExLjEyIDQuMjAzMDhDMTQuMjU5MiA0LjIwMzA4IDE2LjkzMTEgNi4yMDQwMSAxNy45Mjk5IDkuMDAwMDhDMTcuOTc5IDkuMTM3NDcgMTguMTA3NCA5LjIzMjE4IDE4LjI1MzMgOS4yMzIxOEgyMS4wNTk0QzIxLjI3MjUgOS4yMzIxOCAyMS40MzE3IDkuMDM1NzYgMjEuMzc5NCA4LjgyOTE5QzIwLjIxOTUgNC4yNDM2MiAxNi4wNjYgMC44NTAzNDIgMTEuMTIgMC44NTAzNDJDNi4xNzM5MSAwLjg1MDM0MiAyLjAyMDQyIDQuMjQzNjIgMC44NjA0NjggOC44MjkxOEMwLjgwODIxMyA5LjAzNTc2IDAuOTY3NDM0IDkuMjMyMTggMS4xODA1MiA5LjIzMjE4SDMuOTg2NTlDNC4xMzI0OSA5LjIzMjE4IDQuMjYwOTEgOS4xMzc0NyA0LjMwOTk5IDkuMDAwMDhaIiBmaWxsPSIjQzZGRjAwIi8+CjxwYXRoIGQ9Ik0zLjk4NjU5IDEzLjYzMjdDNC4xMzI0OSAxMy42MzI3IDQuMjYwOTEgMTMuNzI3NCA0LjMwOTk5IDEzLjg2NDhDNS4zMDg3NyAxNi42NjA4IDcuOTgwNjkgMTguNjYxOCAxMS4xMiAxOC42NjE4QzE0LjI1OTIgMTguNjYxOCAxNi45MzExIDE2LjY2MDggMTcuOTI5OSAxMy44NjQ4QzE3Ljk3OSAxMy43Mjc0IDE4LjEwNzQgMTMuNjMyNyAxOC4yNTMzIDEzLjYzMjdIMjEuMDU5NEMyMS4yNzI1IDEzLjYzMjcgMjEuNDMxNyAxMy44MjkxIDIxLjM3OTQgMTQuMDM1N0MyMC4yMTk1IDE4LjYyMTIgMTYuMDY2IDIyLjAxNDUgMTEuMTIgMjIuMDE0NUM2LjE3MzkxIDIyLjAxNDUgMi4wMjA0MiAxOC42MjEyIDAuODYwNDY4IDE0LjAzNTdDMC44MDgyMTMgMTMuODI5MSAwLjk2NzQzNCAxMy42MzI3IDEuMTgwNTIgMTMuNjMyN0gzLjk4NjU5WiIgZmlsbD0iI0M2RkYwMCIvPgo8cGF0aCBkPSJNOS4yNTQ5OSA5LjIzMjE4QzkuMDY5ODMgOS4yMzIxOCA4LjkxOTcyIDkuMzgyMjkgOC45MTk3MiA5LjU2NzQ2VjEzLjI5NzRDOC45MTk3MiAxMy40ODI1IDkuMDY5ODMgMTMuNjMyNyA5LjI1NDk5IDEzLjYzMjdIMTIuOTg0OUMxMy4xNzAxIDEzLjYzMjcgMTMuMzIwMiAxMy40ODI1IDEzLjMyMDIgMTMuMjk3NFY5LjU2NzQ2QzEzLjMyMDIgOS4zODIyOSAxMy4xNzAxIDkuMjMyMTggMTIuOTg0OSA5LjIzMjE4SDkuMjU0OTlaIiBmaWxsPSIjQzZGRjAwIi8+Cjwvc3ZnPgo=';
        this._connecting = false;
        this._wallet = null;
        this._publicKey = null;
        this._readyState = typeof window === 'undefined' || typeof document === 'undefined'
            ? wallet_adapter_base_1.WalletReadyState.Unsupported
            : wallet_adapter_base_1.WalletReadyState.NotDetected;
        this._disconnected = () => {
            const wallet = this._wallet;
            if (wallet) {
                wallet.off('disconnect', this._disconnected);
                this._wallet = null;
                this._publicKey = null;
                this.emit('error', new wallet_adapter_base_1.WalletDisconnectedError());
                this.emit('disconnect');
            }
        };
        if (this._readyState !== wallet_adapter_base_1.WalletReadyState.Unsupported) {
            (0, wallet_adapter_base_1.scopePollingDetectionStrategy)(() => {
                var _a;
                if ((_a = window.nufiSolana) === null || _a === void 0 ? void 0 : _a.isNufi) {
                    this._readyState = wallet_adapter_base_1.WalletReadyState.Installed;
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
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.connected || this.connecting)
                    return;
                if (this._readyState !== wallet_adapter_base_1.WalletReadyState.Installed)
                    throw new wallet_adapter_base_1.WalletNotReadyError();
                this._connecting = true;
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const wallet = window.nufiSolana;
                if (!wallet.isConnected) {
                    try {
                        yield wallet.connect();
                    }
                    catch (error) {
                        throw new wallet_adapter_base_1.WalletConnectionError(error === null || error === void 0 ? void 0 : error.message, error);
                    }
                }
                if (!wallet.publicKey)
                    throw new wallet_adapter_base_1.WalletAccountError();
                let publicKey;
                try {
                    publicKey = new web3_js_1.PublicKey(wallet.publicKey.toBytes());
                }
                catch (error) {
                    throw new wallet_adapter_base_1.WalletPublicKeyError(error === null || error === void 0 ? void 0 : error.message, error);
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
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = this._wallet;
            if (wallet) {
                wallet.off('disconnect', this._disconnected);
                this._wallet = null;
                this._publicKey = null;
                try {
                    yield wallet.disconnect();
                }
                catch (error) {
                    this.emit('error', new wallet_adapter_base_1.WalletDisconnectionError(error === null || error === void 0 ? void 0 : error.message, error));
                }
            }
            this.emit('disconnect');
        });
    }
    sendTransaction(transaction, connection, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = this._wallet;
                if (!wallet)
                    throw new wallet_adapter_base_1.WalletNotConnectedError();
                try {
                    transaction = yield this.prepareTransaction(transaction, connection);
                    const { signers } = options;
                    (signers === null || signers === void 0 ? void 0 : signers.length) && transaction.partialSign(...signers);
                    const { signature } = yield wallet.signAndSendTransaction(transaction);
                    return signature;
                }
                catch (error) {
                    if (error instanceof wallet_adapter_base_1.WalletError)
                        throw error;
                    throw new wallet_adapter_base_1.WalletSendTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
                }
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = this._wallet;
                if (!wallet)
                    throw new wallet_adapter_base_1.WalletNotConnectedError();
                try {
                    return (yield wallet.signTransaction(transaction)) || transaction;
                }
                catch (error) {
                    throw new wallet_adapter_base_1.WalletSignTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
                }
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
        });
    }
    signAllTransactions(transactions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = this._wallet;
                if (!wallet)
                    throw new wallet_adapter_base_1.WalletNotConnectedError();
                try {
                    return (yield wallet.signAllTransactions(transactions)) || transactions;
                }
                catch (error) {
                    throw new wallet_adapter_base_1.WalletSignTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
                }
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = this._wallet;
                if (!wallet)
                    throw new wallet_adapter_base_1.WalletNotConnectedError();
                try {
                    const { signature } = yield wallet.signMessage(message);
                    return signature;
                }
                catch (error) {
                    throw new wallet_adapter_base_1.WalletSignMessageError(error === null || error === void 0 ? void 0 : error.message, error);
                }
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
        });
    }
}
exports.NufiWalletAdapter = NufiWalletAdapter;
//# sourceMappingURL=adapter.js.map