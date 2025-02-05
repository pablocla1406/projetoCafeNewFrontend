import { motion } from "framer-motion";
import useScrollVisility from "./useScrollVisility";

interface AnimatedComponentsScrollProps {
    children: React.ReactNode;
    idDiv: string;
}

export default function AnimatedComponentsScroll({children, idDiv}: AnimatedComponentsScrollProps) {
    const isVisible = useScrollVisility(idDiv);

    return (
        <motion.div
            id={idDiv}
            initial={{ y: 30, opacity: 0 }}
            animate={{ 
                y: isVisible ? 0 : 50, 
                opacity: isVisible ? 1 : 0 
            }}
            transition={{ 
                duration: 1.3,
                ease: "easeInOut"
            }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
}