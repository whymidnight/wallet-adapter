import type { WalletName } from '@solana/wallet-adapter-base';
import type { SolletWalletAdapterConfig } from './base';
import { BaseSolletWalletAdapter } from './base';
export declare const SolletWalletName: WalletName<"Sollet">;
export declare class SolletWalletAdapter extends BaseSolletWalletAdapter {
    name: WalletName<"Sollet">;
    url: string;
    icon: string;
    constructor({ provider, ...config }?: SolletWalletAdapterConfig);
}
export declare const SolletExtensionWalletName: WalletName<"Sollet (Extension)">;
export declare class SolletExtensionWalletAdapter extends BaseSolletWalletAdapter {
    name: WalletName<"Sollet (Extension)">;
    url: string;
    icon: string;
}
