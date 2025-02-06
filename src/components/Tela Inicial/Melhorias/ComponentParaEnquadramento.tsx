import { Card } from "@/components/ui/card"

interface ComponentParaGifsProps {
    children: React.ReactNode;
}

export default function ComponentParaEnquadramento({children}: ComponentParaGifsProps) {
    return (
        <Card className='flex flex-col w-1/2 justify-center bg-[#40425e] p-4 m-4'>
            <div className="flex gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="w-full">
                {children}
            </div>
        </Card>
    );
}