"use client"

import {
  Building2,
  Coins,
  Lock,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Vault,
} from "lucide-react"
import { motion } from "motion/react"
import React from "react"
import { cn } from "@/lib/utils"
import Logo from "@/components/common/logo"

interface PropertyXWorkflowProps {
  className?: string
}

const PropertyXWorkflow = ({ className }: PropertyXWorkflowProps) => {
  return (
    <div
      className={cn(
        `relative flex w-full max-w-[700px] flex-col items-center
        justify-center`,
        className
      )}
    >
      {/* Title Badge */}
      <motion.div
        className="mb-6 flex items-center gap-2 rounded-full border
          bg-background/95 px-4 py-2 shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold">Real World Asset Flow</span>
      </motion.div>

      {/* Main Container */}
      <div className="relative flex w-full flex-col items-center">
        {/* Bottom shadow layer */}
        <div
          className="absolute -bottom-6 h-[120px] w-[70%] rounded-xl
            bg-accent/20 blur-xl"
        />

        {/* SVG Paths placed at correct position */}
        <svg
          className="absolute top-0 left-0 h-full w-full
            text-muted-foreground/30"
          viewBox="0 0 700 450"
          preserveAspectRatio="none"
        >
          <g
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            strokeDasharray="100 100"
            pathLength="100"
          >
            {/* RWA to Tokenization - horizontal */}
            <path d="M 100 80 h 150 q 10 0 10 10 v 0" />

            {/* Tokenization down to split point */}
            <path d="M 260 90 v 80 q 0 10 10 10 h 0" />

            {/* Split to Liquidity Pool (left) */}
            <path d="M 270 180 h -100 q -10 0 -10 10 v 60" />

            {/* Split to Marketplace (right) */}
            <path d="M 270 180 h 260 q 10 0 10 10 v 60" />

            {/* Pool down to Staking */}
            <path d="M 160 250 v 80" />

            {/* Marketplace down to Yield */}
            <path d="M 540 250 v 80" />

            {/* Animation For Path Starting */}
            <animate
              attributeName="stroke-dashoffset"
              from="100"
              to="0"
              dur="2s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.25,0.1,0.5,1"
              keyTimes="0; 1"
            />
          </g>

          {/* Animated Light Dots */}
          <g>
            <circle
              className="workflow-light workflow-light-1"
              cx="0"
              cy="0"
              r="8"
              fill="url(#workflow-gradient)"
            />
            <circle
              className="workflow-light workflow-light-2"
              cx="0"
              cy="0"
              r="8"
              fill="url(#workflow-gradient)"
            />
            <circle
              className="workflow-light workflow-light-3"
              cx="0"
              cy="0"
              r="8"
              fill="url(#workflow-gradient)"
            />
            <circle
              className="workflow-light workflow-light-4"
              cx="0"
              cy="0"
              r="8"
              fill="url(#workflow-gradient)"
            />
            <circle
              className="workflow-light workflow-light-5"
              cx="0"
              cy="0"
              r="8"
              fill="url(#workflow-gradient)"
            />
            <circle
              className="workflow-light workflow-light-6"
              cx="0"
              cy="0"
              r="8"
              fill="url(#workflow-gradient)"
            />
          </g>

          <defs>
            {/* Gradient for lights */}
            <radialGradient id="workflow-gradient" fx="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>

        {/* Main rectangular box */}
        <motion.div
          className="relative z-10 w-full rounded-2xl border-2 border-border
            bg-background p-8 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Flow Nodes Container */}
          <div className="relative z-10 flex flex-col gap-16">
            {/* Row 1: RWA and Tokenization */}
            <div className="flex items-center justify-between px-4">
              <FlowNode
                icon={Building2}
                title="RWA"
                subtitle="Real Estate, Energy"
                delay={0.4}
                color="primary"
              />
              <FlowNode
                icon={Coins}
                title="Tokenization"
                subtitle="On-chain Assets"
                delay={0.6}
                color="secondary"
              />
            </div>

            {/* Row 2: Liquidity Pool and Marketplace */}
            <div className="flex items-center justify-between">
              <FlowNode
                icon={Vault}
                title="Liquidity Pool"
                subtitle="Yield Vault"
                delay={0.8}
                color="primary"
              />
              <FlowNode
                icon={ShoppingCart}
                title="Marketplace"
                subtitle="Trading"
                delay={0.85}
                color="secondary"
              />
            </div>

            {/* Row 3: Staking and Yield */}
            <div className="flex items-center justify-between px-4">
              <FlowNode
                icon={Lock}
                title="Staking"
                subtitle="LP Tokens"
                delay={1.0}
                color="primary"
              />
              <FlowNode
                icon={TrendingUp}
                title="Yield"
                subtitle="Real Rewards"
                delay={1.05}
                color="accent"
              />
            </div>
          </div>
        </motion.div>

        {/* Circular PropertyX Logo with Radiating Signals */}
        <motion.div
          className="absolute -bottom-12 z-30 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {/* Radiating Signal Circles */}
          <motion.div
            className="absolute h-[100px] w-[100px] rounded-full border-2
              border-primary/20"
            animate={{
              scale: [1, 1.4, 1.4],
              opacity: [0.6, 0.2, 0],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute h-[100px] w-[100px] rounded-full border-2
              border-secondary/20"
            animate={{
              scale: [1, 1.4, 1.4],
              opacity: [0.6, 0.2, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.8,
            }}
          />
          <motion.div
            className="absolute h-[100px] w-[100px] rounded-full border-2
              border-primary/20"
            animate={{
              scale: [1, 1.4, 1.4],
              opacity: [0.6, 0.2, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1.6,
            }}
          />

          {/* Inner Pulsing Circles */}
          <motion.div
            className="absolute h-[85px] w-[85px] rounded-full border
              border-primary/30 bg-primary/10"
            animate={{
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Main Circle with Logo */}
          <div
            className="relative flex h-[70px] w-[70px] items-center
              justify-center rounded-full border-2 border-primary/50
              bg-gradient-to-br from-background via-primary/10 to-secondary/10
              shadow-2xl backdrop-blur-sm"
          >
            <div
              className="flex h-[60px] w-[60px] items-center justify-center
                rounded-full border border-border bg-background"
            >
              <Logo className="h-8 w-8" withText={false} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Flow Node Component
interface FlowNodeProps {
  icon: React.ElementType
  title: string
  subtitle: string
  delay: number
  color: "primary" | "secondary" | "accent"
}

const FlowNode: React.FC<FlowNodeProps> = ({
  icon: Icon,
  title,
  subtitle,
  delay,
  color,
}) => {
  const colorClasses = {
    primary: "border-primary/50 text-primary from-primary/20 to-primary/10",
    secondary:
      "border-secondary/50 text-secondary from-secondary/20 to-secondary/10",
    accent:
      "border-primary/50 text-primary from-primary/20 via-secondary/10 to-primary/10",
  }

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="group relative">
        {/* Glow effect */}
        <div
          className={cn(
            `absolute -inset-1 rounded-xl bg-gradient-to-r opacity-40 blur
            transition-opacity group-hover:opacity-75`,
            colorClasses[color]
          )}
        />

        {/* Node container */}
        <div
          className={cn(
            `relative flex h-16 w-16 items-center justify-center rounded-xl
            border-2 bg-background shadow-lg transition-transform
            group-hover:scale-110`,
            colorClasses[color]
          )}
        >
          <Icon className={cn("h-7 w-7", colorClasses[color].split(" ")[1])} />
        </div>
      </div>

      {/* Labels */}
      <div className="text-center">
        <p className="text-xs font-semibold">{title}</p>
        <p className="text-[10px] text-muted-foreground">{subtitle}</p>
      </div>
    </motion.div>
  )
}

export default PropertyXWorkflow
