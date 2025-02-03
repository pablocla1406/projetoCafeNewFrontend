import { Card } from "@/components/ui/card"

interface ComponentParaGifsProps {
    gifOrImage: string;
    alturaELargura?: string;
}

export default function ComponentParaGifs({gifOrImage, alturaELargura}: ComponentParaGifsProps) {
    return (
        <Card className={`relative bg-[#40425e] p-4 ${alturaELargura}`}>
            <div className="flex gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
            <div className="w-full">
                <img 
                    src={gifOrImage} 
                    alt="Gif" 
                    className="w-full h-auto rounded-md"
                />
            </div>
        </Card>
    );
}