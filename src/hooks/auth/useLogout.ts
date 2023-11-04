import { useMutation } from "react-query";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async () => {
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            };
            const response = await axiosInstance.post(`/auth/logout`, null, config);

            return response?.data?.message;
        },
        onSuccess: (data) => {
            localStorage.removeItem("token");
            toast.success(data);
            navigate("/login");
        },
        onError: () => {
            toast.error("Logout Error");
        }
    })
}