import { useEffect, useState } from "react";

export default function useScrollVisility(id: string) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsVisible(entry.isIntersecting);
            });
        },

        {
            root: null,
            rootMargin: '0px',
            threshold: 0.2,
        }
    );

    const element = document.getElementById(id);

    if(element) {
        observer.observe(element);
    } 

    return () => {
        if(element){
            observer.unobserve(element);
        }
        observer.disconnect();
    }
    
},[id]);

    return isVisible;
}