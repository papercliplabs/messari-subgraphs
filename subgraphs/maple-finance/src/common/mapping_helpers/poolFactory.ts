import { Address, BigInt, log } from "@graphprotocol/graph-ts";
import { _PoolFactory } from "../../../generated/schema";

import { ZERO_BI } from "../constants";

/**
 * Get the pool factory at poolFactoryAddress, or create it if it doesn't exist
 * @param poolFactoryAddress address of the pool factory
 * @param creationBlockTimestamp timestamp this was created, only needed on creation
 * @param creationBlockNumber block this was created, only needed on creation
 * @returns pool factory
 */
export function getOrCreatePoolFactory(
    poolFactoryAddress: Address,
    creationBlockTimestamp: BigInt = ZERO_BI,
    creationBlockNumber: BigInt = ZERO_BI
): _PoolFactory {
    let poolFactory = _PoolFactory.load(poolFactoryAddress.toHexString());

    if (!poolFactory) {
        poolFactory = new _PoolFactory(poolFactoryAddress.toHexString());

        poolFactory.creationTimestamp = creationBlockTimestamp;
        poolFactory.creationTimestamp = creationBlockNumber;

        poolFactory.save();

        if (ZERO_BI == creationBlockNumber || ZERO_BI == creationBlockTimestamp) {
            log.error(
                "Created pool factory with invalid params: creationBlockNumber ({}) or creationBlockTimestamp ({})",
                [creationBlockNumber.toString(), creationBlockTimestamp.toString()]
            );
        }
    }

    return poolFactory;
}