import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis } from "../ui/pagination";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationParaTabela({currentPage, totalPages, onPageChange}: PaginationProps) {

    return(
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
        
    )
}