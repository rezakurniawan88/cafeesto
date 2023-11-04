import { useMutation } from "react-query"
import { axiosInstance } from "../../utils/axios"
import { toast } from "react-hot-toast";

type CompleteOrderProps = {
    onSuccess: (data: string) => void;
}

export const useCompleteOrder = ({ onSuccess }: CompleteOrderProps) => {
    return useMutation({
        mutationFn: async (id) => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            };
            const response = await axiosInstance.put(`/orders/${id}`, { completion_status: 1 }, config );

            return response.data.message;
        },
        onSuccess,
        onError: () => {
            toast.error("Error completing order");
        }
    })
}