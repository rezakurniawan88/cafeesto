import { useMutation } from "react-query"
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

type DeleteTableProps = {
    onSuccess: (data: string) => void;
}

export const useDeleteTable = ({ onSuccess }: DeleteTableProps) => {
    return useMutation({
        mutationFn: async (id) => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            };

            const response = await axiosInstance.delete(`/tables/${id}`, config);
            return response.data.message;
        },
        onSuccess,
        onError: () => {
            toast.error("Delete Table Failed");
        }
    });
}