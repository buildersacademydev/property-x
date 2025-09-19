import { db } from "@/db/drizzle"
import { assets, tcoins, whiteListing } from "@/db/schema"
import { TFtBalancesResponse } from "@/services/type"
import { and, eq, inArray } from "drizzle-orm"
import { NextResponse } from "next/server"

type IncomingBalance = { balances: TFtBalancesResponse["results"] }

export async function POST(request: Request) {
  try {
    const body: IncomingBalance = await request.json()
    const balances = body.balances || []

    if (!balances.length) {
      return NextResponse.json({ items: [] }, { status: 200 })
    }

    const allContracts = balances.map((b) => b.token.split("::")[0])

    const whitelistedRows = await db
      .select({ whitelisted: whiteListing.whitelisted })
      .from(whiteListing)
      .where(
        and(
          inArray(whiteListing.whitelisted, allContracts),
          eq(whiteListing.isWhitelisted, true)
        )
      )

    const whitelistedSet = new Set(whitelistedRows.map((r) => r.whitelisted))
    if (!whitelistedSet.size) {
      return NextResponse.json({ items: [] }, { status: 200 })
    }

    const whitelistedContracts = allContracts.filter((c) =>
      whitelistedSet.has(c)
    )

    const tcoinRows = await db
      .select({
        contract: tcoins.contract,
        tcoinName: tcoins.name,
        tcoinDescription: tcoins.description,
        tcoinImage: tcoins.image,
        assetId: tcoins.assetId,
        assetIdOut: assets.id,
        assetName: assets.name,
        assetImage: assets.image,
        assetLocation: assets.location,
        assetValuation: assets.valuation,
        assetTokens: assets.tokens,
        assetApr: assets.apr,
        assetDescription: assets.description,
        assetStaking: assets.staking,
      })
      .from(tcoins)
      .leftJoin(assets, eq(tcoins.assetId, assets.id))
      .where(inArray(tcoins.contract, whitelistedContracts))

    const byContract = new Map(tcoinRows.map((r) => [r.contract, r]))

    const items = balances
      .map((b) => {
        const contract = b.token.split("::")[0]
        const tokenName = b.token.split("::")[1] || ""
        if (!whitelistedSet.has(contract)) return null
        const meta = byContract.get(contract)
        if (!meta) return null
        return {
          balance: b.balance,
          contract,
          tokenName,
          tcoin: {
            name: meta.tcoinName,
            description: meta.tcoinDescription,
            image: meta.tcoinImage,
            assetId: meta.assetId,
          },
          asset: meta.assetIdOut
            ? {
                id: meta.assetIdOut,
                name: meta.assetName,
                image: meta.assetImage,
                location: meta.assetLocation,
                valuation: meta.assetValuation,
                tokens: meta.assetTokens,
                apr: meta.assetApr,
                description: meta.assetDescription,
                staking: meta.assetStaking,
              }
            : null,
        }
      })
      .filter(Boolean)

    return NextResponse.json({ items }, { status: 200 })
  } catch (err) {
    console.error("/api/apts error:", err)
    return NextResponse.json(
      { error: "Failed to process balances" },
      { status: 500 }
    )
  }
}
