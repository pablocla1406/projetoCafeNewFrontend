import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus, Pencil, Trash2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { toast } from 'sonner';
import { Progress } from './progress';

interface Column {
  key: string;
  header: string;
  filterable?: boolean;
  render?: (value: any) => React.ReactNode;
}

interface GenericTableProps {
  data: any[] | undefined;
  columns: Column[];
  href: string;
  onDelete: (id: string) => void;
  onDeleteUndo: (id: string) => void;
  onFilter: (filters: Record<string, string>) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  cadHref: string;
}

export default function GenericTable({
  data,
  columns,
  href,
  onDelete,
  onDeleteUndo,
  onFilter,
  currentPage,
  totalPages,
  onPageChange,
  cadHref
}: GenericTableProps) {
  const [filters, setFilters] = React.useState<Record<string, string>>({});
  const currentlyTheme = localStorage.getItem('theme')

 

  function handleFilterChange(key: string, value: string) {
    const newFilters = { ...filters };
    
    if (value.trim() === '') {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    setFilters(newFilters);
    onFilter(newFilters);
  }

  return (
    <div className="w-[1090px] mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-md dark:shadow-zinc-900 p-8">
      <div className="w-full max-w-5xl mx-auto border rounded-lg p-4 space-y-4">
        <div className="items-center gap-4 mb-4">
          <DropdownMenu>
            <div className={`flex justify-end items-center space-x-2 `}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className={`${currentlyTheme === 'dark' ? 'btnDark' : 'btnLight'}`}>Filtros</Button>
              </DropdownMenuTrigger>
                <Link to={`/${cadHref}`} className="flex justify-center">
              <Button variant="outline" className={`${currentlyTheme === 'dark' ? 'btnDark' : 'btnLight'}`}>
                  <CirclePlus className="h-4 w-4 mr-1" />
                  Cadastrar
              </Button>
                </Link>
            </div>

            <DropdownMenuContent side="right" align="start" onCloseAutoFocus={(e) => e.preventDefault()}>
              <div className="p-2 flex flex-col gap-2 relative">
                <DropdownMenuItem asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="absolute right-1 top-1 h-6 w-6 hover:bg-muted-foreground hover:cursor-pointer" 
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </DropdownMenuItem>
                
                {columns.filter(column => column.filterable).map((column) => (
                  <div key={column.key} className="space-y-1">
                    <span className="text-sm text-centerfont-medium">{column.header}</span>
                    <Input
                      placeholder={`Filtrar por ${column.header}`}
                      value={filters[column.key] || ''}
                      onChange={(e) => handleFilterChange(column.key, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1"
                    />
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full max-w-7xl">
          <Table className='w-full'>
            <TableHeader>
              <TableRow>
                {columns.map(function (column) {
                  return <TableHead className='text-center text-lg whitespace-nowrap px-4' key={column.key}>{column.header}</TableHead>;
                })}
                <TableHead className='text-center whitespace-nowrap px-4'>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.length > 0 ? (
                data.map(function (row) {
                  return (
                    <TableRow key={row.id}>
                      {columns.map(function (column) {
                        return (
                          <TableCell className='text-center whitespace-nowrap px-4 text-base' key={column.key}>
                            {column.render ? column.render(row[column.key]) : row[column.key]}
                          </TableCell>
                        );
                      })}
                      <TableCell className='text-center'>
                        <div className="flex justify-center space-x-2">
                          <Link to={`/${href}/${row.id}`} className="flex items-center justify-center">
                            <Button variant="outline" className="btnBonito" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                          variant="outline"
                          className={`${currentlyTheme === 'dark' ? 'btnDark' : 'btnLight'}`} 
                          size="icon" 
                          onClick={() => {
                            onDelete(row.id);
                            
                            toast("O cadastro foi excluido com sucesso!", {

                              description: (
                                <div className="mt-2">
                                  <Progress className="w-full h-2" />
                                  <p className="mt-2">Se você deseja cancelar a exclusão, clique no botão de Desfazer.</p>
                                </div>
                              ),
                              duration: 4000,
                              action: {
                                label: 'Desfazer',
                                onClick: () => {
                                  onDeleteUndo(row.id);
                                }
                              }
                            });
                          }}>
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
                    Não há mais um item cadastrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end items-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      onPageChange(currentPage - 1);
                    }
                  }} 
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} 
                />
              </PaginationItem>
              
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(1);
                  }}
                  isActive={currentPage === 1}
                  className="cursor-pointer"
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {totalPages > 3 && currentPage > 2 && (
                <PaginationItem>
                  <PaginationEllipsis/>
                </PaginationItem>
              )}

              {currentPage !== 1 && currentPage !== totalPages && (
                <PaginationItem>
                  <PaginationLink 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(currentPage);
                    }}
                    isActive 
                    className="cursor-pointer"
                  >
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
              )}

              {totalPages > 3 && currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis/>
                </PaginationItem>
              )}

              {totalPages > 1 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(totalPages);
                    }}
                    isActive={currentPage === totalPages}
                    className="cursor-pointer"
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      onPageChange(currentPage + 1);
                    }
                  }} 
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} 
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
