import Link from "next/link"
import { TreePine, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { CopyCommand, CodeBlock } from "@/components/code-block"
import { FileExplorerPreview } from "./preview"

export const metadata = {
  title: "FileExplorer - TreeCN",
  description:
    "Pre-styled file/folder tree with automatic file-type icons, search/filter, and scroll area.",
}

const usageCode = `import { FileExplorer, type FileNode } from "@/components/ui/file-explorer"

const data: FileNode[] = [
  {
    id: "src",
    name: "src",
    type: "folder",
    children: [
      { id: "index.ts", name: "index.ts", type: "file" },
      { id: "utils.ts", name: "utils.ts", type: "file" },
    ],
  },
  { id: "package.json", name: "package.json", type: "file" },
]

export function MyFileTree() {
  return (
    <FileExplorer
      data={data}
      showSearch
      defaultExpanded={["src"]}
      selectionMode="single"
    />
  )
}`

const dataStructureCode = `interface FileNode {
  /** Unique identifier. */
  id: string
  /** Display name (e.g., "index.ts"). */
  name: string
  /** Whether this is a file or folder. */
  type: "file" | "folder"
  /** Child nodes (only for folders). */
  children?: FileNode[]
  /** Custom icon override. */
  icon?: React.ReactNode
}`

const fileExplorerProps = [
  {
    name: "data",
    type: "FileNode[]",
    default: "—",
    description: "The file tree data to render (required).",
  },
  {
    name: "showSearch",
    type: "boolean",
    default: "false",
    description: "Whether to show the search input.",
  },
  {
    name: "searchPlaceholder",
    type: "string",
    default: '"Search files..."',
    description: "Placeholder for the search input.",
  },
  {
    name: "maxHeight",
    type: "string",
    default: '"400px"',
    description: "Max height for the scroll area.",
  },
  {
    name: "onFileSelect",
    type: "(node: FileNode) => void",
    default: "—",
    description: "Called when a file node is clicked.",
  },
  {
    name: "wrapperClassName",
    type: "string",
    default: "—",
    description: "Additional class names for the outer wrapper.",
  },
]

const supportedExtensions = [
  { ext: ".ts, .tsx", icon: "FileCode", color: "Blue" },
  { ext: ".js, .jsx", icon: "FileCode", color: "Yellow" },
  { ext: ".json", icon: "FileJson", color: "Yellow" },
  { ext: ".md, .mdx, .txt", icon: "FileText", color: "Gray" },
  { ext: ".png, .jpg, .gif, .webp", icon: "FileImage", color: "Green" },
  { ext: ".svg", icon: "FileImage", color: "Orange" },
  { ext: "Other", icon: "File", color: "Muted" },
]

function PropsTable({
  props,
}: {
  props: { name: string; type: string; default: string; description: string }[]
}) {
  return (
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
  )
}

export default function FileExplorerDocsPage() {
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

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
        <div className="space-y-12">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold">FileExplorer</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              A pre-styled file/folder tree with automatic file-type icons,
              color-coded extensions, built-in search/filter, and scroll area.
            </p>
          </div>

          {/* Preview */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Preview</h2>
            <div className="flex justify-center rounded-xl border bg-card p-8">
              <FileExplorerPreview />
            </div>
          </div>

          {/* Installation */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Installation</h2>
            <CopyCommand command="npx shadcn@latest add https://treecn.vercel.app/r/file-explorer.json" />
            <p className="text-sm text-muted-foreground">
              This will also install the{" "}
              <Link
                href="/docs/tree-view"
                className="text-foreground underline"
              >
                tree-view
              </Link>{" "}
              dependency automatically.
            </p>
          </div>

          {/* Usage */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Usage</h2>
            <CodeBlock code={usageCode} language="tsx" />
          </div>

          {/* Data Structure */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Data Structure</h2>
            <p className="text-sm text-muted-foreground">
              Each node in the tree is represented by a{" "}
              <code className="font-mono text-foreground">FileNode</code>{" "}
              object.
            </p>
            <CodeBlock code={dataStructureCode} language="tsx" />
          </div>

          {/* Supported File Icons */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">File Icons</h2>
            <p className="text-sm text-muted-foreground">
              Icons and colors are automatically assigned based on file
              extension.
            </p>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2 text-left font-medium">
                      Extension
                    </th>
                    <th className="px-4 py-2 text-left font-medium">Icon</th>
                    <th className="px-4 py-2 text-left font-medium">Color</th>
                  </tr>
                </thead>
                <tbody>
                  {supportedExtensions.map((e) => (
                    <tr key={e.ext} className="border-b last:border-0">
                      <td className="px-4 py-2 font-mono text-xs">{e.ext}</td>
                      <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                        {e.icon}
                      </td>
                      <td className="px-4 py-2 text-muted-foreground">
                        {e.color}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Props */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">API Reference</h2>
            <div className="space-y-3">
              <h3 className="font-semibold">FileExplorer</h3>
              <p className="text-sm text-muted-foreground">
                Also accepts all{" "}
                <Link
                  href="/docs/tree-view"
                  className="text-foreground underline"
                >
                  TreeView
                </Link>{" "}
                props (selectionMode, indicator, size, etc.).
              </p>
              <PropsTable props={fileExplorerProps} />
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
              href="/docs/tree-view"
              className="hover:text-foreground transition-colors"
            >
              &larr; TreeView
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
