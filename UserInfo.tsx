import React, { ReactElement, useEffect, useState } from 'react';
import { newUserData , columns } from "./Table/columns.tsx"
import { DataTable } from "./Table/data-table.tsx"


const UserInfo: React.FC = (): ReactElement => {
  const [userData, setUserData] = useState<any>(null);

 
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(()=>JSON.parse(storedUserData));
    }
  }, []);

  const newuserData:newUserData={
    Firstname: userData ? userData.firstname : '',
    Lastname: userData ? userData.Lastname : '',
    Email: userData ? userData.email : '',
    Country: userData ? userData.country : '',
    Employment: userData ? userData.employment: '', 
  };
  
  return (
    <div className="bg-zinc-950 gap-2 h-dvh w-screen grid place-content-center text-white grid-flow-row">
      {userData === null ? 
        <p>Fill out the form at /form first, then come here.</p>
      
       : (
        
        <DataTable columns={columns} data={[newuserData]} />
      
        // <table className='rounded-[4px] shadow-outline-2px px-2'>
        //   <thead >
        //     <tr className='bg-[#4F4557] ' >
        //       <th className='px-0 sm:px-2 text-center border-[1px]'>Sr no</th>
        //       <th className='px-0 sm:px-2 text-center border-[1px]'>Category</th>
        //       <th className='px-0 sm:px-2 text-center border-[1px]'>Value</th>
        //     </tr>
        //   </thead>
        //   <tbody className='bg-[#6D5D6E] text-black font-medium'>
            
          
        //   { Object.entries(newuserData).map(([key, value], index) => (
        //     <tr key={index}>
        //       <td className='px-0 sm:px-2 text-center border-[1px]'>{index+1}</td>
        //       <td className='px-0 sm:px-2 text-center border-[1px] italic' >{key}</td>
        //        <td className='px-0 sm:px-2 text-center border-[1px] italic'>{value}</td>
        //     </tr>            
        //   ))}
        //   </tbody>
        // </table>
      )}
      <ul className='max-[510px]:w-[90vw] sm:w-full list-[square] italic font-extralight text-xs 
list-inside'><i className="fa-solid fa-circle-exclamation text-red-500 mr-1"></i>The purpose of this project is to make a reusable template for
      
       <li>React Hooks Forms</li> 
       <li>JWT Authentication </li>
       using  best practices of ReactJS ~ <span className='not-italic font-normal'>azeenGAN</span></ul>
      
    </div>
  );
};

export default UserInfo;
