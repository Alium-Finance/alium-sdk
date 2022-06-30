import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  MAINNET = 56,
  BSCTESTNET = 97,
  HECOMAINNET = 128,
  HECOTESTNET = 256,
  ETHER_MAINNET = 1,
  ETHER_TESTNET = 4,
  MATIC_MAINNET = 137,
  MATIC_TESTNET = 80001,
  METIS = 1088,
  METIC_TESTNET = 588,
  FANTOM = 250,
  FANTOM_TESTNET = 0xfa2,
  MOONRIVER = 1285,
  MOONBASE_ALPHA = 1287,
  MOONBEAM = 1284,
  AURORA = 1313161554,
  AURORA_TESTNET = 1313161555,
  OKC = 66,
  OKC_TESTNET = 65
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

export type ExchangeConfigT = {
  [key in 'alium' | 'side']: {
    router: { [key in ChainId]: string }
    factory: { [key in ChainId]: string }
    initCodeHash: { [key in ChainId]: string }
  }
}

export const EXCHANGE_CONFIG: ExchangeConfigT = {
  alium: {
    router: {
      [ChainId.MAINNET]: '0xB0e28C53B7C84741085EFE2e16CFF1d04149848f',
      [ChainId.BSCTESTNET]: '0x9F337DC10F14402287449De5444428A98aC63fc9',
      [ChainId.HECOMAINNET]: '0x87AAc701daFB96F9Fc6E3239FB19e91B455a4BC0',
      [ChainId.HECOTESTNET]: '0x9C55b05b03bFDC000F20Ff108516959711d906c4',
      [ChainId.ETHER_MAINNET]: '0x9D35B7afFf83Fd7EA2c9ed16E1C08af27aC07D18',
      [ChainId.ETHER_TESTNET]: '0x1041738e7c7696AFc08E3C05401aD504eE647aE4',
      [ChainId.MATIC_MAINNET]: '0x1041738e7c7696AFc08E3C05401aD504eE647aE4',
      [ChainId.MATIC_TESTNET]: '0x6cFe00906a2074F41788b8Dc4fa66a4c13C2A3a3',
      [ChainId.FANTOM]: '0x6cFe00906a2074F41788b8Dc4fa66a4c13C2A3a3',
      [ChainId.FANTOM_TESTNET]: '0x54a472C96b01f8639326D49Ef3eD4B9a78C3ba63',
      [ChainId.METIS]: '0x6cFe00906a2074F41788b8Dc4fa66a4c13C2A3a3',
      [ChainId.METIC_TESTNET]: '0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11',
      [ChainId.MOONRIVER]: '0x4D3D711853a4A25AE1D17347a97253A66Ed63D18',
      [ChainId.MOONBASE_ALPHA]: '0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11',
      [ChainId.MOONBEAM]: '0x1041738e7c7696AFc08E3C05401aD504eE647aE4',
      [ChainId.AURORA]: '0x9D35B7afFf83Fd7EA2c9ed16E1C08af27aC07D18',
      [ChainId.AURORA_TESTNET]: '0x54a472C96b01f8639326D49Ef3eD4B9a78C3ba63',
      [ChainId.OKC]: '0xF92dC46c2F373480cbC7Dacb0A003C4a2c23ea78',
      [ChainId.OKC_TESTNET]: '0xF92dC46c2F373480cbC7Dacb0A003C4a2c23ea78'
    },
    factory: {
      [ChainId.MAINNET]: '0xbEAC7e750728e865A3cb39D5ED6E3A3044ae4B98',
      [ChainId.BSCTESTNET]: '0x0Da3335f7F9B0f78c965046b8CF124a51548001E',
      [ChainId.HECOMAINNET]: '0x163668b3293EA61e6405eFB233abc905De1dcEF9',
      [ChainId.HECOTESTNET]: '0x45434b2c51D270BDa028c152DdDDBC1e71B7c199',
      [ChainId.ETHER_MAINNET]: '0x4D3D711853a4A25AE1D17347a97253A66Ed63D18',
      [ChainId.ETHER_TESTNET]: '0x3379b4a4Fc0E1614c0687C9F613024E83FE0E8b5',
      [ChainId.MATIC_MAINNET]: '0x3379b4a4Fc0E1614c0687C9F613024E83FE0E8b5',
      [ChainId.MATIC_TESTNET]: '0x3379b4a4Fc0E1614c0687C9F613024E83FE0E8b5',
      [ChainId.FANTOM]: '0x1041738e7c7696AFc08E3C05401aD504eE647aE4',
      [ChainId.FANTOM_TESTNET]: '0x1041738e7c7696AFc08E3C05401aD504eE647aE4',
      [ChainId.METIS]: '0x3379b4a4Fc0E1614c0687C9F613024E83FE0E8b5',
      [ChainId.METIC_TESTNET]: '0x54a472C96b01f8639326D49Ef3eD4B9a78C3ba63',
      [ChainId.MOONRIVER]: '0x3379b4a4Fc0E1614c0687C9F613024E83FE0E8b5',
      [ChainId.MOONBASE_ALPHA]: '0x54a472C96b01f8639326D49Ef3eD4B9a78C3ba63',
      [ChainId.MOONBEAM]: '0x3379b4a4Fc0E1614c0687C9F613024E83FE0E8b5',
      [ChainId.AURORA]: '0x6cFe00906a2074F41788b8Dc4fa66a4c13C2A3a3',
      [ChainId.AURORA_TESTNET]: '0x6cFe00906a2074F41788b8Dc4fa66a4c13C2A3a3',
      [ChainId.OKC]: '0x1041738e7c7696AFc08E3C05401aD504eE647aE4',
      [ChainId.OKC_TESTNET]: '0x6cFe00906a2074F41788b8Dc4fa66a4c13C2A3a3'
    },
    initCodeHash: {
      [ChainId.MAINNET]: '0x25c1427c313ae5ef5f43f21b21e260f4e278e19616bb3c570e41c050d5b1202a',
      [ChainId.BSCTESTNET]: '0xa3613311aca267922aeb6751f2832294f511676a5828b307f1b58249a11ea33c',
      [ChainId.HECOMAINNET]: '0x25c1427c313ae5ef5f43f21b21e260f4e278e19616bb3c570e41c050d5b1202a',
      [ChainId.HECOTESTNET]: '0x26aeaa7c5cd0c5b4696efa6a748e93b2cfa3d3213a34d60caf9c3aa537fff8c2',
      [ChainId.ETHER_MAINNET]: '0xdd99d07028f84ee171febb84ed2cae17b5de5c666e44f5ddc82ddb80596bb266',
      [ChainId.ETHER_TESTNET]: '0x269cb292c20aa4bea94050b94eab191ae63069a6defc99ff3fd4229fd77faf92',
      [ChainId.MATIC_MAINNET]: '0xb7bada1da8d86431fed71fb759b0b9cdb841ec842f119c986fbdf10289e83584',
      [ChainId.MATIC_TESTNET]: '0x269cb292c20aa4bea94050b94eab191ae63069a6defc99ff3fd4229fd77faf92',
      [ChainId.FANTOM]: '0x7be43cecea0ffc554436d7b8693e86fa02fa1b05137a23b3ef0970dadad16055',
      [ChainId.FANTOM_TESTNET]: '0x4c973f128ac0da381d093ea6b96b13de76b671a930ea4e5bdb93495d635a1416',
      [ChainId.METIS]: '0x7be43cecea0ffc554436d7b8693e86fa02fa1b05137a23b3ef0970dadad16055',
      [ChainId.METIC_TESTNET]: '0x4c973f128ac0da381d093ea6b96b13de76b671a930ea4e5bdb93495d635a1416',
      [ChainId.MOONRIVER]: '0x7be43cecea0ffc554436d7b8693e86fa02fa1b05137a23b3ef0970dadad16055',
      [ChainId.MOONBASE_ALPHA]: '0x7be43cecea0ffc554436d7b8693e86fa02fa1b05137a23b3ef0970dadad16055',
      [ChainId.MOONBEAM]: '0x7be43cecea0ffc554436d7b8693e86fa02fa1b05137a23b3ef0970dadad16055',
      [ChainId.AURORA]: '0x7be43cecea0ffc554436d7b8693e86fa02fa1b05137a23b3ef0970dadad16055',
      [ChainId.AURORA_TESTNET]: '0x7be43cecea0ffc554436d7b8693e86fa02fa1b05137a23b3ef0970dadad16055',
      [ChainId.OKC]: '0x269cb292c20aa4bea94050b94eab191ae63069a6defc99ff3fd4229fd77faf92',
      [ChainId.OKC_TESTNET]: '0x49f163f603c6e7ad015244b682cc0ff6dc637e12aaa0062897293ca0bff1d51f'
    }
  },
  side: {
    router: {
      [ChainId.MAINNET]: '0x591575579D607c8BDC5E1F15f1aa443FD5e5510a',
      [ChainId.BSCTESTNET]: '0x367a7567Dcca0944795BdE06Ab2a970b7139368A',
      [ChainId.HECOMAINNET]: '0x9D35B7afFf83Fd7EA2c9ed16E1C08af27aC07D18',
      [ChainId.HECOTESTNET]: '',
      [ChainId.ETHER_MAINNET]: '0x49e267f8C1151aD3E5F696c7B393F82E32a6C881',
      [ChainId.ETHER_TESTNET]: '',
      [ChainId.MATIC_MAINNET]: '0xF677c11F16D60dc69819cb02A0A951FBaA06c5C2',
      [ChainId.MATIC_TESTNET]: '',
      [ChainId.FANTOM]: '0x3379b4a4Fc0E1614c0687C9F613024E83FE0E8b5',
      [ChainId.FANTOM_TESTNET]: '',
      [ChainId.METIS]: '0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11',
      [ChainId.METIC_TESTNET]: '',
      [ChainId.MOONRIVER]: '0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11',
      [ChainId.MOONBASE_ALPHA]: '',
      [ChainId.MOONBEAM]: '0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11',
      [ChainId.AURORA]: '0xF92dC46c2F373480cbC7Dacb0A003C4a2c23ea78',
      [ChainId.AURORA_TESTNET]: '',
      [ChainId.OKC]: '0xc3364A27f56b95f4bEB0742a7325D67a04D80942',
      [ChainId.OKC_TESTNET]: ''
    },
    factory: {
      [ChainId.MAINNET]: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
      [ChainId.BSCTESTNET]: '0x0Da3335f7F9B0f78c965046b8CF124a51548001E',
      [ChainId.HECOMAINNET]: '0xb0b670fc1f7724119963018db0bfa86adb22d941',
      [ChainId.HECOTESTNET]: '',
      [ChainId.ETHER_MAINNET]: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
      [ChainId.ETHER_TESTNET]: '',
      [ChainId.MATIC_MAINNET]: '0x5757371414417b8c6caad45baef941abc7d3ab32',
      [ChainId.MATIC_TESTNET]: '',
      [ChainId.FANTOM]: '0x152ee697f2e276fa89e96742e9bb9ab1f2e61be3',
      [ChainId.FANTOM_TESTNET]: '',
      [ChainId.METIS]: '0x70f51d68D16e8f9e418441280342BD43AC9Dff9f',
      [ChainId.METIC_TESTNET]: '',
      [ChainId.MOONRIVER]: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
      [ChainId.MOONBASE_ALPHA]: '',
      [ChainId.MOONBEAM]: '0x985bca32293a7a496300a48081947321177a86fd',
      [ChainId.AURORA]: '0x7928d4fea7b2c90c732c10aff59cf403f0c38246',
      [ChainId.AURORA_TESTNET]: '',
      [ChainId.OKC]: '0x60DCD4a2406Be12dbe3Bb2AaDa12cFb762A418c1',
      [ChainId.OKC_TESTNET]: ''
    },
    initCodeHash: {
      [ChainId.MAINNET]: '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5',
      [ChainId.BSCTESTNET]: '0xa3613311aca267922aeb6751f2832294f511676a5828b307f1b58249a11ea33c',
      [ChainId.HECOMAINNET]: '0x2ad889f82040abccb2649ea6a874796c1601fb67f91a747a80e08860c73ddf24',
      [ChainId.HECOTESTNET]: '',
      [ChainId.ETHER_MAINNET]: '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
      [ChainId.ETHER_TESTNET]: '',
      [ChainId.MATIC_MAINNET]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
      [ChainId.MATIC_TESTNET]: '',
      [ChainId.FANTOM]: '0xcdf2deca40a0bd56de8e3ce5c7df6727e5b1bf2ac96f283fa9c4b3e6b42ea9d2',
      [ChainId.FANTOM_TESTNET]: '',
      [ChainId.METIS]: '0x966d65068a6a30f10fd1fa814258637a34e059081d79daa94f3e2b6cec48e810',
      [ChainId.METIC_TESTNET]: '',
      [ChainId.MOONRIVER]: '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
      [ChainId.MOONBASE_ALPHA]: '',
      [ChainId.MOONBEAM]: '0xe31da4209ffcce713230a74b5287fa8ec84797c9e77e1f7cfeccea015cdc97ea',
      [ChainId.AURORA]: '0xa06b8b0642cf6a9298322d0c8ac3c68c291ca24dc66245cf23aa2abc33b57e21',
      [ChainId.AURORA_TESTNET]: '',
      [ChainId.OKC]: '0x73fce53e0c877f17bc03bb34eead12c2c3f30d3493cff1259744d0c0dfcb3a92',
      [ChainId.OKC_TESTNET]: ''
    }
  }
}

export const MULTICALL_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x603bC4530ad41153859Bd4c0AE1FBa4D10660299',
  [ChainId.BSCTESTNET]: '0x1f12Df344B63F1eb20ED661Ac160208266179C49',
  [ChainId.HECOMAINNET]: '0x33d1cE5C23eaBCf9fC24b06dc29693Cba1ef02fE',
  [ChainId.HECOTESTNET]: '0x626413137d565852B498b776B49739D00B2345A8',
  [ChainId.ETHER_MAINNET]: '0x1f8559Ea0c917a79f8Ab475E78cF7F390C94F22d',
  [ChainId.ETHER_TESTNET]: '0xa951e5085a6F9508cC58065EC59845A5DEaE4cB3',
  [ChainId.MATIC_MAINNET]: '0x983b4625630ae1aaa7648f4cad68b9c0a52b8ae8',
  [ChainId.MATIC_TESTNET]: '0x9ca69E6168e0a87b75053CA0847838A9e73AFCBD',
  [ChainId.FANTOM]: '0x737EAd42CE0859C1CB056d162D1DE6dEBB41b4A6',
  [ChainId.FANTOM_TESTNET]: '0x9ED79c3A9221303a7B2Ee4C5617e1ea4688a12dA',
  [ChainId.METIS]: '0xF74B88DED057f7013A972F4caC2d31Cb70e0F7a2',
  [ChainId.METIC_TESTNET]: '0x2613047BfEEa744eEc08fD72864FB2Feb654Eb05',
  [ChainId.MOONRIVER]: '0xe762b3e74f04C9FbF1DAB800Fbd44e799089F024',
  [ChainId.MOONBASE_ALPHA]: '0x2613047BfEEa744eEc08fD72864FB2Feb654Eb05',
  [ChainId.MOONBEAM]: '0x1C259099C089E2C31d7FDF0A57f525dcAD82f670',
  [ChainId.AURORA]: '0x763FA754b3048F1B027eD7f5297FF9882c3e21df',
  [ChainId.AURORA_TESTNET]: '0x8613ecdbd50EFD649EE1D7837E78Fb71ee405240',
  [ChainId.OKC]: '0x4D3D711853a4A25AE1D17347a97253A66Ed63D18',
  [ChainId.OKC_TESTNET]: '0x849A4780B4A292B6Ce1e0fA07eAb533D8d78a009',
}

// Vampire
export const LIQUIDITY_MIGRATOR_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: /********/ '0xe4E690ce68f531EcCe6D78f8339184032D6D0957',
  [ChainId.BSCTESTNET]: /*****/ '0x2d375598D831202E043220C84D5fFB78a252dfb2',
  [ChainId.HECOMAINNET]: /****/ '0x4D3D711853a4A25AE1D17347a97253A66Ed63D18',
  [ChainId.HECOTESTNET]: /****/ '',
  [ChainId.ETHER_MAINNET]: /**/ '0x8613ecdbd50efd649ee1d7837e78fb71ee405240',
  [ChainId.ETHER_TESTNET]: /**/ '',
  [ChainId.MATIC_MAINNET]: /**/ '0x54a472C96b01f8639326D49Ef3eD4B9a78C3ba63',
  [ChainId.MATIC_TESTNET]: /**/ '',
  [ChainId.FANTOM]: /**/ '0x54a472C96b01f8639326D49Ef3eD4B9a78C3ba63',
  [ChainId.FANTOM_TESTNET]: /**/ '0xF92dC46c2F373480cbC7Dacb0A003C4a2c23ea78',
  [ChainId.METIS]: '0x54a472C96b01f8639326D49Ef3eD4B9a78C3ba63',
  [ChainId.METIC_TESTNET]: '0x4D3D711853a4A25AE1D17347a97253A66Ed63D18',
  [ChainId.MOONRIVER]: '0xF92dC46c2F373480cbC7Dacb0A003C4a2c23ea78',
  [ChainId.MOONBASE_ALPHA]: '0xF92dC46c2F373480cbC7Dacb0A003C4a2c23ea78',
  [ChainId.MOONBEAM]: '0x6cFe00906a2074F41788b8Dc4fa66a4c13C2A3a3',
  [ChainId.AURORA]: '0x8613ecdbd50EFD649EE1D7837E78Fb71ee405240',
  [ChainId.AURORA_TESTNET]: '0x4D3D711853a4A25AE1D17347a97253A66Ed63D18',
  [ChainId.OKC]: '0x9D35B7afFf83Fd7EA2c9ed16E1C08af27aC07D18',
  [ChainId.OKC_TESTNET]: '0x9D35B7afFf83Fd7EA2c9ed16E1C08af27aC07D18'
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _998 = JSBI.BigInt(998)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
