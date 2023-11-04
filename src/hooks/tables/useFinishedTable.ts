import { useMutation } from "react-query"
import { axiosInstance } from "../../utils/axios"
import { toast } from "react-hot-toast";

type FinishedTableProps = {
    onSuccess: (data: string) => void;
}

export const useFinishedTable = ({ onSuccess }: FinishedTableProps) => {
    return useMutation({
        mutationFn: async (id) => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            };
            const response = await axiosInstance.put(`/tables/${id}`, { status: 1 }, config );

            return response.data.message;
        },
        onSuccess,
        onError: () => {
            toast.error("Error completing tables");
        }
    })
}