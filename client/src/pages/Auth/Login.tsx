import type React from "react"
import { useState } from "react"
import AuthInput from "../../components/auth/AuthInput"
import AuthPageDecoration from "../../components/auth/AuthPageDecoration"
import { Link, Navigate, useNavigate } from "react-router-dom"
import AuthSubmit from "../../components/auth/AuthSubmit"
import AuthPageLayout from "../../components/auth/AuthPageLayout"
import { validateLogin } from "../../utils/validator"
import { useUser } from "../../utils/api/hooks/userQuery"
import Loader from "../../components/shared/ui/ScreenLoader"
import useLogIn from "../../utils/api/mutations/useLogIn"
import { AxiosError } from "axios"
import { TbLoader3 } from "react-icons/tb"

const Login = () => {
  const { data: user, isPending } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayError, setDisplayError] = useState('')
  const navigate = useNavigate()

  const { mutate, isPending: isMutatePending } = useLogIn()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisplayError('')

    //If there was an error function will return string error message
    const validateError: string = validateLogin(email, password)
    if(validateError)
      return setDisplayError(validateError)
    
    setPassword('')
    
    mutate({ email, password }, 
      {
        onSuccess: () => navigate('/'),
        onError: (err) => {
          if(err instanceof AxiosError){
            setDisplayError(err.response?.data?.message || err.message)
            return
          }

          setDisplayError("We couldn't log you in at the moment, please try again.")
        }
      }
    )
  }

  if(isPending) return <Loader />

  if(user) return <Navigate to={'/dashboard'} />

  return (
    <div className="flex bg-background">
      <div className="fade-in-right">
        <AuthPageLayout>
          <div className="ml-3 md:ml-0">
            <h2 className="text-6xl font-bold">Welcome back</h2>
            <h4 className="text-2xl text-green-600">Please enter your login details</h4>
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
                    Don’t have an account? <Link to={'/register'} state={{ fromNavigation: true }} className="text-green-600 underline font-semibold">Sign Up</Link>
                  </p>
                </>
            }
          </form>
        </AuthPageLayout>
      </div>

      <div className="slide-in-right">
        <AuthPageDecoration />
      </div>
    </div>
  )
}

export default Login
