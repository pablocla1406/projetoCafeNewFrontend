import api from "./api";

type ImageType = 'pessoas' | 'bebidas' 



class ImageService{
    async uploadImage(file: File, type: ImageType, id?: string){
        const formData = new FormData();
        formData.append('file', file);

        try{
            const response = await api.post<string>(`/${type}${id ? `/${id}` : ''}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }

    async deleteImage(type: ImageType, id: string, imageName?: string){
        try{
            await api.delete<string>(`/${type}/${id}/${imageName}`);
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }
}

export const imageService = new ImageService();