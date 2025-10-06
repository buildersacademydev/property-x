import { AlertCircle, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react"
import { toast } from "sonner"

type ToastOptions = {
  description?: string
  duration?: number
}

export const customToast = {
  success: (message: string, options?: ToastOptions) => {
    toast(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      icon: <CheckCircle2 className="h-5 w-5" />,
      style: {
        background: "oklch(0.594 0.0443 196.0233)",
        color: "oklch(1 0 0)",
        border: "1px solid oklch(0.594 0.0443 196.0233)",
      },
      className:
        "dark:bg-[oklch(0.594_0.0443_196.0233)] dark:text-white dark:border-[oklch(0.594_0.0443_196.0233)]",
    })
  },

  error: (message: string, options?: ToastOptions) => {
    toast(message, {
      description: options?.description,
      duration: options?.duration || 5000,
      icon: <AlertCircle className="h-5 w-5" />,
      style: {
        background: "oklch(0.35 0.18 25.33)",
        color: "oklch(0.96 0.02 95)",
        border: "1px solid oklch(0.35 0.18 25.33)",
      },
      className:
        "dark:bg-[oklch(0.35_0.18_25.33)] dark:text-[oklch(0.96_0.02_95)] dark:border-[oklch(0.35_0.18_25.33)]",
    })
  },

  warning: (message: string, options?: ToastOptions) => {
    toast(message, {
      description: options?.description,
      duration: options?.duration || 4500,
      icon: <AlertTriangle className="h-5 w-5" />,
      style: {
        background: "oklch(0.7214 0.1337 49.9802)",
        color: "oklch(0.1797 0.0043 308.1928)",
        border: "1px solid oklch(0.7214 0.1337 49.9802)",
      },
      className:
        "dark:bg-[oklch(0.7214_0.1337_49.9802)] dark:text-[oklch(0.1797_0.0043_308.1928)] dark:border-[oklch(0.7214_0.1337_49.9802)]",
    })
  },

  pending: (message: string, options?: ToastOptions) => {
    return toast(message, {
      description: options?.description,
      duration: Number.POSITIVE_INFINITY,
      icon: <Loader2 className="h-5 w-5 animate-spin" />,
      style: {
        background: "oklch(0.252 0 0)",
        color: "oklch(0.8109 0 0)",
        border: "1px solid oklch(0.252 0 0)",
      },
      className:
        "dark:bg-[oklch(0.252_0_0)] dark:text-[oklch(0.8109_0_0)] dark:border-[oklch(0.252_0_0)]",
    })
  },
}
