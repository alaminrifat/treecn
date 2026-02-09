"use client"

import {
  TreeView,
  TreeItem,
  TreeItemLabel,
  TreeItemActions,
} from "@/registry/new-york/tree-view/tree-view"
import { Button } from "@/components/ui/button"
import {
  Folder,
  FileCode,
  FileText,
  FileJson,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react"

export function TreeViewPreview() {
  return (
    <TreeView
      defaultExpanded={["src", "app", "components", "ui"]}
      selectionMode="single"
      className="w-72 rounded-md border bg-card p-2"
    >
      <TreeItem value="src">
        <TreeItemLabel>
          <Folder className="size-4 shrink-0 text-sky-500" />
          src
        </TreeItemLabel>
        <TreeItemActions>
          <Button variant="ghost" size="icon" className="size-6">
            <Plus className="size-3" />
          </Button>
        </TreeItemActions>

        <TreeItem value="app">
          <TreeItemLabel>
            <Folder className="size-4 shrink-0 text-sky-500" />
            app
          </TreeItemLabel>

          <TreeItem value="page.tsx">
            <TreeItemLabel>
              <FileCode className="size-4 shrink-0 text-blue-400" />
              page.tsx
            </TreeItemLabel>
            <TreeItemActions>
              <Button variant="ghost" size="icon" className="size-6">
                <Pencil className="size-3" />
              </Button>
              <Button variant="ghost" size="icon" className="size-6">
                <Trash2 className="size-3" />
              </Button>
            </TreeItemActions>
          </TreeItem>

          <TreeItem value="layout.tsx">
            <TreeItemLabel>
              <FileCode className="size-4 shrink-0 text-blue-400" />
              layout.tsx
            </TreeItemLabel>
          </TreeItem>

          <TreeItem value="globals.css">
            <TreeItemLabel>
              <FileCode className="size-4 shrink-0 text-purple-400" />
              globals.css
            </TreeItemLabel>
          </TreeItem>
        </TreeItem>

        <TreeItem value="components">
          <TreeItemLabel>
            <Folder className="size-4 shrink-0 text-sky-500" />
            components
          </TreeItemLabel>

          <TreeItem value="ui">
            <TreeItemLabel>
              <Folder className="size-4 shrink-0 text-sky-500" />
              ui
            </TreeItemLabel>

            <TreeItem value="button.tsx">
              <TreeItemLabel>
                <FileCode className="size-4 shrink-0 text-blue-400" />
                button.tsx
              </TreeItemLabel>
            </TreeItem>

            <TreeItem value="card.tsx">
              <TreeItemLabel>
                <FileCode className="size-4 shrink-0 text-blue-400" />
                card.tsx
              </TreeItemLabel>
            </TreeItem>
          </TreeItem>
        </TreeItem>

        <TreeItem value="lib">
          <TreeItemLabel>
            <Folder className="size-4 shrink-0 text-sky-500" />
            lib
          </TreeItemLabel>

          <TreeItem value="utils.ts">
            <TreeItemLabel>
              <FileCode className="size-4 shrink-0 text-blue-500" />
              utils.ts
            </TreeItemLabel>
          </TreeItem>
        </TreeItem>
      </TreeItem>

      <TreeItem value="package.json">
        <TreeItemLabel>
          <FileJson className="size-4 shrink-0 text-yellow-600" />
          package.json
        </TreeItemLabel>
      </TreeItem>

      <TreeItem value="tsconfig.json">
        <TreeItemLabel>
          <FileJson className="size-4 shrink-0 text-yellow-600" />
          tsconfig.json
        </TreeItemLabel>
      </TreeItem>

      <TreeItem value="README.md">
        <TreeItemLabel>
          <FileText className="size-4 shrink-0 text-gray-500" />
          README.md
        </TreeItemLabel>
      </TreeItem>
    </TreeView>
  )
}
