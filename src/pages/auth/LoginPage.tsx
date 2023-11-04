import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";
import { IDataLogin } from "../../types/types";
import { useLogin } from "../../hooks/auth/useLogin";
import Spinner from "../../components/loading/Spinner";

function LoginPage() {
    const { handleSubmit, register, formState: { errors } } = useForm<IDataLogin>();
    const { mutate: onLogin, isLoading } = useLogin();

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h1 className="flex items-center mb-6 text-3xl font-bold text-orange-500">Cafeesto.</h1>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onLogin)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:outline-orange-400 block w-full p-2.5" placeholder="name@email.com" required {...register('email', { required: true, pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "invalid email address" } })} />
                                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:outline-orange-400 block w-full p-2.5" required {...register('password', { required: true })} />
                                {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                            </div>
                            <button type="submit" className="w-full text-white bg-orange-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-orange-600">{isLoading ? <Spinner /> : "Sign in"}</button>
                            <p className="text-sm font-light text-gray-500">
                                Don't have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:text-orange-500 hover:underline">Register</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage