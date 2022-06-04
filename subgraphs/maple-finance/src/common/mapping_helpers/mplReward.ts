import { Address, BigInt, BigDecimal, ethereum, log } from "@graphprotocol/graph-ts";
import { Market, _MplReward } from "../../../generated/schema";

import { MPL_REWARDS_DEFAULT_DURATION_TIME_S, SEC_PER_DAY, ZERO_ADDRESS, ZERO_BD, ZERO_BI } from "../constants";
import { getTokenPriceInUSD } from "../prices/prices";
import { parseUnits } from "../utils";
import { getOrCreateMarket } from "./market";
import { getOrCreateStakeLocker } from "./stakeLocker";
import { getOrCreateRewardToken, getOrCreateToken } from "./token";

/**
 * Get the mpl rewards at mplRewardAddress, or create it if it doesn't exist
 * On creation this will also connect it to the market and add a new rewards token (if applicable)
 * Only mplRewardAddress is required for get, everything should be set for create
 */
export function getOrCreateMplReward(
    mplRewardAddress: Address,
    stakeTokenAddress: Address = ZERO_ADDRESS,
    rewardTokenAddress: Address = ZERO_ADDRESS,
    creationBlock: BigInt = ZERO_BI
): _MplReward {
    let mplReward = _MplReward.load(mplRewardAddress.toHexString());

    if (!mplReward) {
        mplReward = new _MplReward(mplRewardAddress.toHexString());

        const rewardToken = getOrCreateRewardToken(rewardTokenAddress);
        const stakeToken = getOrCreateToken(stakeTokenAddress);

        // Explicity load market, we need to see if it exists
        let market = Market.load(stakeTokenAddress.toHexString());

        if (market) {
            // MPL-LP
            market._mplRewardMplLp = mplReward.id;
        } else {
            // MPL-STAKE
            const stakeLocker = getOrCreateStakeLocker(stakeTokenAddress);
            market = getOrCreateMarket(Address.fromString(stakeLocker.market));
            market._mplRewardMplStake = mplReward.id;
        }

        // Add reward token to market if it doesn't exist
        let newRewardTokenForMarket = true;
        for (let i = 0; i < market.rewardTokens.length; i++) {
            if (market.rewardTokens[i] == rewardToken.id) {
                newRewardTokenForMarket = false;
            }
        }

        if (newRewardTokenForMarket) {
            const newRewardTokens = market.rewardTokens;
            newRewardTokens.push(rewardToken.id);
            market.rewardTokens = newRewardTokens;
            log.warning("Added reward token: {}", [rewardToken.id]);
        } else {
            log.warning("Already have reward token: {}", [rewardToken.id]);
        }

        mplReward.market = market.id;
        mplReward.stakeToken = stakeToken.id;
        mplReward.rewardToken = rewardToken.id;
        mplReward.rewardRatePerSecond = ZERO_BI;
        mplReward.rewardDurationSec = MPL_REWARDS_DEFAULT_DURATION_TIME_S;
        mplReward.periodFinishedTimestamp = ZERO_BI;
        mplReward.rewardTokenEmissionAmountPerDay = ZERO_BI;
        mplReward.rewardTokenEmissionsUSDPerDay = ZERO_BD;
        mplReward.creationBlock = creationBlock;
        mplReward.lastUpdatedBlock = creationBlock;

        market.save();
        mplReward.save();

        if (ZERO_ADDRESS == stakeTokenAddress || ZERO_ADDRESS == rewardTokenAddress || ZERO_BI == creationBlock) {
            log.error(
                "Created mpl rewards with invalid params: stakeTokenAddress={}, rewardTokenAddress={}, creationBlock={}",
                [stakeTokenAddress.toHexString(), rewardTokenAddress.toHexString(), creationBlock.toString()]
            );
        }
    }

    return mplReward;
}

/**
 * Function which should get called on every update of the market this belongs to
 */
export function mplRewardTick(mplReward: _MplReward, event: ethereum.Event): void {
    // Update only if it hasn't been updated this block
    if (mplReward.lastUpdatedBlock != event.block.number) {
        const rewardActive = event.block.timestamp < mplReward.periodFinishedTimestamp;
        if (rewardActive) {
            mplReward.rewardTokenEmissionAmountPerDay = mplReward.rewardRatePerSecond.times(SEC_PER_DAY);
        } else {
            mplReward.rewardTokenEmissionAmountPerDay = ZERO_BI;
        }

        const rewardToken = getOrCreateToken(Address.fromString(mplReward.rewardToken)); // Actual token instead of RewardToken
        const rewardTokenPriceUSD = getTokenPriceInUSD(rewardToken, event);

        mplReward.rewardTokenEmissionsUSDPerDay = parseUnits(
            mplReward.rewardTokenEmissionAmountPerDay,
            rewardToken.decimals
        ).times(rewardTokenPriceUSD);

        mplReward.lastUpdatedBlock = event.block.number;
        mplReward.save();
    }
}