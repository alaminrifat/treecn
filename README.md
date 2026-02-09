# TreeCN

Beautiful, accessible tree view and file explorer components built with [shadcn/ui](https://ui.shadcn.com).

## Components

### TreeView

Composable tree view with expand/collapse, single & multi-select, keyboard navigation, hover actions, and indent guide lines.

```bash
npx shadcn@latest add https://treecn.vercel.app/r/tree-view.json
```

### FileExplorer

Pre-styled file/folder tree with automatic file-type icons, color-coded extensions, built-in search/filter, and scroll area.

```bash
npx shadcn@latest add https://treecn.vercel.app/r/file-explorer.json
```

## Usage

```tsx
import { TreeView, TreeItem, TreeItemLabel } from "@/components/ui/tree-view"
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
}
```

## Features

- **Composable** - TreeView, TreeItem, TreeItemLabel, TreeItemActions sub-components
- **Accessible** - ARIA tree pattern, proper roles and states
- **Keyboard navigation** - Arrow keys, Home/End, Enter/Space
- **Selection modes** - Single, multiple, or none
- **Dark mode** - Works with light and dark themes
- **TypeScript** - Full type definitions with exported prop types
- **Indent guides** - Optional tree indent indicator lines
- **Controlled & uncontrolled** - Both modes supported for expanded/selected state
- **File icons** - Automatic file-type icons and color coding (FileExplorer)
- **Search/filter** - Built-in file search (FileExplorer)

## Development

```bash
npm install
npm run dev          # Start dev server
npm run build        # Production build
npm run registry:build  # Build shadcn registry JSON
```

## License

MIT
