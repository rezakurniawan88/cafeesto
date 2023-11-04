import { useMutation } from "react-query"
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

type AddTableProps = {
    onSuccess: (data: string) => void;
}

export const useAddTable = ({ onSuccess }: AddTableProps) => {
    return useMutation({
        mutationFn:async () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            };

            const response = await axiosInstance.post('/tables', null, config);
            return response.data;
        },
        onSuccess,
        onError: () => {
            toast.error("Add Table Failed")
        }
    });
}