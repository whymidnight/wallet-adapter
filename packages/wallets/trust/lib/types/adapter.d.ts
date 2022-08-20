import type { SendTransactionOptions, WalletName } from '@solana/wallet-adapter-base';
import { BaseMessageSignerWalletAdapter, WalletReadyState } from '@solana/wallet-adapter-base';
import type { Connection, Transaction, TransactionSignature } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
export interface TrustWalletAdapterConfig {
}
export declare const TrustWalletName: WalletName<"Trust">;
export declare class TrustWalletAdapter extends BaseMessageSignerWalletAdapter {
    name: WalletName<"Trust">;
    url: string;
    icon: string;
    private _connecting;
    private _wallet;
    private _publicKey;
    private _readyState;
    constructor(config?: TrustWalletAdapterConfig);
    get publicKey(): PublicKey | null;
    get connecting(): boolean;
    get connected(): boolean;
    get readyState(): WalletReadyState;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendTransaction(transaction: Transaction, connection: Connection, options?: SendTransactionOptions): Promise<TransactionSignature>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
    private _disconnected;
}
