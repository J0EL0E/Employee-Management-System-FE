import React, {useState, useEffect, useRef, useContext} from 'react'
import Table from './Table'
import api, { baseUrl } from "../api/api.config"
import SearchBar from './SearchBar';
import { EmployeeContext } from '../context/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import Pagination from './pagination';

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { 
    updateCurrentEmployeeList,  
    currentLimit, 
    currentPage, 
    updateCurrentTotalPage
  } = useContext(EmployeeContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () =>{
      //should only run if the search key doesn't have value
        const response = await api.get(`${baseUrl}/api/v1/employee?page=${currentPage}&limit=${currentLimit}`)
        const responseData = response.data;
        const {employees} = responseData
        updateCurrentEmployeeList(employees.employees);
        updateCurrentTotalPage(employees.totalPages);
    })()
  }, [currentPage, currentLimit])



  return (
    <div className='w-full h-full bg-white flex flex-col'>
        <h1 className='mt-10 ml-10 items-start text-sm w-[30%] border-b-2 border-black pb-5'>
            <span className='text-gray-700'>Employee:</span>
            <span className='text-blue-600'>Records</span>
        </h1>
        <div className='w-[90%] ml-[5%] flex justify-end mt-5'>
            <button type='button' onClick={() => {
              navigate("/employee/create")
            }} className='bg-blue-500 m-3' >
                ADD NEW EMPLOYEE
            </button>
        </div>
        { isLoading ? <p>Loading...</p> : 
          <div className='w-full table-container'>
            <div className='w-[90%] ml-[5%] flex justify-between'>
              <Pagination />
              <SearchBar setIsLoading={setIsLoading} />
            </div>
            <Table/>
          </div>
        }
    </div>
  )
}

export default Homepage