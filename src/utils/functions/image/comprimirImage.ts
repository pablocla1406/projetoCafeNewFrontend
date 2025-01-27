// Função para comprimir a imagem
export const compressImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                const MAX_SIZE = 800;
                if (width > height && width > MAX_SIZE) {
                    height = Math.round((height * MAX_SIZE) / width);
                    width = MAX_SIZE;
                } else if (height > MAX_SIZE) {
                    width = Math.round((width * MAX_SIZE) / height);
                    height = MAX_SIZE;
                }

                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Failed to get canvas context'));
                    return;
                }
                
                ctx.drawImage(img, 0, 0, width, height);
                
                // Comprimir com qualidade 0.7 (70%)
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
                resolve(compressedDataUrl);
            };
            img.onerror = () => {
                reject(new Error('Failed to load image'));
            };
            img.src = event.target?.result as string;
        };
        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };
        reader.readAsDataURL(file);
    });
};