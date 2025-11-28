import React, { useContext } from 'react'
import TableHeaders from './TableHeaders'
import TableData from './TableData'
import { EmployeeContext } from '../context/EmployeeContext'

const Table = () => {

    const { currentEmployeeList } = useContext(EmployeeContext);

  return (
    <table className='w-[90%] h-full border-gray-500 border-2 rounded-md px-[5%] mx-auto mt-10 mb-[10vh]'>

        <TableHeaders />
        { currentEmployeeList ? currentEmployeeList.map(employee => 
            <TableData 
                key={employee.id} 
                id={employee.id} 
                photo_url={employee.photo_url} 
                first_name={employee.first_name} 
                last_name={employee.last_name} 
                username={employee.username} 
                country={employee.country} 
                email_address={employee.email_address} 
                account_type={employee.account_type}
            /> 
        ) : 
        <div className='w-full h-full'>
            <p>No Employee Data Found</p>
        </div>
        }
    </table>
  )
}

export default Table