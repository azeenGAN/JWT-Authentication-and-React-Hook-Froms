import React, { ReactElement, useEffect, useState } from 'react';


interface newUserData {
  Firstname: string;
  Lastname: string;
  Email: string;  
  Country: string;
  Employment: string;
   // Use 'string' or 'Date' depending on how you parse it
  
}

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
     // Use 'string' or 'Date' depending on how you parse it
    
  };


  
  return (
    <div className="bg-zinc-950 gap-2 h-dvh w-screen grid place-content-center text-white grid-flow-row">
      {userData === null ? (
        <p>Fill out the form at /form first, then come here.</p>
      ) : (
        <table className='rounded-[4px] shadow-outline-2px px-2'>
          <thead >
            <tr className='bg-[#4F4557] ' >
              <th className='px-0 sm:px-2 text-center border-[1px]'>Sr no</th>
              <th className='px-0 sm:px-2 text-center border-[1px]'>Category</th>
              <th className='px-0 sm:px-2 text-center border-[1px]'>Value</th>
            </tr>
          </thead>
          <tbody className='bg-[#6D5D6E] text-black font-medium'>
            
          
          { Object.entries(newuserData).map(([key, value], index) => (
            <tr key={index}>
              <td className='px-0 sm:px-2 text-center border-[1px]'>{index+1}</td>
              <td className='px-0 sm:px-2 text-center border-[1px] italic' >{key}</td>
               <td className='px-0 sm:px-2 text-center border-[1px] italic'>{value}</td>
            </tr>            
          ))}
          </tbody>
        </table>
      )}
      <ul className='list-[square] max-w-[343.812px] italic font-extralight text-xs 
list-inside'><i className="fa-solid fa-circle-exclamation text-red-500 mr-1"></i>The purpose of this project is to make a reusable template for
      
       <li>React Hooks Forms</li> 
       <li>JWT Authentication </li>
       using  best practices of ReactJS ~ <span className='not-italic font-normal'>azeenGAN</span></ul>
      
    </div>
  );
};

export default UserInfo;
