import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus, Info, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { toast } from 'sonner';
import { Progress } from './progress';
import { useState } from "react";
import PaginationParaTabela from "./Pagination";
import { Accordion, AccordionTrigger, AccordionContent, AccordionItem } from "../ui/accordion";

interface Column {
  key: string;
  header: string;
  filterable?: boolean;
  render?: (value: any) => React.ReactNode;
  positionText?: string;
  headerSubstituta?: string;
  keySubstituta?: string;
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
  botaoAdicional?: boolean
  nomeBotaoAdicional?: string
  abrirDialogBotaoAdicional?: () => void
  NomeListagem: string
  textoAdicionalEmFiltros?: string
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
  cadHref,
  botaoAdicional = false,
  nomeBotaoAdicional,
  abrirDialogBotaoAdicional,
  NomeListagem,
  textoAdicionalEmFiltros,
}: GenericTableProps) {
  const [filters, setFilters] = useState<Record<string, string>>({});
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
    <div className="w-full mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-2xl dark:shadow-zinc-900 p-8">
      <div className="w-full mx-auto border rounded-lg p-6 space-y-6">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl font-bold text-[#4a3f35] dark:text-white dark:border-white pb-1">{NomeListagem}</h1>
            <div className="flex items-center space-x-2">
              {botaoAdicional && (
                <Button 
                  variant="outline" 
                  className={`${currentlyTheme === 'dark' ? 'btnDark' : 'btnLight'} transition-colors`} 
                  onClick={abrirDialogBotaoAdicional}
                >
                  {nomeBotaoAdicional}
                </Button>
              )}
              <Link to={`/${cadHref}`}>
                <Button variant="outline" className={`${currentlyTheme === 'dark' ? 'btnDark' : 'btnLight'} transition-colors`}>
                  <CirclePlus className="h-4 w-4 mr-2" />
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem 
              value="item-1"
              className="border dark:border-zinc-700 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="w-full bg-white hover:bg-white hover:text-[#4a3f35] dark:bg-zinc-800 dark:hover:bg-zinc-800 dark:text-white hover:cursor-pointer">
                <span>Filtros</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-4 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {columns.filter(column => column.filterable).map((column) => (
                    <div key={column.keySubstituta ? column.keySubstituta : column.key} className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {column.headerSubstituta ? column.headerSubstituta : column.header}
                      </label>
                      <Input
                        placeholder={`Filtrar`}
                        value={filters[column.keySubstituta ? column.keySubstituta : column.key] || ''}
                        onChange={(e) => handleFilterChange(column.keySubstituta ? column.keySubstituta : column.key, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full"
                      />
                    </div>
                  ))}
                  {textoAdicionalEmFiltros && (
             <div className="flex items-center p-4 m-4 bg-gray-100 rounded-lg shadow-md">
                <Info className="h-11 w-11 text-muted-foreground" />
                 <p className="ml-4 text-sm text-muted-foreground">{textoAdicionalEmFiltros}</p>
            </div>
              )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
             
        </div>
        <div className="w-full">
          <Table className='w-full'>
            <TableHeader>
              <TableRow>
                {columns.map(function (column) {
                  return <TableHead className={`${column.positionText ? column.positionText : 'text-center'} text-lg whitespace-nowrap px-4 `} key={column.key}>{column.header}</TableHead>;
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
                          <TableCell className= {` ${column.positionText ? column.positionText : 'text-center'} whitespace-nowrap px-4 text-base`} key={column.key}>
                            {column.render ? column.render(row[column.key]) : row[column.key]}
                          </TableCell>
                        );
                      })}
                      <TableCell className='text-center'>
                        <div className="flex justify-center space-x-2">
                          <Link to={`/${href}/${row.id}`} className="flex items-center justify-center hover:cursor-pointer" title='Editar'>
                            <Button variant="outline" className="btnBonito" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                          title='Excluir' 
                          variant="outline"
                          className={`${currentlyTheme === 'dark' ? 'btnDark' : 'btnLight'}`} 
                          size="icon" 
                          onClick={async () => {
                            try {
                               await Promise.resolve(onDelete(row.id));
                              toast("O cadastro foi excluido com sucesso!", {
                                description: (
                                  <div className="mt-2">
                                    <Progress className="w-full h-2 bg-white" />
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
                            } catch (error) {
                              // Error will be handled by the parent component
                              console.log("Erro na exclusão");
                            }
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
        <PaginationParaTabela currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
