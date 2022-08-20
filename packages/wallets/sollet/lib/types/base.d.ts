import type SolWalletAdapter from '@project-serum/sol-wallet-adapter';
import { BaseMessageSignerWalletAdapter, WalletAdapterNetwork, WalletReadyState } from '@solana/wallet-adapter-base';
import type { PublicKey, Transaction } from '@solana/web3.js';
interface SolletWallet {
    postMessage?(...args: unknown[]): unknown;
}
export interface SolletWalletAdapterConfig {
    provider?: string | SolletWallet;
    network?: WalletAdapterNetwork;
    timeout?: number;
}
export declare abstract class BaseSolletWalletAdapter extends BaseMessageSignerWalletAdapter {
    protected _provider: string | SolletWallet | undefined;
    protected _network: WalletAdapterNetwork;
    protected _timeout: number;
    protected _connecting: boolean;
    protected _wallet: SolWalletAdapter | null;
    protected _readyState: WalletReadyState;
    constructor({ provider, network, timeout }?: SolletWalletAdapterConfig);
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
export {};