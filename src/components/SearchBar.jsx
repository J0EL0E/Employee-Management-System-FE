import React, { useContext, useState } from 'react'
import ThemedInput from './ThemedInput'
import ThemedButton from './ThemedButton'
import api, { baseUrl } from '../api/api.config'
import { EmployeeContext } from '../context/EmployeeContext'

const SearchBar = ({ setIsLoading }) => {
  const [searchKey, setSearchKey] = useState("");
  const {updateCurrentEmployeeList, currentLimit, currentPage} = useContext(EmployeeContext)

  const searchEmployeeByName = async (e) => {
    try{
        e.preventDefault();
        setIsLoading(true)
        
        const response = await api.get(`${baseUrl}/api/v1/employee/search?page=${currentPage}
            &limit=${currentLimit}&searchKey=${searchKey}`);
        const responseData = response.data;
        console.log(responseData)
        const {employees} = responseData;
        
        setIsLoading(false)
        updateCurrentEmployeeList(employees)

    } catch(err){
        setIsLoading(false)
        alert("Unable to retrive the employee data: ", err);
    }
  }

  const catchSearchKey = (e) => {
    const {value} = e.target;
    setSearchKey(value);
  }

  return (
    <form className='flex justify-end w-[90%] h-[10%] pt-5 px-3 ml-[5%]' onSubmit={searchEmployeeByName}>
        <input
        id="searchBar"
        value={searchKey}
        onChange={catchSearchKey}
        className="searchBar"
        type="text" 
        placeholder="Search employee's name"
        />
        <ThemedButton 
            type="submit"
            children="Search"
        />
    </form>
  )
}

export default SearchBar