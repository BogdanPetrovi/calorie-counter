import type React from "react"
import { useState } from "react"
import AuthInput from "../../components/ui/AuthInput"
import AuthPagesDetails from "../../components/ui/AuthPagesDetails"
import { validateEmail } from "../../utils/helper"
import { Link } from "react-router-dom"
import AuthSubmit from "../../components/ui/AuthSubmit"
import AuthPageLayout from "../../components/ui/AuthPageLayout"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError('Please enter valid email address')
      return;
    }

    if(password.length <= 7) {
      setError('Please enter a password with at least 8 characters')
      return;
    }

    setError('')
    console.log(email)
    console.log(password)
  }

  return (
    <div className="flex">
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
            error &&
            <h4 className="ml-3 md:ml-0 text-lg -mt-3 font-semibold text-red-600">{error}</h4>
          }

          <AuthSubmit />

          <p className="text-lg mt-3">
            Don’t have an account? <Link to={'/register'} className="text-green-600 underline font-semibold">Sign Up</Link>
          </p>
        </form>
      </AuthPageLayout>

      <AuthPagesDetails />

    </div>
  )
}

export default Login
