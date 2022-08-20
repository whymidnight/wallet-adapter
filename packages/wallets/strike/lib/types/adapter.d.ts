import type { SendTransactionOptions, WalletName } from '@solana/wallet-adapter-base';
import { BaseSignerWalletAdapter, WalletReadyState } from '@solana/wallet-adapter-base';
import type { Connection, PublicKey, Transaction, TransactionSignature } from '@solana/web3.js';
export interface StrikeWalletAdapterConfig {
}
export declare const StrikeWalletName: WalletName<"Strike">;
export declare class StrikeWalletAdapter extends BaseSignerWalletAdapter {
    name: WalletName<"Strike">;
    url: string;
    icon: string;
    private _connecting;
    private _wallet;
    private _publicKey;
    private _readyState;
    constructor(config?: StrikeWalletAdapterConfig);
    get publicKey(): PublicKey | null;
    get connecting(): boolean;
    get connected(): boolean;
    get readyState(): WalletReadyState;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendTransaction(transaction: Transaction, connection: Connection, options?: SendTransactionOptions): Promise<TransactionSignature>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
}