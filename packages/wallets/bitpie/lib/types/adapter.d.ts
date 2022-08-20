import type { WalletName } from '@solana/wallet-adapter-base';
import { BaseSignerWalletAdapter, WalletReadyState } from '@solana/wallet-adapter-base';
import type { Transaction } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
export interface BitpieWalletAdapterConfig {
}
export declare const BitpieWalletName: WalletName<"Bitpie">;
export declare class BitpieWalletAdapter extends BaseSignerWalletAdapter {
    name: WalletName<"Bitpie">;
    url: string;
    icon: string;
    private _connecting;
    private _wallet;
    private _publicKey;
    private _readyState;
    constructor(config?: BitpieWalletAdapterConfig);
    get publicKey(): PublicKey | null;
    get connecting(): boolean;
    get readyState(): WalletReadyState;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
}