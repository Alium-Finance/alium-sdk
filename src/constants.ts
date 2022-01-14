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
  FANTOM = 250,
  FANTOM_TESTNET = 0xfa2
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

export const FACTORY_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xbEAC7e750728e865A3cb39D5ED6E3A3044ae4B98',
  [ChainId.BSCTESTNET]: '0x0Da3335f7F9B0f78c965046b8CF124a51548001E',
  [ChainId.HECOMAINNET]: '0x163668b3293EA61e6405eFB233abc905De1dcEF9',
  [ChainId.HECOTESTNET]: '0x45434b2c51D270BDa028c152DdDDBC1e71B7c199',
  [ChainId.ETHER_MAINNET]: '0x4D3D711853a4A25AE1D17347a97253A66Ed63D18',
  [ChainId.ETHER_TESTNET]: '0x3379b4a4Fc0E1614c0687C9F613024E83FE0E8b5',
  [ChainId.MATIC_MAINNET]: '0x3379b4a4Fc0E1614c0687C9F613024E83FE0E8b5',
  [ChainId.MATIC_TESTNET]: '0x3379b4a4Fc0E1614c0687C9F613024E83FE0E8b5',
  [ChainId.FANTOM]: '',
  [ChainId.FANTOM_TESTNET]: '0x1041738e7c7696AFc08E3C05401aD504eE647aE4'
}

export const INIT_CODE_HASH: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x25c1427c313ae5ef5f43f21b21e260f4e278e19616bb3c570e41c050d5b1202a',
  [ChainId.BSCTESTNET]: '0xa3613311aca267922aeb6751f2832294f511676a5828b307f1b58249a11ea33c',
  [ChainId.HECOMAINNET]: '0x25c1427c313ae5ef5f43f21b21e260f4e278e19616bb3c570e41c050d5b1202a',
  [ChainId.HECOTESTNET]: '0x26aeaa7c5cd0c5b4696efa6a748e93b2cfa3d3213a34d60caf9c3aa537fff8c2',
  [ChainId.ETHER_MAINNET]: '0xdd99d07028f84ee171febb84ed2cae17b5de5c666e44f5ddc82ddb80596bb266',
  [ChainId.ETHER_TESTNET]: '0x269cb292c20aa4bea94050b94eab191ae63069a6defc99ff3fd4229fd77faf92',
  [ChainId.MATIC_MAINNET]: '0xb7bada1da8d86431fed71fb759b0b9cdb841ec842f119c986fbdf10289e83584',
  [ChainId.MATIC_TESTNET]: '0x269cb292c20aa4bea94050b94eab191ae63069a6defc99ff3fd4229fd77faf92',
  [ChainId.FANTOM]: '',
  [ChainId.FANTOM_TESTNET]: '0x4c973f128ac0da381d093ea6b96b13de76b671a930ea4e5bdb93495d635a1416'
}

export const ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xB0e28C53B7C84741085EFE2e16CFF1d04149848f',
  [ChainId.BSCTESTNET]: '0x9F337DC10F14402287449De5444428A98aC63fc9',
  [ChainId.HECOMAINNET]: '0x87AAc701daFB96F9Fc6E3239FB19e91B455a4BC0',
  [ChainId.HECOTESTNET]: '0x9C55b05b03bFDC000F20Ff108516959711d906c4',
  [ChainId.ETHER_MAINNET]: '0x9D35B7afFf83Fd7EA2c9ed16E1C08af27aC07D18',
  [ChainId.ETHER_TESTNET]: '0x1041738e7c7696AFc08E3C05401aD504eE647aE4',
  [ChainId.MATIC_MAINNET]: '0x1041738e7c7696AFc08E3C05401aD504eE647aE4',
  [ChainId.MATIC_TESTNET]: '0x6cFe00906a2074F41788b8Dc4fa66a4c13C2A3a3',
  [ChainId.FANTOM]: '',
  [ChainId.FANTOM_TESTNET]: '0x54a472C96b01f8639326D49Ef3eD4B9a78C3ba63'
}

export const SIDE_ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '',
  [ChainId.BSCTESTNET]: '0x367a7567Dcca0944795BdE06Ab2a970b7139368A',
  [ChainId.HECOMAINNET]: '',
  [ChainId.HECOTESTNET]: '',
  [ChainId.ETHER_MAINNET]: '',
  [ChainId.ETHER_TESTNET]: '',
  [ChainId.MATIC_MAINNET]: '',
  [ChainId.MATIC_TESTNET]: '',
  [ChainId.FANTOM]: '',
  [ChainId.FANTOM_TESTNET]: ''
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
