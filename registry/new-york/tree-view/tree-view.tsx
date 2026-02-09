"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

// =============================================================================
// Types
// =============================================================================

type SelectionMode = "single" | "multiple" | "none"

// =============================================================================
// Contexts
// =============================================================================

interface TreeViewContextValue {
  expandedKeys: Set<string>
  selectedKeys: Set<string>
  selectionMode: SelectionMode
  indicator: boolean
  toggleExpand: (key: string) => void
  selectItem: (key: string) => void
  treeRef: React.RefObject<HTMLDivElement | null>
}

const TreeViewContext = React.createContext<TreeViewContextValue | null>(null)

/**
 * Hook to access the tree view context.
 * Must be used within a `<TreeView>` component.
 */
function useTreeView() {
  const context = React.useContext(TreeViewContext)
  if (!context) {
    throw new Error("useTreeView must be used within a <TreeView>")
  }
  return context
}

const DepthContext = React.createContext(0)

interface TreeItemContextValue {
  value: string
  isExpanded: boolean
  isSelected: boolean
  isBranch: boolean
  depth: number
}

const TreeItemContext = React.createContext<TreeItemContextValue | null>(null)

/**
 * Hook to access the current tree item's context.
 * Must be used within a `<TreeItem>` component.
 */
function useTreeItem() {
  const context = React.useContext(TreeItemContext)
  if (!context) {
    throw new Error("useTreeItem must be used within a <TreeItem>")
  }
  return context
}

// =============================================================================
// TreeView
// =============================================================================

const treeViewVariants = cva("flex flex-col", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

/** Props for the `TreeView` root component. */
interface TreeViewProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof treeViewVariants> {
  /** Values of currently expanded items (controlled). */
  expanded?: string[]
  /** Items to expand on initial render (uncontrolled). */
  defaultExpanded?: string[]
  /** Callback fired when expanded state changes. */
  onExpandedChange?: (expanded: string[]) => void
  /** Values of currently selected items (controlled). */
  selected?: string[]
  /** Items to select on initial render (uncontrolled). */
  defaultSelected?: string[]
  /** Callback fired when selected state changes. */
  onSelectedChange?: (selected: string[]) => void
  /** How items can be selected: "single", "multiple", or "none". */
  selectionMode?: SelectionMode
  /** Whether to show tree indent guide lines. */
  indicator?: boolean
}

const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      className,
      size,
      expanded: expandedProp,
      defaultExpanded = [],
      onExpandedChange,
      selected: selectedProp,
      defaultSelected = [],
      onSelectedChange,
      selectionMode = "single",
      indicator = true,
      children,
      ...props
    },
    ref
  ) => {
    const treeRef = React.useRef<HTMLDivElement>(null)

    // Expanded state
    const [expandedInternal, setExpandedInternal] = React.useState(
      () => new Set(defaultExpanded)
    )
    const expandedKeys = expandedProp
      ? new Set(expandedProp)
      : expandedInternal

    // Selected state
    const [selectedInternal, setSelectedInternal] = React.useState(
      () => new Set(defaultSelected)
    )
    const selectedKeys = selectedProp
      ? new Set(selectedProp)
      : selectedInternal

    const toggleExpand = React.useCallback(
      (key: string) => {
        const next = new Set(expandedKeys)
        if (next.has(key)) {
          next.delete(key)
        } else {
          next.add(key)
        }
        if (!expandedProp) setExpandedInternal(next)
        onExpandedChange?.(Array.from(next))
      },
      [expandedKeys, expandedProp, onExpandedChange]
    )

    const selectItem = React.useCallback(
      (key: string) => {
        if (selectionMode === "none") return

        let next: Set<string>
        if (selectionMode === "multiple") {
          next = new Set(selectedKeys)
          if (next.has(key)) {
            next.delete(key)
          } else {
            next.add(key)
          }
        } else {
          next = new Set(selectedKeys.has(key) ? [] : [key])
        }
        if (!selectedProp) setSelectedInternal(next)
        onSelectedChange?.(Array.from(next))
      },
      [selectedKeys, selectedProp, selectionMode, onSelectedChange]
    )

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const tree = treeRef.current
        if (!tree) return

        const items = Array.from(
          tree.querySelectorAll<HTMLElement>("[data-tree-item-row]")
        )
        const focused = document.activeElement as HTMLElement
        const idx = items.indexOf(focused)
        if (idx === -1) return

        let nextIdx: number | null = null

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault()
            nextIdx = Math.min(idx + 1, items.length - 1)
            break
          case "ArrowUp":
            e.preventDefault()
            nextIdx = Math.max(idx - 1, 0)
            break
          case "Home":
            e.preventDefault()
            nextIdx = 0
            break
          case "End":
            e.preventDefault()
            nextIdx = items.length - 1
            break
        }

        if (nextIdx !== null && nextIdx !== idx) {
          items[nextIdx].focus()
        }
      },
      []
    )

    const contextValue = React.useMemo(
      () => ({
        expandedKeys,
        selectedKeys,
        selectionMode,
        indicator,
        toggleExpand,
        selectItem,
        treeRef,
      }),
      [
        expandedKeys,
        selectedKeys,
        selectionMode,
        indicator,
        toggleExpand,
        selectItem,
      ]
    )

    // Merge refs
    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        ;(treeRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node
        if (typeof ref === "function") ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      },
      [ref]
    )

    return (
      <TreeViewContext.Provider value={contextValue}>
        <div
          ref={mergedRef}
          role="tree"
          aria-multiselectable={selectionMode === "multiple" || undefined}
          className={cn(treeViewVariants({ size }), className)}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </TreeViewContext.Provider>
    )
  }
)
TreeView.displayName = "TreeView"

// =============================================================================
// TreeItem
// =============================================================================

/** A static marker so TreeItem children can be identified. */
const TREE_ITEM_MARKER = Symbol.for("treecn.TreeItem")

/** Props for the `TreeItem` component. */
interface TreeItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Unique identifier for this item within the tree. */
  value: string
}

const TreeItem = React.forwardRef<HTMLLIElement, TreeItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { expandedKeys, selectedKeys, toggleExpand, selectItem, indicator } =
      useTreeView()
    const depth = React.useContext(DepthContext)

    // Separate nested TreeItem children from content children
    const childItems: React.ReactNode[] = []
    const contentChildren: React.ReactNode[] = []

    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement(child) &&
        (child.type as any)?.[TREE_ITEM_MARKER]
      ) {
        childItems.push(child)
      } else {
        contentChildren.push(child)
      }
    })

    const isBranch = childItems.length > 0
    const isExpanded = expandedKeys.has(value)
    const isSelected = selectedKeys.has(value)

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (isBranch) toggleExpand(value)
      selectItem(value)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault()
          e.stopPropagation()
          selectItem(value)
          if (isBranch) toggleExpand(value)
          break
        case " ":
          e.preventDefault()
          e.stopPropagation()
          selectItem(value)
          break
        case "ArrowRight":
          if (isBranch && !isExpanded) {
            e.preventDefault()
            e.stopPropagation()
            toggleExpand(value)
          }
          break
        case "ArrowLeft":
          if (isBranch && isExpanded) {
            e.preventDefault()
            e.stopPropagation()
            toggleExpand(value)
          }
          break
      }
    }

    const itemContextValue = React.useMemo(
      () => ({ value, isExpanded, isSelected, isBranch, depth }),
      [value, isExpanded, isSelected, isBranch, depth]
    )

    return (
      <TreeItemContext.Provider value={itemContextValue}>
        <li
          ref={ref}
          role="treeitem"
          aria-expanded={isBranch ? isExpanded : undefined}
          aria-selected={isSelected}
          data-value={value}
          className={cn("list-none", className)}
          {...props}
        >
          {/* The clickable row */}
          <div
            data-tree-item-row=""
            tabIndex={0}
            className={cn(
              "group/item flex items-center gap-1 rounded-md py-1 pr-2 cursor-pointer select-none",
              "outline-none transition-colors",
              "hover:bg-accent/50",
              "focus-visible:bg-accent/50 focus-visible:ring-1 focus-visible:ring-ring",
              isSelected &&
                "bg-accent text-accent-foreground"
            )}
            style={{ paddingLeft: `${depth * 12 + 4}px` }}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          >
            {/* Expand chevron */}
            <span
              className={cn(
                "flex shrink-0 items-center justify-center size-5 rounded-sm",
                "hover:bg-accent",
                !isBranch && "invisible"
              )}
            >
              <ChevronRight
                className={cn(
                  "size-4 text-muted-foreground transition-transform duration-200",
                  isExpanded && "rotate-90"
                )}
              />
            </span>

            {/* Content: TreeItemLabel, TreeItemActions, etc. */}
            {contentChildren}
          </div>

          {/* Nested children */}
          {isBranch && isExpanded && (
            <DepthContext.Provider value={depth + 1}>
              <ul role="group" className="relative flex flex-col">
                {indicator && (
                  <div
                    className="absolute top-0 bottom-0 w-px bg-border"
                    style={{ left: `${(depth + 1) * 12 + 14}px` }}
                  />
                )}
                {childItems}
              </ul>
            </DepthContext.Provider>
          )}
        </li>
      </TreeItemContext.Provider>
    )
  }
)
TreeItem.displayName = "TreeItem"
;(TreeItem as any)[TREE_ITEM_MARKER] = true

// =============================================================================
// TreeItemLabel
// =============================================================================

/** Props for the `TreeItemLabel` component. */
interface TreeItemLabelProps extends React.HTMLAttributes<HTMLSpanElement> {}

const TreeItemLabel = React.forwardRef<HTMLSpanElement, TreeItemLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "flex items-center gap-2 truncate flex-1 min-w-0",
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)
TreeItemLabel.displayName = "TreeItemLabel"

// =============================================================================
// TreeItemActions
// =============================================================================

/** Props for the `TreeItemActions` component. */
interface TreeItemActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

const TreeItemActions = React.forwardRef<HTMLDivElement, TreeItemActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "ml-auto flex shrink-0 items-center gap-0.5",
          "opacity-0 group-hover/item:opacity-100 group-focus-visible/item:opacity-100",
          "transition-opacity",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TreeItemActions.displayName = "TreeItemActions"

// =============================================================================
// Exports
// =============================================================================

export {
  TreeView,
  TreeItem,
  TreeItemLabel,
  TreeItemActions,
  useTreeView,
  useTreeItem,
  treeViewVariants,
}

export type {
  TreeViewProps,
  TreeItemProps,
  TreeItemLabelProps,
  TreeItemActionsProps,
  SelectionMode,
}
