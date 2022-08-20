import type { SendTransactionOptions, WalletAdapterNetwork, WalletName } from '@solana/wallet-adapter-base';
import { BaseMessageSignerWalletAdapter, WalletReadyState } from '@solana/wallet-adapter-base';
import type { Connection, Transaction, TransactionSignature } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
export interface GlowWalletAdapterConfig {
    network?: WalletAdapterNetwork;
}
export declare const GlowWalletName: WalletName<"Glow">;
export declare class GlowWalletAdapter extends BaseMessageSignerWalletAdapter {
    name: WalletName<"Glow">;
    url: string;
    icon: string;
    private _connecting;
    private _wallet;
    private _publicKey;
    private _network;
    private _readyState;
    constructor(_config?: GlowWalletAdapterConfig);
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
