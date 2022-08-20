import type { WalletName } from '@solana/wallet-adapter-base';
import { BaseMessageSignerWalletAdapter, WalletReadyState } from '@solana/wallet-adapter-base';
import type { Transaction } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import type { TorusParams } from '@toruslabs/solana-embed';
export interface TorusWalletAdapterConfig {
    params?: TorusParams;
}
export declare const TorusWalletName: WalletName<"Torus">;
export declare class TorusWalletAdapter extends BaseMessageSignerWalletAdapter {
    name: WalletName<"Torus">;
    url: string;
    icon: string;
    private _connecting;
    private _wallet;
    private _publicKey;
    private _params;
    private _readyState;
    constructor({ params }?: TorusWalletAdapterConfig);
    get publicKey(): PublicKey | null;
    get connecting(): boolean;
    get connected(): boolean;
    get readyState(): WalletReadyState;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
}