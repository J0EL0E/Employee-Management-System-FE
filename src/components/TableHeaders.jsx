import React from 'react'

const TableHeaders = () => {
  return (
    <thead className='w-[90%] h-[50px] text-gray-500 border-2 border-gray-500'>
        <tr className='w-full border-2 border-gray-500'>
            <td className='bo'>PHOTO</td>
            <td className='bor'>NAME</td>
            <td className='bor'>USERNAME</td>
            <td className='bor'>COUNTRY</td>
            <td className='bor'>EMAIL</td>
            <td className='bor'>ACCOUNT TYPE</td>
            <td className='bor'>ACTION</td>
        </tr>
    </thead>
  )
}

export default TableHeaders