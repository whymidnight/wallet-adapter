/// <reference types="node" />
import type { WalletName } from '@solana/wallet-adapter-base';
import { BaseSignerWalletAdapter, WalletReadyState } from '@solana/wallet-adapter-base';
import type { PublicKey, Transaction } from '@solana/web3.js';
import './polyfills/index';
export interface LedgerWalletAdapterConfig {
    derivationPath?: Buffer;
}
export declare const LedgerWalletName: WalletName<"Ledger">;
export declare class LedgerWalletAdapter extends BaseSignerWalletAdapter {
    name: WalletName<"Ledger">;
    url: string;
    icon: string;
    private _derivationPath;
    private _connecting;
    private _transport;
    private _publicKey;
    private _readyState;
    constructor(config?: LedgerWalletAdapterConfig);
    get publicKey(): PublicKey | null;
    get connecting(): boolean;
    get readyState(): WalletReadyState;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    private _disconnected;
}
