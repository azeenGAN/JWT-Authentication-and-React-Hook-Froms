import { ReactElement, useState } from 'react'
import { Link} from "react-router-dom";
import { useForm } from "react-hook-form"


function Signup():ReactElement {

    const [disabledsSwitch, setdisabledsSwitch] = useState<boolean>(false)
    //Message upon successfull and un-successfull submission of form
    const [responseSentence, setResponseSentence] = useState<any>()
  
    //React Hook Forms
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
    } = useForm()

    
const [showPassword, setShowPassword] = useState<boolean>(false)
const [errorSentence, seterrorSentence] = useState<string>('')
  //Eye for showing password
  let set_Eye_for_password = (): void => {
    setShowPassword(!showPassword)
  }
  
    //onSumit function 
  
    let onSubmit = async <t,>(data: t) => {
  
        await fetch("http://localhost:3000/signup", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          })
            .then(res => {
              if (!res.ok) {
                return res.json().then(err => { throw new Error(err.message) });
              }
              return res.json();
            })
            .then((sentence) => {
              setResponseSentence(sentence.message);
              setdisabledsSwitch(true);
            })
            .catch((error) => {
              seterrorSentence(error.message)
              setResponseSentence(
                
                  <span className='text-red-500 font-semibold text-sm'>{error.message}</span> 
              );
            });
        }
  
   
    //placeholder color for dropdown
   

    
  
    return (
      <>
        <div className="bg-slate-200 h-screen w-screen grid place-content-center text-white">
  
          <div className='bg-[#383838] p-[30px] rounded-lg whitespace-nowrap flex justify-center items-center gap-auto flex-col'>
            <h2 className='font-semibold mb-3'>Signup form</h2>
  
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
              <button type="submit" className="text-white bg-zinc-800  focus:outline-none focus:ring-2 mt-4 focus:ring-zinc-600 font-medium rounded-md text-sm px-3 py-1 hover:bg-zinc-700 disabled:opacity-20" disabled={isSubmitting || disabledsSwitch} >{disabledsSwitch ? "submitted" : "submit"}</button>
            </form>
            
            {responseSentence && ( <div className='self-start'> <span className='italic font-light text-xs '>{responseSentence}</span>  {(disabledsSwitch || errorSentence ===  'Your credientials already exist, Go to login page ') && (
      <span className='text-sm pl-1 italic underline text-blue-500'>
        <Link to="/login">Login</Link>
      </span>
    )}
    </div> )}
            
            
            </div>
        </div>
        </>
  )

}

export default Signup
