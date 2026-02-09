"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  TreeView,
  TreeItem,
  TreeItemLabel,
  useTreeItem,
  type TreeViewProps,
} from "@/registry/new-york/tree-view/tree-view"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  File,
  FileCode,
  FileImage,
  FileJson,
  FileText,
  Folder,
  FolderOpen,
  Search,
} from "lucide-react"

// =============================================================================
// Types
// =============================================================================

/** Represents a node in the file tree data. */
interface FileNode {
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
}

// =============================================================================
// Helpers
// =============================================================================

const FILE_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ts: FileCode,
  tsx: FileCode,
  js: FileCode,
  jsx: FileCode,
  json: FileJson,
  md: FileText,
  mdx: FileText,
  txt: FileText,
  png: FileImage,
  jpg: FileImage,
  jpeg: FileImage,
  gif: FileImage,
  svg: FileImage,
  webp: FileImage,
  ico: FileImage,
}

function getFileIcon(name: string): React.ComponentType<{ className?: string }> {
  const ext = name.split(".").pop()?.toLowerCase() ?? ""
  return FILE_ICON_MAP[ext] || File
}

function getIconColor(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() ?? ""
  const colorMap: Record<string, string> = {
    ts: "text-blue-500",
    tsx: "text-blue-400",
    js: "text-yellow-500",
    jsx: "text-yellow-400",
    json: "text-yellow-600",
    md: "text-gray-500",
    mdx: "text-gray-500",
    txt: "text-gray-400",
    png: "text-green-500",
    jpg: "text-green-500",
    jpeg: "text-green-500",
    gif: "text-green-500",
    svg: "text-orange-500",
  }
  return colorMap[ext] || "text-muted-foreground"
}

/** Recursively filter tree nodes by search query. */
function filterTree(nodes: FileNode[], query: string): FileNode[] {
  const q = query.toLowerCase()
  return nodes.reduce<FileNode[]>((acc, node) => {
    const nameMatch = node.name.toLowerCase().includes(q)
    const filteredChildren = node.children
      ? filterTree(node.children, query)
      : []

    if (nameMatch || filteredChildren.length > 0) {
      acc.push({
        ...node,
        children:
          filteredChildren.length > 0 ? filteredChildren : node.children,
      })
    }
    return acc
  }, [])
}

/** Collect all folder ids from tree data (for expand-all on search). */
function collectFolderIds(nodes: FileNode[]): string[] {
  const ids: string[] = []
  for (const node of nodes) {
    if (node.type === "folder") {
      ids.push(node.id)
      if (node.children) {
        ids.push(...collectFolderIds(node.children))
      }
    }
  }
  return ids
}

// =============================================================================
// FileExplorer
// =============================================================================

/** Props for the `FileExplorer` component. */
interface FileExplorerProps
  extends Omit<TreeViewProps, "children"> {
  /** The file tree data to render. */
  data: FileNode[]
  /** Whether to show the search input. */
  showSearch?: boolean
  /** Placeholder for the search input. */
  searchPlaceholder?: string
  /** Max height for the scroll area (CSS value). */
  maxHeight?: string
  /** Called when a file node is clicked. */
  onFileSelect?: (node: FileNode) => void
  /** Additional class names for the wrapper. */
  wrapperClassName?: string
}

const FileExplorer = React.forwardRef<HTMLDivElement, FileExplorerProps>(
  (
    {
      data,
      showSearch = false,
      searchPlaceholder = "Search files...",
      maxHeight = "400px",
      onFileSelect,
      wrapperClassName,
      className,
      expanded: expandedProp,
      defaultExpanded,
      onExpandedChange,
      ...treeProps
    },
    ref
  ) => {
    const [search, setSearch] = React.useState("")

    const filteredData = search ? filterTree(data, search) : data

    // When searching, expand all folders in the filtered results
    const searchExpanded = React.useMemo(
      () => (search ? collectFolderIds(filteredData) : undefined),
      [search, filteredData]
    )

    return (
      <div ref={ref} className={cn("flex flex-col gap-2", wrapperClassName)}>
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8"
            />
          </div>
        )}

        <ScrollArea style={{ maxHeight }} className="pr-3">
          <TreeView
            className={className}
            expanded={search ? searchExpanded : expandedProp}
            defaultExpanded={defaultExpanded}
            onExpandedChange={onExpandedChange}
            {...treeProps}
          >
            {filteredData.map((node) => (
              <FileTreeNode
                key={node.id}
                node={node}
                onFileSelect={onFileSelect}
              />
            ))}
          </TreeView>
        </ScrollArea>
      </div>
    )
  }
)
FileExplorer.displayName = "FileExplorer"

// =============================================================================
// FileTreeNode (internal recursive renderer)
// =============================================================================

interface FileTreeNodeProps {
  node: FileNode
  onFileSelect?: (node: FileNode) => void
}

/** Dynamic folder icon that reads expanded state from TreeItem context. */
function DynamicFolderIcon({ icon }: { icon?: React.ReactNode }) {
  const { isExpanded } = useTreeItem()
  if (icon) return <>{icon}</>
  const Icon = isExpanded ? FolderOpen : Folder
  return <Icon className="size-4 shrink-0 text-sky-500" />
}

function FileTreeNode({ node, onFileSelect }: FileTreeNodeProps) {
  const isFolder = node.type === "folder"

  if (isFolder && node.children) {
    return (
      <TreeItem value={node.id}>
        <TreeItemLabel>
          <DynamicFolderIcon icon={node.icon} />
          <span className="truncate">{node.name}</span>
        </TreeItemLabel>
        {node.children.map((child) => (
          <FileTreeNode
            key={child.id}
            node={child}
            onFileSelect={onFileSelect}
          />
        ))}
      </TreeItem>
    )
  }

  const IconComponent = getFileIcon(node.name)
  return (
    <TreeItem value={node.id}>
      <TreeItemLabel>
        {node.icon || (
          <IconComponent
            className={cn("size-4 shrink-0", getIconColor(node.name))}
          />
        )}
        <span className="truncate">{node.name}</span>
      </TreeItemLabel>
    </TreeItem>
  )
}

// =============================================================================
// Exports
// =============================================================================

export {
  FileExplorer,
  type FileExplorerProps,
  type FileNode,
  getFileIcon,
  getIconColor,
  filterTree,
  collectFolderIds,
}
