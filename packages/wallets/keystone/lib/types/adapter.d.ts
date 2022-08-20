import type { WalletName } from '@solana/wallet-adapter-base';
import { BaseMessageSignerWalletAdapter, WalletReadyState } from '@solana/wallet-adapter-base';
import type { Transaction } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
export interface KeystoneWalletAdapterConfig {
}
export declare const KeystoneWalletName: WalletName<"Keystone">;
export declare class KeystoneWalletAdapter extends BaseMessageSignerWalletAdapter {
    name: WalletName<"Keystone">;
    url: string;
    icon: string;
    private _keyring;
    private _publicKey;
    private _connecting;
    private _readyState;
    constructor(config?: KeystoneWalletAdapterConfig);
    connect(): Promise<void>;
    get connecting(): boolean;
    disconnect(): Promise<void>;
    get publicKey(): PublicKey | null;
    get readyState(): WalletReadyState;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
}
