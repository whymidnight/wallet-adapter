import type { WalletName } from '@solana/wallet-adapter-base';
import { BaseMessageSignerWalletAdapter, WalletAdapterNetwork, WalletReadyState } from '@solana/wallet-adapter-base';
import type { PublicKey, Transaction } from '@solana/web3.js';
export interface SalmonWalletAdapterConfig {
    network?: WalletAdapterNetwork;
}
export declare const SalmonWalletName: WalletName<"Salmon">;
export declare class SalmonWalletAdapter extends BaseMessageSignerWalletAdapter {
    name: WalletName<"Salmon">;
    url: string;
    icon: string;
    private _connecting;
    private _wallet;
    private _network;
    private _readyState;
    constructor({ network }?: SalmonWalletAdapterConfig);
    get publicKey(): PublicKey | null;
    get connecting(): boolean;
    get connected(): boolean;
    get readyState(): WalletReadyState;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
    private _disconnected;
}