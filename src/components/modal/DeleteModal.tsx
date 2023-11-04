import { UseMutateFunction } from "react-query";
import useStore from "../../stores/store"

type DeleteModalProps = {
    selectedID: number | null;
    deleteFunction: UseMutateFunction<string, unknown, void, unknown>;
    loading: boolean;
}


function DeleteModal({ selectedID, deleteFunction, loading }: DeleteModalProps) {
    const { deleteModalOpen, handleDeleteModal } = useStore((state) => state);

    return (
        <div className={`${deleteModalOpen ? "fixed top-0 left-0 right-0 z-50 bg-gray-400/25 backdrop-blur-lg overflow-x-hidden overflow-y-auto  h-full flex justify-center items-center" : "hidden"}`}>
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <button onClick={handleDeleteModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center ">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                    <div className="p-6">
                        <h3 className="mb-5 text-lg font-bold">Are you sure you want to delete?</h3>
                        <p className="mb-8 text-sm text-gray-500">This action cannot be undone. This will permanently delete and remove your data from our servers.</p>
                        <div className="flex justify-end gap-2">
                            <button onClick={handleDeleteModal} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Cancel</button>
                            <button onClick={() => deleteFunction(selectedID)} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                {loading ? "Deleting ..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal