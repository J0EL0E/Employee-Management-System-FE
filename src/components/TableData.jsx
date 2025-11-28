import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { baseUrl } from '../api/api.config';
import { EmployeeContext } from '../context/EmployeeContext';


const TableData = ({
    id, 
    photo_url, 
    first_name, 
    last_name,
    username, 
    country, 
    email_address, 
    account_type, 

 }) => {
    const navigate = useNavigate();
    const {updateCurrentEmployeeList, currentEmployeeList} = useContext(EmployeeContext)

    const deleteEmployee = async (id) => {
        // should use a prompt delete
        try{
            //remove the delete entry from the rendered component
            const newEmployeeList = currentEmployeeList.filter(employee => employee.id !== id);
            console.log(newEmployeeList)
            updateCurrentEmployeeList(newEmployeeList)

            setTimeout( async () => {
                await api.delete(`${baseUrl}/api/v1/employee/delete/${id}`);
            }, 2000)
        }catch(err){
            alert("Failed to delete the employee: ", err)
        }
    }


  return (
    <tr className='w-full border-2 border-gray-500 text-gray-500'>
       <td className='border-2 border-gray-500 py-5'>
        <img src={photo_url} alt="employee-pic" className='w-[80%] h-[80%]' />
       </td>
       <td className='border-2 border-gray-500'>{`${first_name} ${last_name}`}</td>
       <td className='border-2 border-gray-500'>{username}</td>
       <td className='border-2 border-gray-500'>{country}</td>
       <td className='border-2 border-gray-500'>{email_address}</td>
       <td className='border-2 border-gray-500'>{account_type}</td>
       <td className='h-full w-full flex justify-center items-center text-[0.7rem] border-0 border-gray-500'>
        <button type="button" className='mx-2 edit-btn' 
            onClick={() => {
            navigate(`/employee/update/${id}`)
            }}>EDIT</button>
        <button type="button" className='mx-2 delete-btn'
            onClick={() => deleteEmployee(id)}
        >DELETE</button>
       </td>
    </tr>
  )
}

export default TableData