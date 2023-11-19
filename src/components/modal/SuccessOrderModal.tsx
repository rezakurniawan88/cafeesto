import { useNavigate } from "react-router-dom"
import useStore from "../../stores/store";

function SuccessOrderModal() {
    const { handleSuccessModal, successModalOpen } = useStore((state) => state);
    const navigate = useNavigate();

    const handleAcceptPopup = () => {
        navigate('/')
        handleSuccessModal();
    }

    return (
        <div className={successModalOpen ? "fixed top-0 left-0 right-0 z-50 bg-gray-400/25 backdrop-blur-lg overflow-x-hidden overflow-y-auto  h-full flex justify-center items-center" : "hidden"}>
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-2xl shadow px-10 py-5">
                    <div className="p-8 flex flex-col justify-center items-center">
                        <svg className="text-green-400" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0" /></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M8 14C8.5 15.5 9.79086 17 12 17C14.2091 17 15.5 15.5 16 14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="14;0" /></path></g><g fill="currentColor" fill-opacity="0"><ellipse cx="9" cy="9.5" rx="1" ry="1.5"><animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.2s" values="0;1" /></ellipse><ellipse cx="15" cy="9.5" rx="1" ry="1.5"><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.2s" values="0;1" /></ellipse></g></svg>
                        <h3 className="mt-4 mb-5 text-2xl font-bold text-green-400">Thank you for your order!</h3>
                        <p className="mb-8 text-sm text-center text-gray-500">Your order has been processed and wait at your table until the food is served, thank you.</p>
                        <button onClick={handleAcceptPopup} type="button" className="text-white w-full py-2.5 bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm text-center">OK</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessOrderModal