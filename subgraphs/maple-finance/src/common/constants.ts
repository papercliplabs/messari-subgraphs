import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";

///////////////////
///// Versions /////
////////////////////

export const PROTOCOL_SCHEMA_VERSION = "1.2.1";
export const PROTOCOL_SUBGRAPH_VERSION = "1.1.0";
export const PROTOCOL_METHODOLOGY_VERSION = "1.0.0";

////////////////////////
///// Schema Enums /////
////////////////////////

// The network names corresponding to the Network enum in the schema.
// They also correspond to the ones in `dataSource.network()` after converting to lower case.
// See below for a complete list:
// https://thegraph.com/docs/en/hosted-service/what-is-hosted-service/#supported-networks-on-the-hosted-service
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
    export const BORROW = "BORROW";
    export const REPAY = "REPAY";
    export const LIQUIDATE = "LIQUIDATE";
}

export namespace StakeType {
    export const STAKE_LOCKER = "STAKE_LOCKER";
    export const MPL_LP_REWARDS = "MPL_LP_REWARDS";
    export const MPL_STAKE_REWARDS = "MPL_STAKE_REWARDS";
}

////////////////////////////
///// Solifidity Enums /////
////////////////////////////

export namespace PoolState {
    export const Initialized = 0;
    export const Finalized = 1;
    export const Deactivated = 2;
}

//////////////////////////////
///// Ethereum Addresses /////
//////////////////////////////

export const ZERO_ADDRESS = Address.zero();

export const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const ETH_NAME = "Ether";
export const ETH_SYMBOL = "ETH";
export const UNPROVIDED_NAME: string = "NOT_PROVIDED";

export const MAPLE_GLOBALS_ADDRESS = Address.fromString("0xC234c62c8C09687DFf0d9047e40042cd166F3600");
export const PROTOCOL_ID = MAPLE_GLOBALS_ADDRESS.toHexString();

// Oracle addresses
export const CHAIN_LINK_ORACLE_ADDRESS = Address.fromString("0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf");
export const CHAIN_LINK_USD_ADDRESS = Address.fromString("0x0000000000000000000000000000000000000348");
export const CHAIN_LINK_ORACLE_QUOTE_DECIMALS = 8;

export const YEARN_ORACLE_ADDRESS = Address.fromString("0x83d95e0D5f402511dB06817Aff3f9eA88224B030");
export const YEARN_ORACLE_QUOTE_DECIMALS = 6;

export const MAPLE_GLOBALS_ORACLE_QUOTE_DECIMALS = 8;

export const MAPLE_POOL_LIB_ADDRESS = Address.fromString("0x2c1C30fb8cC313Ef3cfd2E2bBf2da88AdD902C30");

////////////////////////
///// Type Helpers /////
////////////////////////

export const ZERO_BD = BigDecimal.zero();
export const ZERO_BI = BigInt.zero();

export const ONE_BD = BigDecimal.fromString("1");
export const ONE_BI = BigInt.fromString("1");

export const DEFAULT_DECIMALS = 18;

export const MPL_REWARDS_DEFAULT_DURATION_TIME_S = BigInt.fromString("604800"); // 7 days

export const SEC_PER_DAY = BigInt.fromString("86400");

/////////////////////////////
///// Protocol Specific /////
/////////////////////////////

export const PROTOCOL_NAME = "Maple v1";
export const PROTOCOL_SLUG = "maple-v1";
export const PROTOCOL_INITIAL_TREASURY_FEE = BigDecimal.fromString("0.5");
export const PROTOCOL_NETWORK = Network.MAINNET;
export const PROTOCOL_TYPE = ProtocolType.LENDING;
export const PROTOCOL_LENDING_TYPE = LendingType.POOLED;
export const PROTOCOL_RISK_TYPE = RiskType.ISOLATED;
export const PROTOCOL_GLOBAL_PARAMS_TREASURY_FEE_KEY = "TREASURY_FEE";
