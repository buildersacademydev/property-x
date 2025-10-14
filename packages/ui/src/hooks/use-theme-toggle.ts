"use client"

import { useTheme } from "next-themes"
import { useCallback, useEffect, useState } from "react"

export const useThemeToggle = () => {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        setIsDark(resolvedTheme === "dark")
    }, [resolvedTheme])

    const styleId = "theme-transition-styles"

    const updateStyles = useCallback((css: string) => {
        if (typeof window === "undefined") return

        let styleElement = document.getElementById(styleId) as HTMLStyleElement

        if (!styleElement) {
            styleElement = document.createElement("style")
            styleElement.id = styleId
            document.head.appendChild(styleElement)
        }

        styleElement.textContent = css
    }, [])

    const polygonAnimation = `
    ::view-transition-group(root) {
      animation-duration: 0.7s;
      animation-timing-function: var(--expo-out);
    }
          
    ::view-transition-new(root) {
      animation-name: reveal-light-top-left-blur;
      filter: blur(2px);
    }

    ::view-transition-old(root),
    .dark::view-transition-old(root) {
      animation: none;
      z-index: -1;
    }
    
    .dark::view-transition-new(root) {
      animation-name: reveal-dark-top-left-blur;
      filter: blur(2px);
    }

    @keyframes reveal-dark-top-left-blur {
      from {
        clip-path: polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%);
        filter: blur(8px);
      }
      50% { 
        filter: blur(4px); 
      }
      to {
        clip-path: polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%);
        filter: blur(0px);
      }
    }

    @keyframes reveal-light-top-left-blur {
      from {
        clip-path: polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%);
        filter: blur(8px);
      }
      50% { 
        filter: blur(4px); 
      }
      to {
        clip-path: polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%);
        filter: blur(0px);
      }
    }
  `

    const toggleTheme = useCallback(() => {
        setIsDark(!isDark)
        updateStyles(polygonAnimation)

        if (typeof window === "undefined") return

        const switchTheme = () => {
            setTheme(theme === "light" ? "dark" : "light")
        }

        if (!document.startViewTransition) {
            switchTheme()
            return
        }

        document.startViewTransition(switchTheme)
    }, [theme, setTheme, updateStyles, isDark, polygonAnimation])

    return {
        isDark,
        toggleTheme,
    }
}
