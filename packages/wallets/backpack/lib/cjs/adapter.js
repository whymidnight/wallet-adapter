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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackpackWalletAdapter = exports.BackpackWalletName = void 0;
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
const web3_js_1 = require("@solana/web3.js");
exports.BackpackWalletName = 'Backpack';
class BackpackWalletAdapter extends wallet_adapter_base_1.BaseMessageSignerWalletAdapter {
    constructor(_config = {}) {
        super();
        this.name = exports.BackpackWalletName;
        this.url = 'https://backpack.app';
        this.icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfNjMzMl8zMzMyNikiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUwNi42NzcgMTA4LjkxN0M1MzYuNzU0IDEwOC45MTcgNTYxLjEzNiA4NC41MzUxIDU2MS4xMzYgNTQuNDU4NUM1NjEuMTM2IDI0LjM4MTkgNTM2Ljc1NCAwIDUwNi42NzcgMEM0NzYuNjAxIDAgNDUyLjIxOSAyNC4zODE5IDQ1Mi4yMTkgNTQuNDU4NUM0NTIuMjE5IDg0LjUzNTEgNDc2LjYwMSAxMDguOTE3IDUwNi42NzcgMTA4LjkxN1pNNjYxLjg0NyA4MjkuOTY3QzYxNy4xNiA4MzkuMDg1IDU4My41MzggODc4LjYxMyA1ODMuNTM4IDkyNS45OTRDNTgzLjUzOCA5ODAuMTIxIDYyNy40MTcgMTAyNCA2ODEuNTQ1IDEwMjRDNzExLjE3IDEwMjQgNzM3LjcyNiAxMDEwLjg2IDc1NS42OTcgOTkwLjA4Qzc5MC4xOTIgOTUxLjIwOSA3OTcuOTcyIDk0NS44NDYgODYwLjk2NiA5NDEuOTg4QzkyMy4zMDUgOTM4LjY1MiA5NzIuODI2IDg4Ny4wNDcgOTcyLjgyNiA4MjMuODc2Qzk3Mi44MjYgNzU4LjU0OSA5MTkuODY5IDcwNS41OTIgODU0LjU0MyA3MDUuNTkyQzgxMS45MjEgNzA1LjU5MiA3NzQuNTY0IDcyOC4xMzUgNzUzLjc0NSA3NjEuOTQ5QzcyMC40NjUgODE0LjI5OSA3MTEuNzg2IDgxOC43MDMgNjYxLjg0NyA4MjkuOTY3Wk0xMDEyLjc0IDI3Ny4xMjJDMTAxMi43NCAzMjMuNzg0IDk3NC45MTQgMzYxLjYxIDkyOC4yNTIgMzYxLjYxQzkwMS41NjUgMzYxLjYxIDg3Ny43NjkgMzQ5LjIzNyA4NjIuMjg1IDMyOS45MTVMODYyLjI4NCAzMjkuOTE4QzgzMS41ODIgMjkxLjU2IDgxOC40NzcgMjgzLjI1OCA3NTMuOTcxIDI5Mi4yM0M3NDguMTk5IDI5My4xMzQgNzQyLjI4NCAyOTMuNjAyIDczNi4yNTggMjkzLjYwMkM2NzMuNDkgMjkzLjYwMiA2MjIuNjA2IDI0Mi43MTggNjIyLjYwNiAxNzkuOTVDNjIyLjYwNiAxMTcuMTgxIDY3My40OSA2Ni4yOTczIDczNi4yNTggNjYuMjk3M0M3ODAuMzcxIDY2LjI5NzMgODE4LjYxNSA5MS40Mjk3IDgzNy40NSAxMjguMTU3Qzg2OC4xNCAxODQuODM2IDg4Mi42NDUgMTkwLjYzOSA5MzEuMTQ5IDE5Mi42ODJDOTc2LjQ3IDE5NC4yMDkgMTAxMi43NCAyMzEuNDMgMTAxMi43NCAyNzcuMTIyWk0zNjUuODkzIDM4OC4wNzRDMzk4Ljg1MiAzNjQuMjI0IDQyMC4yOTUgMzI1LjQzOSA0MjAuMjk1IDI4MS42NDZDNDIwLjI5NSAyMDkuMTQxIDM2MS41MTggMTUwLjM2NCAyODkuMDEzIDE1MC4zNjRDMjE2LjUwOCAxNTAuMzY0IDE1Ny43MzEgMjA5LjE0MSAxNTcuNzMxIDI4MS42NDZDMTU3LjczMSAyODUuNDcgMTU3Ljg5NCAyODkuMjU1IDE1OC4yMTUgMjkyLjk5NkMxNjYuMTQxIDM5MS45ODMgMTU1LjY3MiA0MTcuMjIyIDcxLjMwODEgNDc2Ljk2OEMzNS4zMTkgNTAxLjcyNyAxMS43MjI3IDU0My4yMDIgMTEuNzIyNyA1OTAuMTg4QzExLjcyMjcgNjY2LjAzNCA3My4yMDc1IDcyNy41MTggMTQ5LjA1MyA3MjcuNTE4QzIyNC44OTggNzI3LjUxOCAyODYuMzgzIDY2Ni4wMzQgMjg2LjM4MyA1OTAuMTg4QzI4Ni4zODMgNTg0LjczOCAyODYuMDY2IDU3OS4zNjIgMjg1LjQ0OCA1NzQuMDc3QzI3NC44NjYgNDcxLjU4NCAyODYuODU4IDQ0Ni45MTcgMzY1Ljg5MyAzODguMDc0Wk01MTMuNjkzIDg3My43MDVDNTEzLjY5MyA5NTYuMDg5IDQ0Ni45MDggMTAyMi44NyAzNjQuNTI0IDEwMjIuODdDMjgyLjE0IDEwMjIuODcgMjE1LjM1NSA5NTYuMDg5IDIxNS4zNTUgODczLjcwNUMyMTUuMzU1IDc5MS4zMjEgMjgyLjE0IDcyNC41MzYgMzY0LjUyNCA3MjQuNTM2QzQ0Ni45MDggNzI0LjUzNiA1MTMuNjkzIDc5MS4zMjEgNTEzLjY5MyA4NzMuNzA1WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzYzMzJfMzMzMjYpIi8+CjwvZz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl82MzMyXzMzMzI2IiB4MT0iMTUwLjI4NCIgeTE9IjIxMS4zMDIiIHgyPSIxMTYwLjQyIiB5Mj0iNjQ5LjYyMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjM0VFQ0I4Ii8+CjxzdG9wIG9mZnNldD0iMC41MDkzMjMiIHN0b3AtY29sb3I9IiNBMzcyRkUiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkU3RDRBIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxjbGlwUGF0aCBpZD0iY2xpcDBfNjMzMl8zMzMyNiI+CjxyZWN0IHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==';
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
        this._connecting = false;
        this._wallet = null;
        this._publicKey = null;
        if (this._readyState !== wallet_adapter_base_1.WalletReadyState.Unsupported) {
            (0, wallet_adapter_base_1.scopePollingDetectionStrategy)(() => {
                var _a;
                if ((_a = window.backpack) === null || _a === void 0 ? void 0 : _a.isBackpack) {
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
                const wallet = window.backpack;
                try {
                    yield wallet.connect();
                }
                catch (error) {
                    throw new wallet_adapter_base_1.WalletConnectionError(error === null || error === void 0 ? void 0 : error.message, error);
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
                const { signers } = options, sendOptions = __rest(options, ["signers"]);
                try {
                    return yield wallet.send(transaction, signers, sendOptions, connection);
                }
                catch (error) {
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
                    return yield wallet.signMessage(message);
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
exports.BackpackWalletAdapter = BackpackWalletAdapter;
//# sourceMappingURL=adapter.js.map