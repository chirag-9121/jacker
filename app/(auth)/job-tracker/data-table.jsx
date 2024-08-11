"use client";

import { Skeleton } from "@/app/components/ui/skeleton";
import { memo, useState } from "react";
import { Button } from "@/app/components/ui/button";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

export const DataTable = memo(function ({
  columns,
  data,
  userLoading,
  dataLoading,
  columnFilterProps,
  globalFilterProps,
}) {
  // Data table: Sorting, filtering and visibilty states setup
  const [sorting, setSorting] = useState([]);
  const { columnFilters, setColumnFilters } = columnFilterProps;
  const { globalFilter, setGlobalFilter } = globalFilterProps;
  const [columnVisibility, setColumnVisibility] = useState({});

  // Creating table by passing the columns, data, states and setter functions
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
    },
  });

  return (
    <>
      {/* Column visibilty dropdown button*/}
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-xs">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            onCloseAutoFocus={(e) => e.preventDefault()}
            align="end"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                    onSelect={(e) => e.preventDefault()}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        {/* Table column headers */}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        {/* Table body that contains the records */}
        <TableBody className="overflow-scroll">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="bg-white dark:bg-cardcolor"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : // When user or table data is loading, display skeleton
          userLoading || dataLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="m-1.5 flex h-12 items-center justify-between p-2"
                  >
                    <Skeleton className="h-full w-2/3" />
                    <Skeleton className="h-full w-14 rounded-lg" />
                    <Skeleton className="h-full w-20 rounded-full" />
                    <Skeleton className="h-full w-40 rounded-lg" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ) : (
            // When no data is fetched
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
});
