import IBebida from "@/utils/interfaces/IBebida";
import { useState } from "react";

export default function TablePessoas(){
    const [bebidas, setBebidas] = useState<IBebida[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    function getBebidas(){
        
    }



}