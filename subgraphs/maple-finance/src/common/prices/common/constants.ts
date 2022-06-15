import * as MAINNET from "../config/mainnet";
import * as FANTOM from "../config/fantom";
import * as ARBITRUM_ONE from "../config/arbitrumOne";

import { Address, BigDecimal, BigInt, TypedMap } from "@graphprotocol/graph-ts";
import { UniswapPair__getReservesResult } from "../../../generated/UniswapV2Factory/UniswapPair";
import { SushiSwapPair__getReservesResult } from "../../../generated/UniswapV2Factory/SushiSwapPair";

///////////////////////////////////////////////////////////////////////////
/////////////////////////////////// COMMON ////////////////////////////////
///////////////////////////////////////////////////////////////////////////

export const BIGINT_ZERO = BigInt.fromI32(0);
export const BIGINT_TEN = BigInt.fromI32(10);
export const BIGINT_TEN_THOUSAND = BigInt.fromI32(10000);

export const BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO);

export const DEFAULT_USDC_DECIMALS = 6;
export const DEFAULT_DECIMALS = BigInt.fromI32(18);

export const ZERO_ADDRESS_STRING = "0x0000000000000000000000000000000000000000";

export const ZERO_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);
export const CHAIN_LINK_USD_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000348"
);

export const WHITELIST_TOKENS_LIST: string[] = [
  "WETH",
  "USDT",
  "DAI",
  "USDC",
  "ETH",
  "WBTC",
  "EURS",
  "LINK",
  "gfUSDT",
  "WFTM",
  "fBTC",
  "FRAX",
  "CRV",
];

export namespace Network {
  export const ARBITRUM_ONE = "ARBITRUM_ONE";
  export const AVALANCHE = "AVALANCHE";
  export const AURORA = "AURORA";
  export const BSC = "BSC"; // aka BNB Chain
  export const CELO = "CELO";
  export const MAINNET = "MAINNET"; // Ethereum mainnet
  export const FANTOM = "FANTOM";
  export const FUSE = "FUSE";
  export const MOONBEAM = "MOONBEAM";
  export const MOONRIVER = "MOONRIVER";
  export const NEAR_MAINNET = "NEAR_MAINNET";
  export const OPTIMISM = "OPTIMISM";
  export const MATIC = "MATIC"; // aka Polygon
  export const XDAI = "XDAI"; // aka Gnosis Chain
}

export namespace ProtocolType {
  export const EXCHANGE = "EXCHANGE";
  export const LENDING = "LENDING";
  export const YIELD = "YIELD";
  export const BRIDGE = "BRIDGE";
  export const GENERIC = "GENERIC";
}

export namespace RewardTokenType {
  export const DEPOSIT = "DEPOSIT";
  export const BORROW = "BORROW";
}

export namespace LendingType {
  export const CDP = "CDP";
  export const POOLED = "POOLED";
}

export namespace RiskType {
  export const GLOBAL = "GLOBAL";
  export const ISOLATED = "ISOLATED";
}

export namespace InterestRateType {
  export const STABLE = "STABLE";
  export const VARIABLE = "VARIABLE";
  export const FIXED_TERM = "FIXED_TERM";
}

export namespace InterestRateSide {
  export const LENDER = "LENDER";
  export const BORROWER = "BORROWER";
}

export namespace TransactionType {
  export const DEPOSIT = "DEPOSIT";
  export const WITHDRAW = "WITHDRAW";
  export const CLAIM = "CLAIM";
  export const BORROW = "BORROW";
  export const REPAY = "REPAY";
  export const LIQUIDATE = "LIQUIDATE";
  export const STAKE = "STAKE";
  export const UNSTAKE = "UNSTAKE";
}

export namespace StakeType {
  export const STAKE_LOCKER = "STAKE_LOCKER";
  export const MPL_LP_REWARDS = "MPL_LP_REWARDS";
  export const MPL_STAKE_REWARDS = "MPL_STAKE_REWARDS";
}

export namespace OracleType {
  export const NONE = "NONE";
  export const MAPLE = "MAPLE";
  export const CHAIN_LINK = "CHAIN_LINK";
  export const YEARN_LENS = "YEARN_LENS";
  export const CURVE_CALC = "CURVE_CALC";
  export const SUSHISWAP_CALC = "SUSHISWAP_CALC";
  export const CURVE_ROUTE = "CURVE_ROUTE";
  export const SUSHISWAP_ROUTE = "SUSHISWAP_ROUTE";
  export const UNISWAP_ROUTE = "UNISWAP_ROUTE";
}

export namespace LoanVersion {
  export const V1 = "V1";
  export const V2_OR_V3 = "V2_OR_V3";
}

////////////////////////////
///// Solifidity Enums /////
////////////////////////////

export namespace PoolState {
  export const Initialized: i32 = 0;
  export const Finalized: i32 = 1;
  export const Deactivated: i32 = 2;
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////// CURVE CONTRACT //////////////////////////////
///////////////////////////////////////////////////////////////////////////

export const CURVE_CALCULATIONS_ADDRESS_MAP = new TypedMap<string, Address>();
CURVE_CALCULATIONS_ADDRESS_MAP.set(
  MAINNET.NETWORK_STRING,
  MAINNET.CURVE_CALCULATIONS_ADDRESS
);
CURVE_CALCULATIONS_ADDRESS_MAP.set(
  FANTOM.NETWORK_STRING,
  FANTOM.CURVE_CALCULATIONS_ADDRESS
);
CURVE_CALCULATIONS_ADDRESS_MAP.set(
  ARBITRUM_ONE.NETWORK_STRING,
  ARBITRUM_ONE.CURVE_CALCULATIONS_ADDRESS
);

export const CURVE_REGISTRY_ADDRESS_MAP = new TypedMap<string, Address>();
CURVE_REGISTRY_ADDRESS_MAP.set(
  MAINNET.NETWORK_STRING,
  MAINNET.CURVE_REGISTRY_ADDRESS
);
CURVE_REGISTRY_ADDRESS_MAP.set(
  FANTOM.NETWORK_STRING,
  FANTOM.CURVE_REGISTRY_ADDRESS
);
CURVE_REGISTRY_ADDRESS_MAP.set(
  ARBITRUM_ONE.NETWORK_STRING,
  ARBITRUM_ONE.CURVE_REGISTRY_ADDRESS
);

export const CURVE_POOL_REGISTRY_ADDRESS_MAP = new TypedMap<string, Address>();
CURVE_POOL_REGISTRY_ADDRESS_MAP.set(
  MAINNET.NETWORK_STRING,
  MAINNET.CURVE_POOL_REGISTRY_ADDRESS
);
CURVE_POOL_REGISTRY_ADDRESS_MAP.set(
  FANTOM.NETWORK_STRING,
  FANTOM.CURVE_POOL_REGISTRY_ADDRESS
);
CURVE_POOL_REGISTRY_ADDRESS_MAP.set(
  ARBITRUM_ONE.NETWORK_STRING,
  ARBITRUM_ONE.CURVE_POOL_REGISTRY_ADDRESS
);

///////////////////////////////////////////////////////////////////////////
///////////////////////////// SUSHISWAP CONTRACT //////////////////////////
///////////////////////////////////////////////////////////////////////////

export const SUSHISWAP_DEFAULT_RESERVE_CALL =
  new SushiSwapPair__getReservesResult(BIGINT_ZERO, BIGINT_ZERO, BIGINT_ZERO);

export const SUSHISWAP_CALCULATIONS_ADDRESS_MAP = new TypedMap<
  string,
  Address
>();
SUSHISWAP_CALCULATIONS_ADDRESS_MAP.set(
  MAINNET.NETWORK_STRING,
  MAINNET.SUSHISWAP_CALCULATIONS_ADDRESS
);
SUSHISWAP_CALCULATIONS_ADDRESS_MAP.set(
  FANTOM.NETWORK_STRING,
  FANTOM.SUSHISWAP_CALCULATIONS_ADDRESS
);
SUSHISWAP_CALCULATIONS_ADDRESS_MAP.set(
  ARBITRUM_ONE.NETWORK_STRING,
  ARBITRUM_ONE.SUSHISWAP_CALCULATIONS_ADDRESS
);

export const SUSHISWAP_WETH_ADDRESS = new TypedMap<string, Address>();
SUSHISWAP_WETH_ADDRESS.set(
  MAINNET.NETWORK_STRING,
  MAINNET.SUSHISWAP_WETH_ADDRESS
);
SUSHISWAP_WETH_ADDRESS.set(
  FANTOM.NETWORK_STRING,
  FANTOM.SUSHISWAP_WETH_ADDRESS
);
SUSHISWAP_WETH_ADDRESS.set(
  ARBITRUM_ONE.NETWORK_STRING,
  ARBITRUM_ONE.SUSHISWAP_WETH_ADDRESS
);

export const SUSHISWAP_ROUTER_ADDRESS_MAP = new TypedMap<
  string,
  TypedMap<string, Address>
>();
SUSHISWAP_ROUTER_ADDRESS_MAP.set(
  MAINNET.NETWORK_STRING,
  MAINNET.SUSHISWAP_ROUTER_ADDRESS
);
SUSHISWAP_ROUTER_ADDRESS_MAP.set(
  FANTOM.NETWORK_STRING,
  FANTOM.SUSHISWAP_ROUTER_ADDRESS
);
SUSHISWAP_ROUTER_ADDRESS_MAP.set(
  ARBITRUM_ONE.NETWORK_STRING,
  ARBITRUM_ONE.SUSHISWAP_ROUTER_ADDRESS
);

///////////////////////////////////////////////////////////////////////////
///////////////////////////// UNISWAP CONTRACT ////////////////////////////
///////////////////////////////////////////////////////////////////////////

export const UNISWAP_DEFAULT_RESERVE_CALL = new UniswapPair__getReservesResult(
  BIGINT_ZERO,
  BIGINT_ZERO,
  BIGINT_ZERO
);

export const UNISWAP_ROUTER_CONTRACT_ADDRESSES = new TypedMap<
  string,
  TypedMap<string, Address>
>();
UNISWAP_ROUTER_CONTRACT_ADDRESSES.set(
  MAINNET.NETWORK_STRING,
  MAINNET.UNISWAP_ROUTER_ADDRESS
);
UNISWAP_ROUTER_CONTRACT_ADDRESSES.set(
  FANTOM.NETWORK_STRING,
  FANTOM.SPOOKY_SWAP_ROUTER_ADDRESS
);
UNISWAP_ROUTER_CONTRACT_ADDRESSES.set(
  ARBITRUM_ONE.NETWORK_STRING,
  ARBITRUM_ONE.UNISWAP_ROUTER_ADDRESS
);

///////////////////////////////////////////////////////////////////////////
///////////////////////////// YEARNLENS CONTRACT //////////////////////////
///////////////////////////////////////////////////////////////////////////

export const YEARN_LENS_CONTRACT_ADDRESS = new Map<string, string>();
YEARN_LENS_CONTRACT_ADDRESS.set(
  MAINNET.NETWORK_STRING,
  MAINNET.YEARN_LENS_CONTRACT_ADDRESS
);
YEARN_LENS_CONTRACT_ADDRESS.set(
  FANTOM.NETWORK_STRING,
  FANTOM.YEARN_LENS_CONTRACT_ADDRESS
);
YEARN_LENS_CONTRACT_ADDRESS.set(
  ARBITRUM_ONE.NETWORK_STRING,
  ARBITRUM_ONE.YEARN_LENS_CONTRACT_ADDRESS
);

///////////////////////////////////////////////////////////////////////////
///////////////////////////// CHAINLINK CONTRACT //////////////////////////
///////////////////////////////////////////////////////////////////////////

export const CHAIN_LINK_CONTRACT_ADDRESS = new Map<string, Address>();
CHAIN_LINK_CONTRACT_ADDRESS.set(
  MAINNET.NETWORK_STRING,
  MAINNET.CHAIN_LINK_CONTRACT_ADDRESS
);
CHAIN_LINK_CONTRACT_ADDRESS.set(
  FANTOM.NETWORK_STRING,
  FANTOM.CHAIN_LINK_CONTRACT_ADDRESS
);
CHAIN_LINK_CONTRACT_ADDRESS.set(
  ARBITRUM_ONE.NETWORK_STRING,
  ARBITRUM_ONE.CHAIN_LINK_CONTRACT_ADDRESS
);

///////////////////////////////////////////////////////////////////////////
///////////////////////////////// HELPERS /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

export const WHITELIST_TOKENS_MAP = new TypedMap<
  string,
  TypedMap<string, Address>
>();
WHITELIST_TOKENS_MAP.set(MAINNET.NETWORK_STRING, MAINNET.WHITELIST_TOKENS);
WHITELIST_TOKENS_MAP.set(FANTOM.NETWORK_STRING, FANTOM.WHITELIST_TOKENS);
WHITELIST_TOKENS_MAP.set(
  ARBITRUM_ONE.NETWORK_STRING,
  ARBITRUM_ONE.WHITELIST_TOKENS
);

/////////////////////////////
///// Maple Protocol /////
/////////////////////////////

export const MAPLE_CONTRACT_ADDRESS = new Map<string, string>();
MAPLE_CONTRACT_ADDRESS.set(
  MAINNET.NETWORK_STRING,
  MAINNET.MAPLE_CONTRACT_ADDRESS
);
MAPLE_CONTRACT_ADDRESS.set(
  FANTOM.NETWORK_STRING,
  FANTOM.MAPLE_CONTRACT_ADDRESS
);
MAPLE_CONTRACT_ADDRESS.set(
  ARBITRUM_ONE.NETWORK_STRING,
  ARBITRUM_ONE.MAPLE_CONTRACT_ADDRESS
);