"use client";

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
import { Skeleton } from "@/app/components/ui/skeleton";
import { useState } from "react";

export function DataTable({
  columns,
  data,
  userLoading,
  dataLoading,
  filterProps,
}) {
  const [sorting, setSorting] = useState([]);
  const { globalFilter, setGlobalFilter } = filterProps;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
  });

  return (
    <div className="rounded-md">
      <Table>
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
        <TableBody>
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
          ) : userLoading || dataLoading ? (
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
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
