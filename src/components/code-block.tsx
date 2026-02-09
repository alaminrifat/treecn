"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
}

export function CodeBlock({ code, language, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("relative group", className)} {...props}>
      <pre className="overflow-x-auto rounded-lg border bg-muted/50 p-4 text-sm font-mono">
        {language && (
          <span className="absolute top-2 right-12 text-xs text-muted-foreground">
            {language}
          </span>
        )}
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className={cn(
          "absolute top-2.5 right-2.5 flex items-center justify-center size-7 rounded-md",
          "border bg-background text-muted-foreground",
          "opacity-0 group-hover:opacity-100 transition-opacity",
          "hover:text-foreground hover:bg-accent"
        )}
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  )
}

interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {}

export function InlineCode({ className, ...props }: InlineCodeProps) {
  return (
    <code
      className={cn(
        "inline-flex items-center rounded-md border bg-muted/50 px-1.5 py-0.5 text-sm font-mono",
        className
      )}
      {...props}
    />
  )
}

interface CopyCommandProps {
  command: string
  className?: string
}

export function CopyCommand({ command, className }: CopyCommandProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "flex items-center gap-3 rounded-lg border bg-muted/50 px-4 py-3 text-sm font-mono",
        "hover:bg-muted transition-colors text-left w-full",
        className
      )}
    >
      <span className="text-muted-foreground select-none">$</span>
      <span className="flex-1 truncate">{command}</span>
      {copied ? (
        <Check className="size-4 shrink-0 text-green-500" />
      ) : (
        <Copy className="size-4 shrink-0 text-muted-foreground" />
      )}
    </button>
  )
}
