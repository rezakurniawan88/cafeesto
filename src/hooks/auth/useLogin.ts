import { useMutation } from "react-query"
import { axiosInstance } from "../../utils/axios"
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance.post('/auth/login', data);

            return response;
        },
        onSuccess: (data) => {
            localStorage.setItem('token', data?.data?.access_token);
            navigate("/admin/dashboard");
            toast.success("Login successfully")
        },
        onError: () => {
            toast.error("Login Failed")
        }
    })
}