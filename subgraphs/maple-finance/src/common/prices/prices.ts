import { BigDecimal, BigInt, ethereum, log } from "@graphprotocol/graph-ts";
import { Token } from "../../../generated/schema";

import { chainlinkOracleGetTokenPriceInUSD } from "./oracles/chainlink";
import { mapleOracleGetTokenPriceInUSD } from "./oracles/maple";
import { yearnOracleGetTokenPriceInUSD } from "./oracles/yearn";
import { ZERO_BD, OracleType } from "../constants";
import { parseUnits } from "../utils";

import * as constants from "./common/constants";
import { CustomPriceType } from "./common/types";
import { getCurvePriceUsdc } from "./routers/CurveRouter";
import { getPriceUsdc as getPriceUsdcUniswap } from "./routers/UniswapRouter";
import { getPriceUsdc as getPriceUsdcSushiswap } from "./routers/SushiSwapRouter";
import { getTokenPriceFromSushiSwap } from "./calculations/CalculationsSushiswap";
import { getTokenPriceFromCalculationCurve } from "./calculations/CalculationsCurve";

export function getUsdPricePerToken(event: ethereum.Event, token: Token): BigDecimal {
    // Check if tokenAddr is a NULL Address
    if (token.toHex() == constants.ZERO_ADDRESS_STRING) {
      return new BigDecimal();
    }
  
    let network = dataSource.network();
    
    // 1. Maple Oracle
    let mapleLensPrice = mapleOracleGetTokenPriceInUSD(token);
    if (!mapleLensPrice.reverted) {
      log.warning("[MapleLensOracle] Token: {}, Price: {}", [
        token.toHexString(),
        mapleLensPrice.usdPrice.div(mapleLensPrice.decimalsBaseTen).toString(),
      ]);
      token._lastPriceOracle = OracleType.MAPLE
      token.save();
      return mapleLensPrice;
    }
    
    // 2. ChainLink Feed Registry
    let chainLinkPrice = chainlinkOracleGetTokenPriceInUSD(token);
    if (!chainLinkPrice.reverted) {
      log.warning("[ChainLinkFeed] Token: {}, Price: {}", [
        token.toHexString(),
        chainLinkPrice.usdPrice.div(chainLinkPrice.decimalsBaseTen).toString(),
      ]);
      token._lastPriceOracle = OracleType.CHAIN_LINK
      token.save();
      return chainLinkPrice;
    }
    
    // 3. Yearn Lens Oracle
    let yearnLensPrice = yearnOracleGetTokenPriceInUSD(token);
    if (!yearnLensPrice.reverted) {
      log.warning("[YearnLensOracle] TokenAddress: {}, Price: {}", [
        token.toHexString(),
        yearnLensPrice.usdPrice.div(yearnLensPrice.decimalsBaseTen).toString(),
      ]);
      token._lastPriceOracle = OracleType.YEARN_LENS
      token.save();
      return yearnLensPrice;
    }
  
  
    // 4. CalculationsCurve
    let calculationsCurvePrice = getTokenPriceFromCalculationCurve(token);
    if (!calculationsCurvePrice.reverted) {
      log.warning("[CalculationsCurve] Token: {}, Price: {}", [
        token.toHexString(),
        calculationsCurvePrice.usdPrice.div(calculationsCurvePrice.decimalsBaseTen).toString(),
      ]);
      token._lastPriceOracle = OracleType.CURVE_CALC
      token.save();
      return calculationsCurvePrice;
    }
  
    // 5. CalculationsSushiSwap
    let calculationsSushiSwapPrice = getTokenPriceFromSushiSwap(token);
    if (!calculationsSushiSwapPrice.reverted) {
      log.warning("[CalculationsSushiSwap] Token: {}, Price: {}", [
        token.toHexString(),
        calculationsSushiSwapPrice.usdPrice.div(calculationsSushiSwapPrice.decimalsBaseTen).toString(),
      ]);
      token._lastPriceOracle = OracleType.SUSHISWAP_CALC
      token.save();
      return calculationsSushiSwapPrice;
    }
  
    // 6. Curve Router
    let curvePrice = getCurvePriceUsdc(token);
    if (!curvePrice.reverted) {
      log.warning("[CurveRouter] Token: {}, Price: {}", [
        token.toHexString(),
        curvePrice.usdPrice.div(curvePrice.decimalsBaseTen).toString(),
      ]);
      token._lastPriceOracle = OracleType.CURVE_ROUTE
      token.save();
      return curvePrice;
    }
  
    // 7. Uniswap Router
    let uniswapPrice = getPriceUsdcUniswap(token);
    if (!uniswapPrice.reverted) {
      log.warning("[UniswapRouter] Token: {}, Price: {}", [
        token.toHexString(),
        uniswapPrice.usdPrice.div(uniswapPrice.decimalsBaseTen).toString(),
      ]);
      token._lastPriceOracle = OracleType.UNISWAP_ROUTE
      token.save();
      return uniswapPrice;
    }
  
    // 8. SushiSwap Router
    let sushiswapPrice = getPriceUsdcSushiswap(token);
    if (!sushiswapPrice.reverted) {
      log.warning("[SushiSwapRouter] Token: {}, Price: {}", [
        token.toHexString(),
        sushiswapPrice.usdPrice.div(sushiswapPrice.decimalsBaseTen).toString(),
      ]);
      token._lastPriceOracle = OracleType.SUSHISWAP_ROUTE
      token.save();
      return sushiswapPrice;
    }
  
    log.warning("[Oracle] Failed to Fetch Price, tokenAddr: {}", [token.toHexString()]);
    
    return new CustomPriceType();

  }
  

export function getTokenAmountInUSD(event: ethereum.Event, token: Token, amount: BigInt): BigDecimal {
    const tokenPrice = getTokenPriceInUSD(event, token);

    return parseUnits(amount, token.decimals).times(tokenPrice);
}
