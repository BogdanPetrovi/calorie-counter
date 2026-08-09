import React, { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import AuthInput from "../../components/auth/AuthInput"
import AuthPageLayout from "../../components/auth/AuthPageLayout"
import AuthSubmit from "../../components/auth/AuthSubmit"
import AuthPageDecoration from "../../components/auth/AuthPageDecoration"
import { validateRegister } from "../../utils/validator"
import { useUser } from "../../utils/api/hooks/userQuery"
import Loader from "../../components/shared/ui/ScreenLoader"
import useRegister from "../../utils/api/mutations/useRegister"
import { AxiosError } from "axios"
import { TbLoader3 } from "react-icons/tb"

const Register = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayError, setDisplayError] = useState('')
  const navigate = useNavigate()
  const { data: user, isPending } = useUser()

   const { mutate, isPending: isMutatePending } = useRegister()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //If there was an error function will return string error message
    const validateError: string = validateRegister(email, password, fullName)
    if(validateError){
      return setDisplayError(validateError)
    }

    setDisplayError('')
    
    mutate({ fullName, email, password }, 
      {
        onSuccess: () => navigate('/setup'),
        onError: (err) => {
          if(err instanceof AxiosError){
            setDisplayError(err.response?.data?.message || err.message)
            return
          }

          setDisplayError("We couldn't register you at the moment, please try again.")
        }
      }
    )
  }

  if(isPending) return <Loader />

  if(user) return <Navigate to={'/dashboard'} />

  return (
    <div className="flex flex-row-reverse">
      <div className="fade-in-left">
        <AuthPageLayout>
          <div className="ml-3 md:ml-0">
            <h2 className="text-6xl font-bold">Create an Account</h2>
            <h4 className="text-2xl text-green-600">Join us by entering your details below</h4>
          </div>
          <form 
            className={`flex flex-col w-full items-center md:items-start ${isMutatePending && 'md:pl-25 xl:pl-50'}`}
            onSubmit={(e) => handleSubmit(e)}
          >
            {
              isMutatePending ? 
                <div className="flex flex-col justify-center items-center">
                  <TbLoader3 size={100} color="#16a34a" className="animate-spin" />
                  <h3 className="text-lg animate-pulse">Processing your request...</h3>
                </div> 
              :
                <>
                  <AuthInput
                    label="Full name"
                    placeholder="Bob"
                    type="text" 
                    value={fullName} 
                    onChange={(value) => setFullName(value)}  />
                  
                  <AuthInput
                    label="Email Address"
                    placeholder="bob@example.com"
                    type="text" 
                    value={email} 
                    onChange={(value) => setEmail(value)}  />
                  
                  <AuthInput 
                    label="Password"
                    placeholder="Min 8 characters"
                    type="password" 
                    value={password} 
                    onChange={(value) => setPassword(value)}  />

                  {
                    displayError &&
                    <h4 className="ml-3 md:ml-0 text-lg -mt-3 font-semibold text-red-600">{displayError}</h4>
                  }

                  <AuthSubmit />

                  <p className="text-lg mt-3">
                    Have an account already? <Link to={'/login'} className="text-green-600 underline font-semibold">Log In</Link>
                  </p>
                </>
            }
          </form>
        </AuthPageLayout>
      </div>

      <div className="slide-in-left">
        <AuthPageDecoration />    
      </div>
    </div>
  )
}

export default Register