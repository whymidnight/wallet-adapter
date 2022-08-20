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
exports.CoinhubWalletAdapter = exports.CoinhubWalletName = void 0;
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
const web3_js_1 = require("@solana/web3.js");
exports.CoinhubWalletName = 'Coinhub';
class CoinhubWalletAdapter extends wallet_adapter_base_1.BaseSignerWalletAdapter {
    constructor(config = {}) {
        super();
        this.name = exports.CoinhubWalletName;
        this.url = 'https://coinhub.org';
        this.icon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTAwcHgiIGhlaWdodD0iMTAwcHgiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPuefqeW9ojwvdGl0bGU+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkuIvovb3pobVpb3MiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMzguMDAwMDAwLCAtOTQuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJDb2luaHViLSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM4LjAwMDAwMCwgOTQuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PC9yZWN0PgogICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMy4zMzMzMzMsIDMuMzMzMzMzKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNTcuOTU2MzU0Miw0MC43MDQ2MzE2IEM1Ny45NTYzNTQyLDQwLjcwNDYzMTYgNjIuNzc2ODc1LDU2LjM0NTIxMDUgODEuNjE1OTg5Niw1OC41MTY2ODQyIEM4NC43MzEzNTQyLDU4Ljg3NTUyNjMgODguMjYwNTIwOCw1OS4yNjM4NDIxIDkxLjg2ODQzNzUsNTguMTg4MDUyNiBDOTIuMDIyMjkxNyw1OC4xOTc2MzE2IDkyLjE3MjUsNTguMjQwNzM2OCA5Mi4zMDgxMjUsNTguMzE0MDUyNiBDOTIuNDQ0MTE0Niw1OC4zODczNjg0IDkyLjU2Mjk2ODgsNTguNDg5MDUyNiA5Mi42NTY2NjY3LDU4LjYxMjg0MjEgQzkyLjc1LDU4LjczNjYzMTYgOTIuODE1OTg5Niw1OC44Nzk1Nzg5IDkyLjg1MDI2MDQsNTkuMDMxMzY4NCBDOTIuODg0NTMxMyw1OS4xODMxNTc5IDkyLjg4NTYyNSw1OS4zNDA0NzM3IDkyLjg1NDI3MDgsNTkuNDkzIEM5Mi4zMjM4MDIxLDYzLjE1MTc4OTUgOTEuMTIzNTkzNyw2Ni42Nzg2ODQyIDg5LjMxNTI2MDQsNjkuODkzNTI2MyBDODQuNzQxMTk3OSw3OC4xMTE4OTQ3IDc0LjY5NTQ2ODgsODguOTgwNjg0MiA1Mi4wMTE4MjI5LDkyLjgwNiBDNTAuODA5MDYyNSw5Mi44MDYgNDguNDMzMDcyOSw5MS43NDAxNTc5IDQ3LjMyOTExNDYsOTEuOTI5NTI2MyBDNDcuMzI5MTE0Niw5MS45MDkyNjMyIDE5Ljk3MjUzMTIsNjcuNjUyMDUyNiA1Ny45NTYzNTQyLDQwLjcwNDYzMTYgWiIgaWQ9Iui3r+W+hCIgZmlsbD0iI0NGQkZBMyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik01Mi4wMTE0NTgzLDkyLjgwNiBDNTIuMDExNDU4Myw5Mi44MDYgMzIuMTk2NSw2NC4xNzUyNjMyIDYzLjMwOTE2NjcsNDkuNTExIEw1OS40MzQ3Mzk2LDQ0LjQxMDU3ODkgQzU5LjQzNDczOTYsNDQuNDEwNTc4OSAxOS4xNDQxOTc5LDY1LjE5MTM2ODQgNTIuMDExNDU4Myw5Mi44MDYgWiIgaWQ9Iui3r+W+hCIgZmlsbD0iI0I5QTc5OCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05Mi44NTQ2MzU0LDU5LjUzMzE1NzkgQzkyLjIzOTU4MzMsNjMuMzYxMDUyNiA5MC45NDAyMDgzLDY3LjA0Mzc4OTUgODkuMDE5OTQ3OSw3MC40MDE1Nzg5IEw4My4yNjI0NDc5LDU4LjY5NjEwNTMgQzg1LjkzMDEwNDIsNTkuMDU0OTQ3NCA4OC42Mzk2ODc1LDU4LjkxNjQyMTEgOTEuMjU3NzYwNCw1OC4yODc4OTQ3IEM5Mi41MDk3Mzk2LDU3Ljk5OTA1MjYgOTMuMDUxODc1LDU4LjQxNzIxMDUgOTIuODU0NjM1NCw1OS41MzMxNTc5IFoiIGlkPSLot6/lvoQiIGZpbGw9IiM4QzY3NDIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNTkuNzk5Njg3NSw2Ny41MzIzMTU4IEM2Mi4wMTU2MjUsNjcuNTMyMzE1OCA2My44MTE5MjcxLDY1LjcxNzEwNTMgNjMuODExOTI3MSw2My40Nzc4NDIxIEM2My44MTE5MjcxLDYxLjIzODU3ODkgNjIuMDE1NjI1LDU5LjQyMzM2ODQgNTkuNzk5Njg3NSw1OS40MjMzNjg0IEM1Ny41ODM3NSw1OS40MjMzNjg0IDU1Ljc4NzQ0NzksNjEuMjM4NTc4OSA1NS43ODc0NDc5LDYzLjQ3Nzg0MjEgQzU1Ljc4NzQ0NzksNjUuNzE3MTA1MyA1Ny41ODM3NSw2Ny41MzIzMTU4IDU5Ljc5OTY4NzUsNjcuNTMyMzE1OCBaIiBpZD0i6Lev5b6EIiBmaWxsPSIjMjIyMjIyIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTYwLjU1OTExNDYsNi44MTQwMjEwNSBMNjMuODkxMDQxNywxLjI3NTEzNDc0IEM1OC4yNzI4MTI1LDIuMjE4NjEzMTYgNTIuNzc3MDgzMywzLjc5NTg0MjExIDQ3LjUwNjY2NjcsNS45NzcxODk0NyBDNDYuMTIzODAyMSw2LjEwODQ5NDc0IDQ0Ljc0ODU5MzcsNi4zMTEzMTA1MyA0My4zODYxNDU4LDYuNTg0ODYzMTYgTDUwLjA2MDIwODMsMy40NjI0NjIyOWUtMTMgQzQzLjQ2MzA3MjksMS42MzEzMDk0NyAzNy40ODkzNzUsNS4xOTM3NDIxMSAzMi44ODcwNTczLDEwLjI0MDkyNjMgQzMyLjIwNjgxNzcsMTAuNTc5NjUyNiAzMS41MzY0NTgzLDEwLjk0ODI1NzkgMzAuOTE1MzkwNiwxMS4zMzY3NTc5IEwzNi4xNTAxMTQ2LDEuNTkzOTI1NzkgQzI5LjA0OTE5NzksNS40NjMyNDIxMSAyMy40ODAzMzMzLDExLjY4MTYzNjggMjAuMzc2OTYzNSwxOS4yMDY3NDc0IEwyMy42MTA0NTMxLDcuODUwMDU3ODkgQzIzLjYxMDQ1MzEsNy44NTAwNTc4OSAxNS40Mzc5ODk2LDE0LjEwNjIxNTggMTMuOTg4ODQzNywyOS41MzczNDc0IEMxMy44MDE1MjA4LDI5LjkxNTkgMTMuNjE0MTk3OSwzMC4yOTQ0NTI2IDEzLjQzNjc1NTIsMzAuNjgyOTUyNiBMMTIuNTQ5NTQxNywxNi44NTU3MDUzIEMxMi41NDk1NDE3LDE2Ljg1NTcwNTMgNC42MDM4MTI1LDI5LjY1Njg2MzIgOS43MTAzNDg5Niw0NC4xMzE2ODQyIEw0LjE2MDE4NzUsMzAuMTg0ODQ3NCBDNC4xNjAxODc1LDMwLjE4NDg0NzQgMC43MTk2NTEwNDIsNDEuMTQzMDUyNiA5LjA4OTI4MTI1LDU1LjM0OSBMLTIuNzYzMjIxNzVlLTE0LDQ0LjcwOTM2ODQgQy0yLjc2MzIyMTc1ZS0xNCw0NC43MDkzNjg0IDAuODc3MzgwNzI5LDYzLjA2OTI2MzIgMTEuMjY3OTU4Myw3My4wMDE1MjYzIEMxMS4yNjc5NTgzLDczLjAwMTUyNjMgMTUuMDA0MjA4Myw3MS44NzYgMTcuMzAxMTkyNyw3NC41NDU1Nzg5IEMyMC45NjAyMjQsNzkuOTIzNDIxMSAyNS44MDI5NDc5LDg0LjM3MSAzMS40NDkxNzcxLDg3LjUzOTQyMTEgQzM3LjA5NTI2MDQsOTAuNzA3NDczNyA0My4zOTE2MTQ2LDkyLjUxMDUyNjMgNDkuODQzMjgxMiw5Mi44MDYgQzUwLjM4NTQxNjcsOTIuODA2IDUxLjQ2OTY4NzUsOTIuODA2IDUxLjQ2OTY4NzUsOTIuODA2IEM1MS40Njk2ODc1LDkyLjgwNiAzMi4xODcwOTM3LDc1Ljk4MDIxMDUgNTAuNzY5Njg3NSw1MS45NjE3MzY4IEM2OS4zNjIzNDM3LDI5Ljg1NjEwNTMgOTMuMzg2OTI3MSw0NS4yMjczNjg0IDkzLjE2MDE1NjIsNDMuMjQ0ODk0NyBDOTIuMDM3NjA0MiwzNC41NDI2Nzg5IDg4LjMxNTU3MjksMjYuMzkzMjA1MyA4Mi40OTA2MjUsMTkuODgzOTc4OSBDNzYuNjY1Njc3MSwxMy4zNzQ3NTI2IDY5LjAxNDg5NTgsOC44MTUzMjEwNSA2MC41NTkxMTQ2LDYuODE0MDIxMDUgTDYwLjU1OTExNDYsNi44MTQwMjEwNSBaIiBpZD0i6Lev5b6EIiBmaWxsPSIjMjJBMDc5Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTQzLjM0NjQwNjMsNzguNTgwMTU3OSBDNDMuMzQ2NDA2Myw3OC41ODAxNTc5IDIyLjA2MjQzMjMsODYuMDgxNTc4OSAyLjI4NjgzNDM4LDU3LjAzMjMxNTggQzQuNDA4MTc3MDgsNjQuNjU0MjEwNSA4LjIwNjE1MTA0LDcxLjY5MzI2MzIgMTMuMzk3MDUyMSw3Ny42MjM3MzY4IEMyMC42MjMxMzAyLDg2LjAyMTg5NDcgMzQuOTc2NzM5Niw5My4zMTQwNTI2IDUyLjAxMTgyMjksOTIuNzg2MTA1MyBDNDkuOTUzNzUsOTEuMTc5NDIxMSA0OC4yMzcyOTE3LDg5LjE3MDQyMTEgNDYuOTY0MTY2Nyw4Ni44Nzg0NzM3IEM0NS40OTM4MDIxLDg0LjIzOCA0NC4yODE5MjcxLDgxLjQ1OSA0My4zNDY0MDYzLDc4LjU4MDE1NzkgTDQzLjM0NjQwNjMsNzguNTgwMTU3OSBaIiBpZD0i6Lev5b6EIiBmaWxsPSIjMUI4MDYxIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==';
        this._readyState = typeof window === 'undefined' || typeof document === 'undefined'
            ? wallet_adapter_base_1.WalletReadyState.Unsupported
            : wallet_adapter_base_1.WalletReadyState.NotDetected;
        this._connecting = false;
        this._wallet = null;
        this._publicKey = null;
        if (this._readyState !== wallet_adapter_base_1.WalletReadyState.Unsupported) {
            (0, wallet_adapter_base_1.scopePollingDetectionStrategy)(() => {
                var _a;
                if ((_a = window.coinhub) === null || _a === void 0 ? void 0 : _a.isCoinhubWallet) {
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
                const wallet = window.coinhub;
                let account;
                try {
                    account = yield wallet.getAccount();
                }
                catch (error) {
                    throw new wallet_adapter_base_1.WalletAccountError(error === null || error === void 0 ? void 0 : error.message, error);
                }
                let publicKey;
                try {
                    publicKey = new web3_js_1.PublicKey(account);
                }
                catch (error) {
                    throw new wallet_adapter_base_1.WalletPublicKeyError(error === null || error === void 0 ? void 0 : error.message, error);
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
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._wallet) {
                this._wallet = null;
                this._publicKey = null;
            }
            this.emit('disconnect');
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = this._wallet;
                if (!wallet)
                    throw new wallet_adapter_base_1.WalletNotConnectedError();
                try {
                    return wallet.signTransaction(transaction);
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
                    return wallet.signAllTransactions(transactions);
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
}
exports.CoinhubWalletAdapter = CoinhubWalletAdapter;
//# sourceMappingURL=adapter.js.map