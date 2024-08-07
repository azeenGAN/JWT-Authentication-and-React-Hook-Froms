import React, { useState, ChangeEvent} from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import './Form.css'


// interface formProps{
//   callbackForUserData:(a:any)=> void
// }
let Form: React.FC = (): React.ReactElement => {

  

  // useEffect(() => {
  //   callbackForUserData(formDataVariable)
  // }, [formDataVariable]);

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [disabledsSwitch, setdisabledsSwitch] = useState<boolean>(false)
  //Message upon successfull and un-successfull submission of form
  const [responseSentence, setResponseSentence] = useState<any>()
  
  //React Hook Forms
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm()

  //onSumit function 

  let onSubmit = async <t,>(data: t) => {

    localStorage.setItem('userData', JSON.stringify(data));

    await fetch("http://localhost:3000/form", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())

      .then((sentence) => {
        setResponseSentence(sentence.message)
        setdisabledsSwitch(true)
      })

      .catch((error) => {
        setResponseSentence(
          error.message ?
            <span className='text-red-500 font-semibold text-sm'>{error.message}</span> : 'unknown error')
      })
      }


  const password = watch("password")
  //Eye for showing password
  let set_Eye_for_password = (): void => {
    setShowPassword(!showPassword)
  }
  //placeholder color for dropdown
  const [placeholderColor, setPlaceholderColor] = useState<boolean>(true)

  const PlaceholderColorvalue = (e: ChangeEvent<HTMLSelectElement>): void => {
    setPlaceholderColor(e.target.value === "")
  }

  return (
    <>
      <div className="bg-zinc-950 h-dvh w-screen grid place-content-center text-white ">

        <div className='bg-[#383838] p-[30px] rounded-lg w-fit flex justify-center items-center gap-auto flex-col'>
          <h2 className='font-semibold mb-3'>User Information</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-8">
              <div className='flex flex-col justify-start gap-1'>
                <label htmlFor='Firstname' className='text-sm'>Firstname</label>
                <input id='Firstname' className='placeholder:text-sm placeholder:pl-1 rounded-sm px-1 text-black focus:ring-2 focus:outline-none   focus:ring-zinc-400 ' placeholder="Firstname"{...register("firstname", { required: { value: true, message: "Must fill this field" }, minLength: { value: 3, message: "Min length is 3 words" } })} />
                {errors.firstname && <p className="text-red-600 font-light text-xs">{String(errors.firstname.message)}</p>}
              </div>

              <div className='flex flex-col justify-start gap-1'>
                <label htmlFor='Lastname' className='text-sm' >Lastname</label>
                <input id='Lastname' className='placeholder:text-sm placeholder:pl-1 rounded-sm px-1 text-black focus:ring-2 focus:outline-none   focus:ring-zinc-400 ' placeholder='Lasttname' {...register("Lastname", { required: { value: true, message: "Must fill this field" }, minLength: { value: 3, message: "Min length is 3 words" } })} />
                {errors.Lastname && <p className="text-red-600 font-light text-xs">{String(errors.Lastname.message)}</p>}
              </div>

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
                        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                      }
                    })}
                  />
                </div>
                {errors.password && <p className="text-red-600 font-light text-xs">{String(errors.password.message)}</p>}

              </div>


              <div className='flex flex-col justify-start gap-1'>
                <label htmlFor='Confirm Password' className='text-sm' >Confirm Password</label>
                <input id='Confirm Password' className='placeholder:text-sm  placeholder:pl-1 rounded-sm  text-black focus:ring-2 focus:outline-none   focus:ring-zinc-400 px-1' placeholder='Confirm Password'
                  type="password"
                  onPaste={(e) => {
                    e.preventDefault()
                    return false
                  }
                  }

                  {...register('confirmPassword', {
                    required: 'Confirm Password is required',
                    validate: (value) =>
                      value === password || "This should match password"
                  })}
                />
                {errors.confirmPassword && <p className="text-red-600 font-light text-xs">{String(errors.confirmPassword.message)}</p>}
              </div>
              {/* country dropdown */}
              <div className='flex flex-col justify-start gap-1'>
                <label htmlFor='Country' className='text-sm'>Country</label>
                <select
                  id='Country' className={`placeholder:text-sm placeholder:pl-1 rounded-sm px-1 ${placeholderColor ? "text-placeholdergrey " : "text-black"}  focus:ring-2 focus:outline-none focus:ring-zinc-400`}
                  {...register("country", { required: "Country is required" })} onChange={PlaceholderColorvalue}
                >
                  <option className="text-black" value="">Select your country</option>
                  <option className="text-black" value="usa">USA</option>
                  <option className="text-black" value="canada">Canada</option>
                  <option className="text-black" value="mexico">Mexico</option>
                  <option className="text-black" value="uk">UK</option>
                </select>
                {errors.country && <p className="text-red-600 font-light text-xs">{String(errors.country.message)}</p>}
              </div>
             
              <div className='col-span-2'>
                <p className='text-sm pb-2'>Type of employment</p>
                <div className='flex flex-col sm:flex-row sm:justify-start sm:w-max sm:flex gap-2 '>
                  <label className='text-xs  '>
                    <input {...register("employment", { required: "Employment selection is required" })} className='mr-1' type='radio' value='Govt Employee' />
                    Govt Employee
                  </label>
                  <label className='text-xs'>
                    <input {...register("employment", { required: "Employment selection is required" })} className='mr-1' type='radio' value='Private Employee' />
                    Private Employee
                  </label>
                  <label className='text-xs'>
                    <input className='mr-1' {...register("employment", { required: "Employment selection is required" })} type='radio' value='Business' />
                    Business
                  </label>
                  <label className='text-xs'>
                    <input {...register("employment", { required: "Employment selection is required" })} className='mr-1' type='radio' value='Intelligence/Spy' />
                    Intelligence/Spy
                  </label>
                </div>
              </div>
              <div className='flex flex-col justify-start gap-1 col-span-2'>
                <label htmlFor="image" className='text-sm'>Upload an image:</label>
                <input className='text-xs rounded-lg bg-zinc-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-500 w-fit'
                  type="file"
                  id="image"
                  {...register('image', {
                    required: 'Image is required',
                    validate: {
                      lessThan15MB: (files) =>
                        files[0]?.size < 10 * 1024 * 1024 || 'Max image size allowed is 10MB',
                      isImage: (files) =>
                        files[0]?.type.startsWith('image/') || 'Only image files are allowed',
                    },
                  })}
                  accept="image/*"
                />
                 {errors.image && <p className="text-red-600 font-light text-xs">{String(errors.image.message)}</p>}              
              </div>
            </div>
            <button type="submit" className="text-white bg-zinc-800  focus:outline-none focus:ring-2 mt-4 focus:ring-zinc-600 font-medium rounded-md text-sm px-3 py-1 hover:bg-zinc-700 disabled:opacity-20" disabled={isSubmitting || disabledsSwitch} >{disabledsSwitch ? "submitted" : "submit"}</button>
          </form>
          {responseSentence && <div className='italic font-light self-start'>{responseSentence}</div>}
          {disabledsSwitch && <div className=' font-normal  self-start'>Click here to see your Info <Link to='/userinfo' ><button className="text-white bg-zinc-800  focus:outline-none focus:ring-2 mt-4 focus:ring-zinc-600 font-medium rounded-md text-sm px-3 py-1 hover:bg-zinc-700 disabled:opacity-20">😊</button></Link></div>}
        </div>
      </div>
    </>
  )
}

export default Form
