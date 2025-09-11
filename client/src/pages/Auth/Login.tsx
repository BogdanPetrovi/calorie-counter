import type React from "react"
import { useState } from "react"
import AuthInput from "../../components/auth/AuthInput"
import AuthPageDecoration from "../../components/auth/AuthPageDecoration"
import { Link, Navigate, useNavigate } from "react-router-dom"
import AuthSubmit from "../../components/auth/AuthSubmit"
import AuthPageLayout from "../../components/auth/AuthPageLayout"
import { motion } from 'framer-motion'
import api from "../../services/apiConnection"
import { validateLogin } from "../../utils/helper"
import axios from "axios"
import { useUser } from "../../utils/userQuery"
import Loader from "../../components/general/Loader"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayError, setDisplayError] = useState('')
  const navigate = useNavigate()
  const { data: user, isPending } = useUser()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisplayError('')

    //If there was an error function will return string error message
    const validateError: string = validateLogin(email, password)
    if(validateError)
      return setDisplayError(validateError)
    
    setPassword('')
    
    try {
      const result = await api.post('/auth/login', {
        email,
        password
      })

      if(result)
        return navigate('/dashboard')

    } catch (err) {
      if(axios.isAxiosError(err)){
        if(err.response?.data?.message){ 
          console.log(err)
          return setDisplayError(err.response.data.message)
        }
      } else {
        console.log('Unknown error has occurred')
        console.log(err)
        return setDisplayError('Unknown error has occurred')
      }
    }
  }

  if(isPending) return <Loader />

  if(user) return <Navigate to={'/dashboard'} />

  return (
    <div className="flex">
      <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.4}}
      >
        <AuthPageLayout>
          <div className="ml-3 md:ml-0">
            <h2 className="text-6xl font-bold text-zinc-800">Welcome back</h2>
            <h4 className="text-2xl text-green-600">Please enter your login details</h4>
          </div>
          <form className="flex flex-col w-full items-center md:items-start" onSubmit={(e) => handleSubmit(e)}>
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
          </form>
        </AuthPageLayout>
      </motion.div>

      <motion.div 
        initial={{ x:-1150}}
        animate={{ x:0, y:0 }}
        exit={{ opacity: 0, x:20 }}
        transition={{ duration: 0.4 }}
      >
        <AuthPageDecoration />
      </motion.div>

    </div>
  )
}

export default Login
