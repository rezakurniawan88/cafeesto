function TableSkeleton({ col }: { col: number }) {
    return (
        <tbody className="animate-pulse">
            <tr className="bg-white border-b">
                {Array(col).fill(null).map((_, index) => (
                    <td key={index} className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded"></div>
                    </td>
                ))}
            </tr>
        </tbody>
    )
}

export default TableSkeleton