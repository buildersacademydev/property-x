import { request } from "@stacks/connect"

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ""
const CONTRACT_NAME = "marketplace"

export const getRequest = async ({
  args,
  postMode = true,
  functionName,
}: {
  args: any[]
  postMode?: boolean
  functionName: string
}) => {
  try {
    const response = await request("stx_callContract", {
      contract: `${CONTRACT_ADDRESS}.${CONTRACT_NAME}`,
      functionName: functionName,
      functionArgs: args,

      network: process.env.NEXT_PUBLIC_NETWORK || "devnet",
      postConditionMode: postMode ? "allow" : "deny",
    })
    return response
  } catch (error) {
    console.error("Error calling contract:", error)
    alert(
      "Error calling contract: " +
        (error instanceof Error ? error.message : "Unknown error")
    )
  }
}
