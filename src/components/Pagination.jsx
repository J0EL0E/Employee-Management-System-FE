import React, {useContext, useEffect} from 'react'
import { EmployeeContext } from '../context/EmployeeContext'

function Pagination() {
    const {currentPage, currentLimit, currentTotalPage, updateCurrentLimit, updateCurrentPage}= useContext(EmployeeContext)
    
    const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > currentTotalPage) page = currentTotalPage;
        updateCurrentPage(page);
    };

    return (
    <div className='flex justify-center items-center'>
        <div className='border-2 border-black text-black rounded-md w-[20%] px-3 py-2'>
            <select name="filter_by_page" className='w-full' id="filter-option" value={currentLimit} onChange={(e) => {
                const {value} = e.target
                updateCurrentLimit(value)
            }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
            </select>
        </div>

        <div className='flex justify-center items-center'>
            <button type="button" className='mx-5' onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
            <p className="text-black" >{currentPage} / {currentTotalPage}</p>
            <button type="button" className='mx-5' onClick={() => goToPage(currentPage + 1)} disabled={currentPage === currentTotalPage}>Next</button>
        </div>

    </div>
  )
}

export default Pagination