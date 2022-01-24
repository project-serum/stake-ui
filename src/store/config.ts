import { PublicKey } from '@solana/web3.js';

type Networks = { [label: string]: Network };

export type Network = {
  // Cluster.
  label: string;
  url: string;
  explorerClusterSuffix: string;

  // Faucets.
  srmFaucet: PublicKey | null;
  msrmFaucet: PublicKey | null;

  // Programs.
  registryProgramId: PublicKey;
  lockupProgramId: PublicKey;
  multisigProgramId: PublicKey;

  // Staking instances.
  registrars: { [token: string]: PublicKey };

  // Whitelisted token mints.
  mints: { [token: string]: PublicKey };
};

export const networks: Networks = {
  mainnet: {
    // Cluster.
    label: 'Mainnet Beta',
    url: 'https://api.mainnet-beta.solana.com',
    //url: 'https://api.mainnet-beta.solana.com',
    explorerClusterSuffix: '',

    srmFaucet: null,
    msrmFaucet: null,

    registryProgramId: new PublicKey(
      'GrAkKfEpTKQuVHG2Y97Y2FF4i7y7Q5AHLK94JBy7Y5yv',
    ),
    lockupProgramId: new PublicKey(
      '6ebQNeTPZ1j7k3TtkCCtEPRvG7GQsucQrZ7sSEDQi9Ks',
    ),
    multisigProgramId: new PublicKey(
      '3S6ALMCGVib4X3vVR3CLpm2K6Ng5qbWFYMTo5jfxWcEq',
    ),
    registrars: {
      srm: new PublicKey('5vJRzKtcp4fJxqmR7qzajkaKSiAb6aT9grRsaZKXU222'),
      msrm: new PublicKey('7uURiX2DwCpRuMFebKSkFtX9v5GK1Cd8nWLL8tyoyxZY'),
      fida: new PublicKey('5C2ayX1E2SJ5kKEmDCA9ue9eeo3EPR34QFrhyzbbs3qh'),
      dxl: new PublicKey('BQtp3xGPTFXJSt1MVKxtVSefRcBWmUkzTNM3g1t9efcK'),
    },
    mints: {
      srm: new PublicKey('SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt'),
      msrm: new PublicKey('MSRMcoVyrFxnSgo5uXwone5SKcGhT1KEJMFEkMEWf9L'),
      fida: new PublicKey('EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp'),
      dxl: new PublicKey('GsNzxJfFn6zQdJGeYsupJWzUAm57Ba7335mfhWvFiE9Z'),
      port: new PublicKey('PoRTjZMPXb9T7dyU7tpLEZRQj7e6ssfAE62j2oQuc6y'),
    },
  },
  devnet: {
    // Cluster.
    label: 'Devnet',
    url: 'https://api.devnet.solana.com',
    explorerClusterSuffix: 'devnet',

    srmFaucet: null,
    msrmFaucet: null,
    multisigProgramId: new PublicKey(
      '9z7Pq56To96qbVLzuBcf47Lc7u8uUWZh6k5rhcaTsDjz',
    ),

    registryProgramId: new PublicKey(
      '65aMavjMw3EhmWKVCkGn1Uj2SqZ3XY4coJhYM1BVJTHw',
    ),
    lockupProgramId: new PublicKey(
      'bRGMWZz4mzJ8NG8csn5QNTbJDv2973QSvppbfcAboje',
    ),
    registrars: {
      token1: new PublicKey('EqbwcuvPWLZ5fav58HrieHmJEqTm6RPu5bmn5bBQJ3mu'),
      token2: new PublicKey('2rDWuS6yVFQ3jYx1nQq7gs3HgzWLJcUwm9sTUBWuXuyK'),
    },
    mints: {
      token1: new PublicKey('Ep6ASaHQ4gKiN3gWNRKYttZEQ7b82seMk9HWc5JNBJZP'),
      token2: new PublicKey('5vWxJthWbCFuNSZj1qcP9WoU8E6UG3DUfeAoPvYoN8PQ'),
    },
  },

  // Fill in with your local cluster addresses.
  localhost: {
    // Cluster.
    label: 'Localhost',
    url: 'http://localhost:8899',
    explorerClusterSuffix: 'localhost',

    srmFaucet: null,
    msrmFaucet: null,

    multisigProgramId: new PublicKey(
      '9z7Pq56To96qbVLzuBcf47Lc7u8uUWZh6k5rhcaTsDjz',
    ),
    registryProgramId: new PublicKey(
      'A3ukM9swAsTqVC6g5Zy9FsWXofe5f2JhXMEfzenNf9Q7',
    ),
    lockupProgramId: new PublicKey(
      '2z65xTKJDM4iJBVz5aXtNrWfQvKGgNJvnqY1GL2mkimu',
    ),
    registrars: {
      token1: new PublicKey('Fwi5pie2VgWTDUSRNkca1HdFCke5r3v3mY83JbxtC3CJ'),
      token2: new PublicKey('9kCGBWgHzGGChvmAsmu5jrXwEShZfLxKRTmKdxEpFUBr'),
    },
    mints: {
      token1: new PublicKey('2aE1pietadYMeDtdqKayS4SVo9W4xtC3U7SN4iGWCVcX'),
      token2: new PublicKey('Cgan7PWyBH6Z7JNA6f9kDYgwBMZBxRexpdd29PJgnqah'),
    },
  },
};
