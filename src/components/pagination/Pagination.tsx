import ReactPaginate from "react-paginate"

type TPagination = {
    pageCount: number;
    handlerChangePage: ({ selected }: { selected: number }) => void;
}

function Pagination({ pageCount, handlerChangePage }: TPagination) {
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            previousLabel="< Previous"
            pageCount={pageCount}
            onPageChange={handlerChangePage}
            pageRangeDisplayed={4}
            renderOnZeroPageCount={null}
            containerClassName={"flex py-3 mt-5"}
            pageLinkClassName={"px-3 py-2 leading-tight text-xs md:text-sm text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"}
            previousLinkClassName={"px-3 py-2 ml-0 leading-tight text-xs md:text-sm text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"}
            nextLinkClassName={"px-3 py-2 leading-tight text-xs md:text-sm text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"}
            activeLinkClassName={"active-paginate"}
        />
    )
}

export default Pagination