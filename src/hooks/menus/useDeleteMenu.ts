import { useMutation } from "react-query"
import { axiosInstance } from "../../utils/axios"
import { toast } from "react-hot-toast";

type DeleteMenuProps = {
    onSuccess: (data: string) => void;
}

export const useDeleteMenu = ({ onSuccess }: DeleteMenuProps) => {
    return useMutation({
        mutationFn: async (id) => {
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            };

            const response = await axiosInstance.delete(`/menus/${id}`, config);

            return response?.data?.message;
        },
        onSuccess,
        onError: () => {
            toast.error("Delete Menu Failed");
        }
    })
}