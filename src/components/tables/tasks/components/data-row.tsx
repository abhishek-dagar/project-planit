import { TableCell, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataTableRowProps {
  row: any;
  team: any;
}

export function DataRow({ row, team }: DataTableRowProps) {
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      className="data-[state=selected]:bg-transparent [&_.grip-icon]:invisible [&:hover_.grip-icon]:visible h-[40px] overflow-visible border-background [&:hover_.checkbox]:block [&:hover_.serial-number]:hidden [&:hover_.maximize]:visible py-0"
    >
      {row.getVisibleCells().map((cell: any, index: number) => {
        return (
          <TableCell
            key={cell.id}
            className={`p-0 border-2 [&:has([role=checkbox])]:pl-0 
        ${
          index > 0
            ? row.getIsSelected()
              ? "bg-selected"
              : "bg-[#2a2e34] "
            : "px-0"
        } ${index === 1 ? "cursor-pointer" : ""} ${
              index === 0 ? "bg-background w-[20px]" : ""
            } ${row.getIsGrouped() ? "bg-background border-x-0" : ""}
        `}
          >
            {cell.getIsGrouped() ? (
              // If it's a grouped cell, add an expander and row count
              <>
                <Button
                  variant={"ghost"}
                  onClick={() => row.toggleExpanded()}
                  className="flex items-center hover:bg-transparent"
                  {...{
                    style: {
                      cursor: row.getCanExpand() ? "pointer" : "normal",
                    },
                  }}
                >
                  {row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())} (
                  {row.subRows.length})
                </Button>
              </>
            ) : cell.getIsAggregated() ? (
              flexRender(
                cell.column.columnDef.aggregatedCell ??
                  cell.column.columnDef.cell,
                cell.getContext()
              )
            ) : (
              flexRender(cell.column.columnDef.cell, {
                ...cell.getContext(),
                team,
              })
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
