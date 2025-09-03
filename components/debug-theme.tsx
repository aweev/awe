// components/debug-theme.tsx
"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

// Temporary debug component to help diagnose theme issues
export function DebugTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading theme...</div>
  }

  return (
    <div className="fixed top-4 right-4 p-4 bg-card border rounded-lg shadow-lg z-50 space-y-2 text-sm">
      <div>Theme: {theme}</div>
      <div>Resolved: {resolvedTheme}</div>
      <div>System: {systemTheme}</div>
      <div>Body class: {document.body.className}</div>
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setTheme('light')}>Light</Button>
        <Button size="sm" onClick={() => setTheme('dark')}>Dark</Button>
        <Button size="sm" onClick={() => setTheme('system')}>System</Button>
      </div>
    </div>
  )
}

// Add this to your page temporarily to debug:
// import { DebugTheme } from "@/components/debug-theme"
// 
// export default function Page() {
//   return (
//     <div>
//       <DebugTheme />
//       {/* your existing content */}
//     </div>
//   )
// }