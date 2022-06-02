import { Pair, Token, TokenAmount } from '../../../'
import { PairsResult, RawPair } from './../types/index'

interface AdapterPairs {
  aliumPairs: Pair[]
  sidePairs: Pair[]
}

export const adapterRawPairs = (args: PairsResult): AdapterPairs => {
  const aliumPairs = args.aliumPairs.map(adapteRaw)
  const sidePairs = args.sidePairs.map(adapteRaw)
  return { aliumPairs, sidePairs }
}

function adapteRaw(pair: RawPair) {
  const token0 = pair.token0
  const token1 = pair.token1
  return new Pair(
    new TokenAmount(new Token(token0.chainId, token0.address, token0.decimals, token0.symbol), pair.reserve0),
    new TokenAmount(new Token(token1.chainId, token1.address, token1.decimals, token1.symbol), pair.reserve1),
    pair.factory,
    pair.initCodeHash
  )
}
