import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accessibility,
  Code2,
  FolderTree,
  Github,
  Keyboard,
  Moon,
  Paintbrush,
  TreePine,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { CopyCommand } from "@/components/code-block"
import { HeroDemo } from "@/components/hero-demo"

const features = [
  {
    icon: FolderTree,
    title: "Composable API",
    description:
      "Build trees with TreeView, TreeItem, TreeItemLabel, and TreeItemActions. Mix and match sub-components.",
  },
  {
    icon: Keyboard,
    title: "Keyboard Navigation",
    description:
      "Full arrow key support, Home/End, Enter/Space selection. WAI-ARIA tree pattern compliant.",
  },
  {
    icon: Accessibility,
    title: "Accessible",
    description:
      "Proper ARIA roles, labels, and states. Focus management and screen reader support built in.",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description:
      "Works perfectly in light and dark themes. Uses CSS variables for consistent theming.",
  },
  {
    icon: Code2,
    title: "TypeScript",
    description:
      "Full type definitions with exported prop types. IntelliSense for every prop and variant.",
  },
  {
    icon: Paintbrush,
    title: "Customizable",
    description:
      "Built on Tailwind CSS. Override any style with className. Controlled and uncontrolled modes.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <TreePine className="size-5" />
            TreeCN
          </Link>
          <nav className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/docs/tree-view">Docs</Link>
            </Button>
            <Button variant="ghost" size="icon" className="size-8" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-4" />
              </a>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-4 py-20 md:py-28">
          <div className="flex flex-col items-center text-center gap-6">
            <Badge variant="secondary" className="px-3 py-1">
              Open Source &middot; MIT License
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Tree View Components
              <br />
              <span className="text-muted-foreground">for shadcn/ui</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Composable, accessible tree view and file explorer components.
              Keyboard navigable, dark mode ready, and fully customizable.
            </p>
            <div className="w-full max-w-lg">
              <CopyCommand command="npx shadcn@latest add https://treecn.vercel.app/r/tree-view.json" />
            </div>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/docs/tree-view">Documentation</Link>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 size-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Live Demo */}
        <section className="mx-auto max-w-5xl px-4 pb-20">
          <div className="flex justify-center">
            <div className="rounded-xl border bg-card p-6 shadow-lg">
              <HeroDemo />
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="border-t bg-muted/30 py-20">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-2 text-center text-2xl font-bold">
              Two Components, Endless Possibilities
            </h2>
            <p className="mb-12 text-center text-muted-foreground">
              Install exactly what you need. Each component works standalone.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <Link
                href="/docs/tree-view"
                className="group rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <FolderTree className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:underline">
                      TreeView
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      registry:component
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Composable tree with expand/collapse, selection, keyboard
                  navigation, actions, and indent guides. Build any hierarchical
                  UI.
                </p>
                <div className="mt-4">
                  <code className="rounded border bg-muted/50 px-2 py-1 text-xs font-mono">
                    npx shadcn@latest add &hellip;/r/tree-view.json
                  </code>
                </div>
              </Link>

              <Link
                href="/docs/file-explorer"
                className="group rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Code2 className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:underline">
                      FileExplorer
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      registry:component
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Pre-styled file/folder tree with automatic file-type icons,
                  color-coded extensions, search/filter, and scroll area.
                </p>
                <div className="mt-4">
                  <code className="rounded border bg-muted/50 px-2 py-1 text-xs font-mono">
                    npx shadcn@latest add &hellip;/r/file-explorer.json
                  </code>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-2 text-center text-2xl font-bold">
              Built for Production
            </h2>
            <p className="mb-12 text-center text-muted-foreground">
              Everything you need for production-grade tree components.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="rounded-xl border bg-card p-5">
                  <f.icon className="mb-3 size-5 text-muted-foreground" />
                  <h3 className="mb-1 font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Install CTA */}
        <section className="border-t bg-muted/30 py-20">
          <div className="mx-auto max-w-xl px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold">Get Started in Seconds</h2>
            <p className="mb-8 text-muted-foreground">
              Install TreeCN components into any shadcn/ui project with a single
              command.
            </p>
            <div className="space-y-3">
              <CopyCommand command="npx shadcn@latest add https://treecn.vercel.app/r/tree-view.json" />
              <CopyCommand command="npx shadcn@latest add https://treecn.vercel.app/r/file-explorer.json" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TreePine className="size-4" />
            TreeCN &middot; MIT License
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <Link
              href="/docs/tree-view"
              className="hover:text-foreground transition-colors"
            >
              Documentation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
