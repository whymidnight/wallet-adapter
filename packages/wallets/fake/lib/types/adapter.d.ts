import type { SendTransactionOptions, WalletName } from '@solana/wallet-adapter-base';
import { BaseWalletAdapter, WalletReadyState } from '@solana/wallet-adapter-base';
import type { Connection, Transaction, TransactionSignature } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
export declare const FakeWalletName: WalletName<"Fake Wallet">;
export declare class FakeWalletAdapter extends BaseWalletAdapter {
    name: WalletName<"Fake Wallet">;
    url: string;
    icon: string;
    _publicKey: PublicKey | null;
    constructor();
    get connecting(): boolean;
    get publicKey(): PublicKey | null;
    get readyState(): WalletReadyState;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendTransaction(_transaction: Transaction, _connection: Connection, _options: SendTransactionOptions): Promise<TransactionSignature>;
}
