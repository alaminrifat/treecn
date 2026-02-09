import Link from "next/link"
import { TreePine, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { CopyCommand, CodeBlock } from "@/components/code-block"
import { TreeViewPreview } from "./preview"

export const metadata = {
  title: "TreeView - TreeCN",
  description:
    "Composable, accessible tree view component with expand/collapse, selection, keyboard navigation, and indent guides.",
}

const usageCode = `import {
  TreeView,
  TreeItem,
  TreeItemLabel,
  TreeItemActions,
} from "@/components/ui/tree-view"
import { Folder, FileCode } from "lucide-react"

export function MyTree() {
  return (
    <TreeView defaultExpanded={["src"]} selectionMode="single">
      <TreeItem value="src">
        <TreeItemLabel>
          <Folder className="size-4 text-sky-500" />
          src
        </TreeItemLabel>

        <TreeItem value="index.ts">
          <TreeItemLabel>
            <FileCode className="size-4 text-blue-500" />
            index.ts
          </TreeItemLabel>
        </TreeItem>
      </TreeItem>
    </TreeView>
  )
}`

const controlledCode = `const [expanded, setExpanded] = useState(["src"])
const [selected, setSelected] = useState<string[]>([])

<TreeView
  expanded={expanded}
  onExpandedChange={setExpanded}
  selected={selected}
  onSelectedChange={setSelected}
  selectionMode="multiple"
>
  {/* ... */}
</TreeView>`

const actionsCode = `<TreeItem value="file.ts">
  <TreeItemLabel>
    <FileCode className="size-4" />
    file.ts
  </TreeItemLabel>
  <TreeItemActions>
    <Button variant="ghost" size="icon" className="size-6">
      <Pencil className="size-3" />
    </Button>
    <Button variant="ghost" size="icon" className="size-6">
      <Trash2 className="size-3" />
    </Button>
  </TreeItemActions>
</TreeItem>`

const treeViewProps = [
  {
    name: "expanded",
    type: "string[]",
    default: "—",
    description: "Controlled expanded item values.",
  },
  {
    name: "defaultExpanded",
    type: "string[]",
    default: "[]",
    description: "Items expanded on initial render (uncontrolled).",
  },
  {
    name: "onExpandedChange",
    type: "(expanded: string[]) => void",
    default: "—",
    description: "Called when expanded state changes.",
  },
  {
    name: "selected",
    type: "string[]",
    default: "—",
    description: "Controlled selected item values.",
  },
  {
    name: "defaultSelected",
    type: "string[]",
    default: "[]",
    description: "Items selected on initial render (uncontrolled).",
  },
  {
    name: "onSelectedChange",
    type: "(selected: string[]) => void",
    default: "—",
    description: "Called when selection changes.",
  },
  {
    name: "selectionMode",
    type: '"single" | "multiple" | "none"',
    default: '"single"',
    description: "How items can be selected.",
  },
  {
    name: "indicator",
    type: "boolean",
    default: "true",
    description: "Show indent guide lines.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Text size variant.",
  },
]

const treeItemProps = [
  {
    name: "value",
    type: "string",
    default: "—",
    description: "Unique identifier for this item (required).",
  },
]

const treeItemLabelProps = [
  {
    name: "children",
    type: "ReactNode",
    default: "—",
    description: "Label content (icons, text, etc.).",
  },
]

const treeItemActionsProps = [
  {
    name: "children",
    type: "ReactNode",
    default: "—",
    description: "Action buttons shown on hover/focus.",
  },
]

function PropsTable({
  title,
  props,
}: {
  title: string
  props: { name: string; type: string; default: string; description: string }[]
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">{title}</h3>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-2 text-left font-medium">Prop</th>
              <th className="px-4 py-2 text-left font-medium">Type</th>
              <th className="px-4 py-2 text-left font-medium">Default</th>
              <th className="px-4 py-2 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((p) => (
              <tr key={p.name} className="border-b last:border-0">
                <td className="px-4 py-2 font-mono text-xs">{p.name}</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                  {p.type}
                </td>
                <td className="px-4 py-2 font-mono text-xs">{p.default}</td>
                <td className="px-4 py-2 text-muted-foreground">
                  {p.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function TreeViewDocsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <TreePine className="size-5" />
            TreeCN
          </Link>
          <nav className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/docs/tree-view">TreeView</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/docs/file-explorer">FileExplorer</Link>
            </Button>
            <Button variant="ghost" size="icon" className="size-8" asChild>
              <a
                href="https://github.com/alaminrifat/treecn"
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

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
        <div className="space-y-12">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold">TreeView</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              A composable, accessible tree view component with expand/collapse,
              single &amp; multi-select, keyboard navigation, and indent guide
              lines.
            </p>
          </div>

          {/* Preview */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Preview</h2>
            <div className="flex justify-center rounded-xl border bg-card p-8">
              <TreeViewPreview />
            </div>
          </div>

          {/* Installation */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Installation</h2>
            <CopyCommand command="npx shadcn@latest add https://treecn.vercel.app/r/tree-view.json" />
          </div>

          {/* Usage */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Usage</h2>
            <CodeBlock code={usageCode} language="tsx" />
          </div>

          {/* Controlled */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Controlled Mode</h2>
            <p className="text-sm text-muted-foreground">
              Pass <code className="font-mono text-foreground">expanded</code>{" "}
              and{" "}
              <code className="font-mono text-foreground">selected</code> props
              for full control over state.
            </p>
            <CodeBlock code={controlledCode} language="tsx" />
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Item Actions</h2>
            <p className="text-sm text-muted-foreground">
              Use <code className="font-mono text-foreground">TreeItemActions</code>{" "}
              to add hover-visible action buttons.
            </p>
            <CodeBlock code={actionsCode} language="tsx" />
          </div>

          {/* Props */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">API Reference</h2>
            <PropsTable title="TreeView" props={treeViewProps} />
            <PropsTable title="TreeItem" props={treeItemProps} />
            <PropsTable title="TreeItemLabel" props={treeItemLabelProps} />
            <PropsTable title="TreeItemActions" props={treeItemActionsProps} />
          </div>

          {/* Keyboard */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Keyboard Navigation</h2>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2 text-left font-medium">Key</th>
                    <th className="px-4 py-2 text-left font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Arrow Down", "Move focus to next visible item"],
                    ["Arrow Up", "Move focus to previous visible item"],
                    ["Arrow Right", "Expand collapsed node"],
                    ["Arrow Left", "Collapse expanded node"],
                    ["Enter", "Select item and toggle expand"],
                    ["Space", "Select item"],
                    ["Home", "Move focus to first item"],
                    ["End", "Move focus to last visible item"],
                  ].map(([key, action]) => (
                    <tr key={key} className="border-b last:border-0">
                      <td className="px-4 py-2">
                        <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs font-mono">
                          {key}
                        </kbd>
                      </td>
                      <td className="px-4 py-2 text-muted-foreground">
                        {action}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <TreePine className="size-4" />
            TreeCN
          </div>
          <div className="flex gap-4">
            <Link
              href="/docs/file-explorer"
              className="hover:text-foreground transition-colors"
            >
              FileExplorer &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
