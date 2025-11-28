import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import countries from "../lib/countries.json";
import jobs from "../lib/jobRoles.json"
import ThemedLabel from '../components/ThemedLabel';
import ThemedInput from '../components/ThemedInput';
import ThemedButton from '../components/ThemedButton';
import api, { baseUrl } from '../api/api.config';

const UpdateEmployee = () => {
  
  const {id} = useParams();
  console.log(id)
  const [formData, setFormData] = useState({
    country: "",
    accountType: "",
    userName: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    photoUrl: "",
    id: id
  });

  useEffect(() => {
    ( async () => {
      const response = await api.get(`${baseUrl}/api/v1/employee?id=${id}`);
      const responseData = response.data;
      const {employee} = responseData;
      console.log(responseData)

      setFormData({
        country: employee.country,
        accountType: employee.account_type,
        userName: employee.username,
        firstName: employee.first_name,
        lastName: employee.last_name,
        emailAddress: employee.email_address,
        phoneNumber: employee.phone,
        photoUrl: "",
        id: id
      })


    })();
  }, [id])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  
  const handleChange = (e) => {
        const {name, value}= e.target;
        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }


  const handleSubmit = async (e) => {
      try{
          e.preventDefault();
          setIsLoading(true)
          const response = await api.post(`${import.meta.env.VITE_API_HOST}/api/v1/employee/update/${id}`, formData, {withCredentials: true});
          const responseData = response.data
          console.log(responseData);
          setInterval(() => {
          setIsLoading(false)
          navigate("/")
          }, 2000);
      } catch(err) {
          setIsLoading(false)
          console.log(err)
          alert(err)
      }
  }
  console.log(formData);

  return (
       <div className='w-full h-full flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center mt-[10vh] w-[70%] md:w-[50%]  h-1/2 rounded-md bg-white py-10 px-10 shadow-md'>
        <h1 className='text-black'>Update Employee Details</h1>
        <div className='w-[90%] mt-5 flex flex-col items-start justify-start'>
            <ThemedLabel htmlFor="country" styling="w-auto text-black text-1rem mb-3" children={"Country"} />
            <div className='w-full rounded-md border-2 border-black'>
              <select 
                name="country" 
                id="country" 
                className="w-full text-black text-1rem rounded-md border-black border-solid border-2px mr-2px" 
                onChange={handleChange}
                required  
              >
                {Object.keys(countries).map((country, index) =>
                  <option key={index} className="w-full text-black text-1rem rounded-md border-black border-solid border-2px mr-2px" value={countries[country]}>{country}</option>
                 )}
              </select>
            </div>
        </div>
        <div className='w-[90%] mt-5 flex flex-col items-start' >
            <ThemedLabel htmlFor="accountType" styling="w-auto text-black text-1rem mb-3 self-start" children={"Account Type"} />
              <div className='w-full rounded-md border-2 border-black'>
                <select 
                  name="accountType" 
                  id="accountType" 
                  className="w-full text-black text-1rem rounded-md border-black border-solid border-2px mr-2px" 
                  onChange={handleChange}
                  required
                  >
                  {Object.keys(jobs["job_roles"]).map((roles, index) =>
                    <option key={index} className="w-full text-black text-1rem rounded-md border-black border-solid border-2px mr-2px"  
                      value={jobs["job_roles"][roles]}>{roles}</option>
                   )}
            </select>
            </div>
        </div>
        <div className='w-[90%] mt-5 flex flex-col items-start justify-start'>
            <ThemedLabel htmlFor="userName" styling="w-auto text-black text-1rem mb-3" children={"Username"} />
            <ThemedInput 
                id="userName" 
                type="text" 
                value={formData.userName} 
                form_name="userName" 
                placeholder={"Enter Employee's Username"}
                handlerFunc={handleChange} styling="w-full text-black text-1rem rounded-md border-black border-solid border-2px" 
                required
                />
        </div>
        <div className='w-[90%] mt-5 flex flex-col items-start' >
            <ThemedLabel htmlFor="firstName" styling="w-auto text-black text-1rem mb-3 self-start" children={"First Name"} />
            <div className='w-full flex'>
                <ThemedInput 
                 id="firstName" 
                 type="text" 
                 value={formData.firstName} 
                 form_name="firstName" handlerFunc={handleChange}
                 placeholder={"Enter Employee's First Name"}
                 styling="w-full text-black text-1rem rounded-md border-black border-solid border-2px mr-2px"
                 required
                />
            </div>
        </div>
        <div className='w-[90%] mt-5 flex flex-col items-start justify-start'>
            <ThemedLabel htmlFor="lastName" styling="w-auto text-black text-1rem mb-3" children={"Last Name"} />
            <ThemedInput 
                id="lastName" 
                type="text" 
                value={formData.lastName} 
                form_name="lastName" 
                placeholder={"Enter Employee's Last Name"}
                handlerFunc={handleChange} styling="w-full text-black text-1rem rounded-md border-black border-solid border-2px" 
                required
                />
        </div>
        <div className='w-[90%] mt-5 flex flex-col items-start' >
            <ThemedLabel htmlFor="phoneNumber" styling="w-auto text-black text-1rem mb-3 self-start" children={"Phone Number"} />
            <div className='w-full flex'>
                <ThemedInput 
                 id="phoneNumber" 
                 type="text" 
                 value={formData.phoneNumber} 
                 form_name="phoneNumber" handlerFunc={handleChange}
                 placeholder={"Enter Employee's Phone Number"}
                 styling="w-full text-black text-1rem rounded-md border-black border-solid border-2px mr-2px"
                 required
                 />
            </div>
        </div>
        <div className='w-[90%] mt-5 flex flex-col items-start justify-start'>
            <ThemedLabel htmlFor="emailAddress" styling="w-auto text-black text-1rem mb-3" children={"Email Address"} />
            <ThemedInput 
                id="emailAddress" 
                type="text" 
                value={formData.emailAddress} 
                form_name="emailAddress" 
                placeholder={"Enter Employee's Email Address"}
                handlerFunc={handleChange} styling="w-full text-black text-1rem rounded-md border-black border-solid border-2px" 
                required
                />
        </div>
        <div className='w-[90%] mt-5 mb-5 flex flex-col items-start' >
            <ThemedLabel htmlFor="photoUrl" styling="w-auto text-black text-1rem mb-3 self-start" children={"Profile Photo"} />
            <div className='w-full flex'>
                <ThemedInput 
                 id="photoUrl" 
                 type="file" 
                 value={formData.photoUrl} 
                 form_name="photoUrl" handlerFunc={handleChange}
                 styling="w-full text-black text-1rem rounded-md py-3 px-2 border-black border-solid border-2px mr-2px" />
            </div>
        </div>
            <ThemedButton type="submit" styling="w-3/4 rounded-sm px-10 py-5 mt-5" children={isLoading ? "Loading..." : "Update Employee Details"}/>
            <button 
              type='button' 
              onClick={() => {
                navigate("/");
              }}
              className='bg-red-500 rounded-md px-3 py-2 text-white mt-5'
              style={{backgroundColor: "red"}}
              >
                Cancel
              </button>
    </form>
    </div>

  )
}

export default UpdateEmployee