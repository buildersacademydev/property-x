"use client"

import { get } from "http"
import { getBlockHeight } from "@/services/query-options"
import { useQuery } from "@tanstack/react-query"
import React from "react"

const Page = () => {
  const { data, isLoading } = useQuery({
    ...getBlockHeight(),
  })
  if (isLoading) return <div>Loading...</div>

  return <div>{data ? data.server_version : "No Data"}</div>
}

export default Page
