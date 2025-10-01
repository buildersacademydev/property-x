import { db } from "@/db/drizzle"
import { stakeApt } from "@/db/schema"
import { TStakePayload, TUnstakeApt } from "@/services/type"
import { eq } from "drizzle-orm"
import { convertAmount } from "@/lib/utils"

export async function applyStakeEvent(event: TStakePayload) {
  const {
    "stacking-contract": contract,
    amount: amount,
    staker: staker,
    "block-time": blockTime,
  } = event
  const [existing] = await db
    .select({
      amount: stakeApt.amount,
      blockTime: stakeApt.blockTime,
    })
    .from(stakeApt)
    .where(eq(stakeApt.contract, contract))
    .limit(1)

  if (!existing) {
    await db.insert(stakeApt).values({
      contract,
      staker,
      amount: convertAmount(amount, "from-u6"),
      blockTime: blockTime ?? null,
    })

    return {
      contract,
      status: "created",
      previousAmount: 0,
      newAmount: amount,
    }
  }

  const updatedAmount = existing.amount + convertAmount(amount, "from-u6")

  await db
    .update(stakeApt)
    .set({
      staker,
      amount: updatedAmount,
      blockTime: blockTime ?? existing.blockTime ?? null,
    })
    .where(eq(stakeApt.contract, contract))

  return {
    contract,
    status: "updated",
    previousAmount: existing.amount,
    newAmount: updatedAmount,
  }
}

export async function applyUnstakeEvent(event: TUnstakeApt) {
  const { contract, amount } = event
  const [existing] = await db
    .select({
      amount: stakeApt.amount,
    })
    .from(stakeApt)
    .where(eq(stakeApt.contract, contract))
    .limit(1)

  if (!existing) {
    throw new Error(`No staking record found for contract ${contract}`)
  }

  const remainingAmount = existing.amount - amount
  const truncated = remainingAmount < 0
  const safeAmount = truncated ? 0 : remainingAmount
  const shouldRemove = safeAmount === 0

  if (shouldRemove) {
    await db.delete(stakeApt).where(eq(stakeApt.contract, contract))
  } else {
    await db
      .update(stakeApt)
      .set({ amount: safeAmount })
      .where(eq(stakeApt.contract, contract))
  }

  return {
    contract,
    previousAmount: existing.amount,
    amountRemoved: amount,
    remainingAmount: safeAmount,
    truncated,
    removedRecord: shouldRemove,
  }
}
