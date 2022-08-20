import { BaseWalletAdapter, WalletReadyState } from '@solana/wallet-adapter-base';
import { PublicKey } from '@solana/web3.js';
export const FakeWalletName = 'Fake Wallet';
export class FakeWalletAdapter extends BaseWalletAdapter {
    constructor() {
        super();
        this.name = FakeWalletName;
        this.url = 'https://github.com/solana-labs/wallet-adapter#usage';
        this.icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQiIGhlaWdodD0iMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zNCAxMC42djIuN2wtOS41IDE2LjVoLTQuNmw2LTEwLjVhMi4xIDIuMSAwIDEgMCAyLTMuNGw0LjgtOC4zYTQgNCAwIDAgMSAxLjMgM1ptLTQuMyAxOS4xaC0uNmw0LjktOC40djQuMmMwIDIuMy0yIDQuMy00LjMgNC4zWm0yLTI4LjRjLS4zLS44LTEtMS4zLTItMS4zaC0xLjlsLTIuNCA0LjNIMzBsMS43LTNabS0zIDVoLTQuNkwxMC42IDI5LjhoNC43TDI4LjggNi40Wk0xOC43IDBoNC42bC0yLjUgNC4zaC00LjZMMTguNiAwWk0xNSA2LjRoNC42TDYgMjkuOEg0LjJjLS44IDAtMS43LS4zLTIuNC0uOEwxNSA2LjRaTTE0IDBIOS40TDcgNC4zaDQuNkwxNCAwWm0tMy42IDYuNEg1LjdMMCAxNi4ydjhMMTAuMyA2LjRaTTQuMyAwaC40TDAgOC4ydi00QzAgMiAxLjkgMCA0LjMgMFoiIGZpbGw9IiM5OTQ1RkYiLz48L3N2Zz4=';
        this._publicKey = null;
        console.warn('Your application is presently configured to use the `FakeWalletAdapter`. ' +
            'Find and remove it, then replace it with a list of adapters for ' +
            'wallets you would like your application to support. See ' +
            'https://github.com/solana-labs/wallet-adapter#usage for an example.');
    }
    get connecting() {
        return false;
    }
    get publicKey() {
        return this._publicKey;
    }
    get readyState() {
        return WalletReadyState.Installed;
    }
    async connect() {
        this._publicKey = PublicKey.default;
        this.emit('connect', this._publicKey);
    }
    async disconnect() {
        this.emit('disconnect');
    }
    async sendTransaction(_transaction, _connection, _options) {
        console.debug('FakeWallet: `sendTransaction()` was called. ' +
            'Transaction was not actually sent to the network. ' +
            'Returning `itsFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFake` as the signature.');
        return 'itsFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFakeFake';
    }
}
//# sourceMappingURL=adapter.js.map