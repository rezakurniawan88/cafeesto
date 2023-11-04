import { useMutation } from "react-query";
import { axiosInstance } from "../../utils/axios";
import { toast } from "react-hot-toast";

type DeleteOrderProps = {
    onSuccess: (data: string) => void;
}

export const useDeleteOrder = ({ onSuccess }: DeleteOrderProps) => {
    return useMutation({
        mutationFn: async (id) => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            };

            const response = await axiosInstance.delete(`/orders/${id}`, config);

            return response.data.message;
        },
        onSuccess,
        onError: () => {
            toast.error("Delete Order Failed")
        }
    })
}