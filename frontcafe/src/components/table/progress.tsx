import { useEffect, useState } from "react";
import { Progress as ProgressUI } from "@/components/ui/progress"

interface ProgressProps {
    className?: string;
}

export function Progress({ className }: ProgressProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    clearInterval(timer);
                    return 100;
                }
                return Math.min(oldProgress + 2.7, 100);
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

    return <ProgressUI value={progress} className={className} />;
}