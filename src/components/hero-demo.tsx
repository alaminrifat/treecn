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
  FolderOpen,
  FileCode,
  FileText,
  FileJson,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react"

export function HeroDemo() {
  return (
    <div className="flex gap-6 flex-col sm:flex-row">
      {/* TreeView Demo */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground px-1">
          TreeView
        </p>
        <TreeView
          defaultExpanded={["src", "app", "components"]}
          selectionMode="single"
          className="w-64 rounded-md border bg-card p-2"
        >
          <TreeItem value="src">
            <TreeItemLabel>
              <FolderOpen className="size-4 shrink-0 text-sky-500" />
              src
            </TreeItemLabel>
            <TreeItemActions>
              <Button variant="ghost" size="icon" className="size-6">
                <Plus className="size-3" />
              </Button>
            </TreeItemActions>

            <TreeItem value="app">
              <TreeItemLabel>
                <FolderOpen className="size-4 shrink-0 text-sky-500" />
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

          <TreeItem value="README.md">
            <TreeItemLabel>
              <FileText className="size-4 shrink-0 text-gray-500" />
              README.md
            </TreeItemLabel>
          </TreeItem>
        </TreeView>
      </div>

      {/* Features Showcase */}
      <div className="space-y-4 text-sm min-w-48 pt-6">
        <div className="space-y-1">
          <p className="font-medium">Try it out</p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Click items to select. Click folders to expand/collapse. Hover for
            action buttons.
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs font-mono">
              Arrow
            </kbd>
            <span className="text-xs text-muted-foreground">Navigate</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs font-mono">
              Enter
            </kbd>
            <span className="text-xs text-muted-foreground">
              Select & toggle
            </span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs font-mono">
              Space
            </kbd>
            <span className="text-xs text-muted-foreground">Select</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs font-mono">
              Home
            </kbd>
            /
            <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs font-mono">
              End
            </kbd>
            <span className="text-xs text-muted-foreground">Jump</span>
          </div>
        </div>
      </div>
    </div>
  )
}
