import { ReactElement, useState, useContext } from 'react'
import {  useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { AuthContext } from './App.tsx';


// interface LocationState {
//   from?: {
//     pathname?: string;
//   };
// }
function Login():ReactElement {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where the context is not available
    throw new Error('Form must be used within an AuthProvider');
  }

  const { setIsAuthenticated } = authContext;

  const navigate = useNavigate();
  const location = useLocation();
 
  let from = location.state?.from?.pathname || '/';  
        

    //Message upon un-successfull submission of form
    const [responseSentence, setResponseSentence] = useState<any>()
    const [errorOccured, setErrorOccured] = useState<boolean>(false)
  
    //React Hook Forms
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
    } = useForm()
    
    
    
const [showPassword, setShowPassword] = useState<boolean>(false)
  //Eye for showing password
  let set_Eye_for_password = (): void => {
    setShowPassword(!showPassword)
  }
  
    //onSumit function 
    
    let onSubmit = async <t,>(data: t) => {
      
  
        await fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          })
            .then(async res => {
              if (!res.ok) {
                return res.json().then(err => { throw new Error(err.message) });                
              }
              const data = await res.json();
              if (data.token) {
                
                localStorage.setItem('JWT_Token', data.token);
                setIsAuthenticated(true)
                navigate(from);

                console.log("this is console", data.token)
                console.log("this is ",location.state.from)
              
            }})
            .catch((error) => {
                setIsAuthenticated(false)
                setErrorOccured(true)
              setResponseSentence(                
                  <span className='text-red-500 italic font-semibold text-sm self-start'>{error.message}</span> 
              );
            });
        }
  
        return (
      <>
        <div className="bg-slate-200 h-screen w-screen grid place-content-center text-white">
  
          <div className='bg-[#383838] p-[30px] rounded-lg whitespace-nowrap flex justify-center items-center gap-auto flex-col'>
            <h2 className='font-semibold mb-3'>Login form</h2>
  
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-8">
                
  
                
  
                <div className='flex flex-col justify-start gap-1'>
                  <label htmlFor='E-mail' className='text-sm' >E-mail</label>
                  <input id='E-mail' className='placeholder:text-sm placeholder:pl-1 rounded-sm px-1 text-black focus:ring-2 focus:outline-none   focus:ring-zinc-400' placeholder='E-mail' type="text"
  
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address'
                      },
                      minLength: {
                        value: 5,
                        message: 'Email must be at least 5 characters long'
                      },
                      maxLength: {
                        value: 50,
                        message: 'Email must be less than 50 characters long'
                      }
                    })}
  
                  />
                  {errors.email && <p className="text-red-600 font-light text-xs">{String(errors.email.message)}</p>}
                </div>
  
                <div className='flex flex-col justify-start gap-1'>
                  <label htmlFor='Password' className='text-sm' >Password</label>
                  <div id='Password' className="bg-white rounded-sm overflow-clip flex justify-start flex-row items-center">
                    {showPassword ? <i className="fa-solid fa-eye-slash text-black  w-6 h-4 pl-1" onClick={set_Eye_for_password}></i> : <i className="fa-solid fa-eye text-black  w-6 h-4 pl-1" onClick={set_Eye_for_password}></i>}
                    <input className='shrink-1 placeholder:text-sm text-black  rounded-sm placeholder:pl-1 px-1 focus:outline-none  ' placeholder='Password'
                      type={showPassword ? "text" : "password"} autoComplete="new-password"
  
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters long'
                        },
                        maxLength: {
                          value: 20,
                          message: 'Password must be less than 20 characters long'
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message: `Password must contain at least:\none uppercase letter,\none lowercase letter,\none number, and one special character`
                        }
                      })}
                    />
                  </div>
                  {errors.password && <pre className="text-red-600 font-light text-xs">{`${errors.password.message}`}</pre>}  
                </div>
  
  
                
                
                <div>
                 
                  
                </div>
              </div>
              <button type="submit" className="text-white bg-zinc-800  focus:outline-none focus:ring-2 mt-4 focus:ring-zinc-600 font-medium rounded-md text-sm px-3 py-1 hover:bg-zinc-700 disabled:opacity-20" disabled={isSubmitting} >login</button>
            </form>
            
            {errorOccured &&  responseSentence}
            <div>Don't have an account, click here <Link to='/signup'> <button
        className="select-none rounded-lg border border-white py-1 px-1 text-center align-middle font-sans text-[11px] font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-gray-400 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        signup
      </button></Link></div>
            
            </div>
        </div>
        </>
  )

}

export default Login
