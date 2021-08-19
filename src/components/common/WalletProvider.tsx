import React, {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useMemo,
  useContext,
} from "react";
import { useSelector } from "react-redux";
import {
  PublicKey,
  Transaction,
  Connection,
  ConfirmOptions,
} from "@solana/web3.js";
import { Provider } from "@project-serum/common";
import { Program } from "@project-serum/anchor";
import { WalletProvider as SolanaWalletProvider } from "@solana/wallet-adapter-react";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
} from "@solana/wallet-adapter-wallets";
import { State as StoreState } from "../../store/reducer";
import LockupIdl from "../../idl/lockup";
import RegistryIdl from "../../idl/registry";
import MultisigIdl from "../../idl/multisig";
import { useWallet as useSolana } from "@solana/wallet-adapter-react";
import { WalletAdapter } from "@solana/wallet-adapter-base";

export function useWallet(): WalletContextValues {
  const w = useContext(WalletContext);
  if (!w) {
    throw new Error("Missing wallet context");
  }
  return w;
}

const WalletContext = React.createContext<null | WalletContextValues>(null);

type WalletContextValues = {
  wallet: Wallet;
  lockupClient: Program;
  registryClient: Program;
	multisigClient: Program;
};

export default function WalletProvider(
  props: PropsWithChildren<ReactNode>
): ReactElement {
  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet(), getSolletWallet()],
    []
  );

  return (
    <SolanaWalletProvider wallets={wallets}>
      <WalletProviderInner {...props} />
    </SolanaWalletProvider>
  );
}

function WalletProviderInner(props: PropsWithChildren<ReactNode>) {
  const { wallet: solWallet } = useSolana();
  const { walletProvider, network } = useSelector((state: StoreState) => {
    return {
      walletProvider: state.common.walletProvider,
      network: state.common.network,
    };
  });
  const { wallet, lockupClient, registryClient, multisigClient } =
    useMemo(() => {
      const opts: ConfirmOptions = {
        preflightCommitment: "recent",
        commitment: "recent",
      };
      const connection = new Connection(network.url, opts.preflightCommitment);
      const wallet = new Wallet(solWallet ? solWallet.adapter() : undefined);
      // @ts-ignore
      const provider = new Provider(connection, wallet, opts);

      const lockupClient = new Program(
        LockupIdl,
        network.lockupProgramId,
        provider
      );
      const registryClient = new Program(
        RegistryIdl,
        network.registryProgramId,
        provider
      );
      const multisigClient = new Program(
        MultisigIdl,
        network.multisigProgramId,
        provider,
      );
      return {
        wallet,
        lockupClient,
        registryClient,
        multisigClient,
      };
    }, [solWallet, walletProvider, network]);

  return (
    <WalletContext.Provider
      value={{ wallet, lockupClient, registryClient, multisigClient }}
    >
      {props.children}
    </WalletContext.Provider>
  );
}

class Wallet {
  get publicKey(): PublicKey | undefined {
    // @ts-ignore
    return this.adapter ? this.adapter.publicKey : undefined;
  }

  constructor(readonly adapter: WalletAdapter | undefined) {}

  on(event: any, cb: any) {
    if (this.adapter) {
      return this.adapter.on(event, cb);
    }
  }

  async connect() {
    if (this.adapter) {
      try {
        await this.adapter.connect();
      } catch (err) {
        console.error(err);
      }
    }
  }

  disconnect() {
    if (this.adapter) {
      this.adapter.disconnect();
    }
  }

  signTransaction(tx: Transaction) {
    if (this.adapter) {
      return this.adapter.signTransaction(tx);
    }
  }

  signAllTransactions(txs: Transaction[]) {
    if (this.adapter) {
      return this.adapter.signAllTransactions(txs);
    }
  }
}
