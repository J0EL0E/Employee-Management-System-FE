import { createContext, useState } from "react";

export const EmployeeContext = createContext("");

export const EmployeeContextProvider = ({ children }) => {
  const [currentEmployeeList, setCurrentEmployeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit ] = useState(10);
  const [currentTotalPage, setCurrentTotalPage] = useState(0)

  const updateCurrentEmployeeList = (employees) => {
    console.log(employees)
    setCurrentEmployeeList(employees);
  };

  const updateCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const updateCurrentLimit = (limit) => {
    setCurrentLimit(limit)
  }

  const updateCurrentTotalPage = (page) => {
    setCurrentTotalPage(page);
  };


  return (
    <EmployeeContext.Provider value={{ 
        currentEmployeeList, 
        updateCurrentEmployeeList,
        currentPage,
        updateCurrentPage,
        currentLimit,
        updateCurrentLimit,
        currentTotalPage,
        updateCurrentTotalPage
        }}>
      {children}
    </EmployeeContext.Provider>
  );
};