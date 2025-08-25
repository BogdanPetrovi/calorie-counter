import React, { useState } from "react"
import { motion } from 'framer-motion'
import { Link, useNavigate } from "react-router-dom"
import AuthInput from "../../components/ui/AuthInput"
import AuthPageLayout from "../../components/ui/AuthPageLayout"
import AuthSubmit from "../../components/ui/AuthSubmit"
import AuthPageDecoration from "../../components/ui/AuthPageDecoration"
import { validateRegister } from "../../utils/helper"
import api from "../../services/apiConnection"
import axios from "axios"

const Register = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //If there was an error function will return string error message
    const validateError: string = validateRegister(email, password, fullName)
    if(validateError)
      return setError(validateError)

    setError('')

    try {
      const result = await api.post('/auth/register', {
        fullName,
        email,
        password
      })

      if(result)
        return navigate('/dashboard')

    } catch (err) {
      if(axios.isAxiosError(err)){
        if(err.response?.data?.message){ 
          console.log(err)
          return setError(err.response.data.message)
        }
      } else {
        console.log('Unknown error has occurred')
        console.log(err)
        return setError('Unknown error has occurred')
      }
    }
  }

  return (
    <div className="flex flex-row-reverse">
      <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.4}}
      >
        <AuthPageLayout>
          <div className="ml-3 md:ml-0">
            <h2 className="text-6xl font-bold text-zinc-800">Create an Account</h2>
            <h4 className="text-2xl text-green-600">Join us by entering your details below</h4>
          </div>
          <form className="flex flex-col w-full items-center md:items-start" onSubmit={(e) => handleSubmit(e)}>
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
              error &&
              <h4 className="ml-3 md:ml-0 text-lg -mt-3 font-semibold text-red-600">{error}</h4>
            }

            <AuthSubmit />

            <p className="text-lg mt-3">
              Have an account already? <Link to={'/login'} className="text-green-600 underline font-semibold">Log In</Link>
            </p>
          </form>
        </AuthPageLayout>
      </motion.div>

      <motion.div 
        initial={{ x:1150 }}
        animate={{ x:0 }}
        exit={{ opacity: 0, x:-20 }}
        transition={{ duration: 0.4 }}
      >
        <AuthPageDecoration />
      </motion.div>
    
    </div>
  )
}

export default Register