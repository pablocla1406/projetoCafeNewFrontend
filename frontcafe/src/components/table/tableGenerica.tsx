import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2 } from 'lucide-react';

interface Column {
  key: string;
  header: string;
  render?: (value: any) => React.ReactNode;
}

interface GenericTableProps {
  data: any[] | undefined;
  columns: Column[];
  onEdit: (id: string | number) => void;
  onDelete: (id: string | number) => void;
  onFilter: (filters: Record<string, string>) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function GenericTable({
  data,
  columns,
  onEdit,
  onDelete,
  onFilter,
  currentPage,
  totalPages,
  onPageChange,
} : GenericTableProps) {

  const [filters, setFilters] = React.useState<Record<string, string>>({});

  function handleFilterChange(key: string, value: string) {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  }

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex flex-wrap gap-4 mb-4">
        {columns.map(function(column) {
          return (
            <Input
              key={column.key}
              placeholder={`Filter by ${column.header}`}
              value={filters[column.key] || ''}
              onChange={(e) => handleFilterChange(column.key, e.target.value)}
              className="max-w-xs"
            />
          );
        })}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(function(column) {
              return <TableHead key={column.key}>{column.header}</TableHead>;
            })}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map(function(row) {
              return (
                <TableRow key={row.id}>
                  {columns.map(function(column) {
                    return (
                      <TableCell key={column.key}>
                        {column.render ? column.render(row[column.key]) : row[column.key]}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => onEdit(row.id)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => onDelete(row.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="text-center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div className="space-x-2">
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};


