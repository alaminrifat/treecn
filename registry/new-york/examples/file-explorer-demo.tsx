"use client"

import {
  FileExplorer,
  type FileNode,
} from "@/registry/new-york/tree-view/file-explorer"

const sampleData: FileNode[] = [
  {
    id: "src",
    name: "src",
    type: "folder",
    children: [
      {
        id: "app",
        name: "app",
        type: "folder",
        children: [
          { id: "page.tsx", name: "page.tsx", type: "file" },
          { id: "layout.tsx", name: "layout.tsx", type: "file" },
          { id: "globals.css", name: "globals.css", type: "file" },
          {
            id: "docs",
            name: "docs",
            type: "folder",
            children: [
              { id: "docs-page.tsx", name: "page.tsx", type: "file" },
            ],
          },
        ],
      },
      {
        id: "components",
        name: "components",
        type: "folder",
        children: [
          {
            id: "ui",
            name: "ui",
            type: "folder",
            children: [
              { id: "button.tsx", name: "button.tsx", type: "file" },
              { id: "card.tsx", name: "card.tsx", type: "file" },
              { id: "input.tsx", name: "input.tsx", type: "file" },
              { id: "badge.tsx", name: "badge.tsx", type: "file" },
            ],
          },
        ],
      },
      {
        id: "lib",
        name: "lib",
        type: "folder",
        children: [{ id: "utils.ts", name: "utils.ts", type: "file" }],
      },
    ],
  },
  {
    id: "public",
    name: "public",
    type: "folder",
    children: [
      { id: "favicon.ico", name: "favicon.ico", type: "file" },
      { id: "og-image.png", name: "og-image.png", type: "file" },
    ],
  },
  { id: "package.json", name: "package.json", type: "file" },
  { id: "tsconfig.json", name: "tsconfig.json", type: "file" },
  { id: "README.md", name: "README.md", type: "file" },
  { id: "next.config.ts", name: "next.config.ts", type: "file" },
]

export default function FileExplorerDemo() {
  return (
    <FileExplorer
      data={sampleData}
      showSearch
      defaultExpanded={["src", "app"]}
      selectionMode="single"
      className="w-72"
      wrapperClassName="w-72 rounded-md border bg-card p-2"
      maxHeight="350px"
    />
  )
}
