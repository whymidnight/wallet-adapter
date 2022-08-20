import type { WalletName } from '@solana/wallet-adapter-base';
import { BaseSignerWalletAdapter, WalletReadyState } from '@solana/wallet-adapter-base';
import type { Transaction } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
export declare const NightlyWalletName: WalletName<string>;
export declare class NightlyWalletAdapter extends BaseSignerWalletAdapter {
    name: WalletName<string>;
    url: string;
    icon: string;
    private _connecting;
    private _connected;
    private _publicKey;
    private _wallet;
    private _readyState;
    constructor();
    get connected(): boolean;
    get connecting(): boolean;
    get readyState(): WalletReadyState;
    get publicKey(): PublicKey | null;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
}
