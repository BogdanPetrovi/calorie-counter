const validateEmail = (email: string) => {
  const validator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return validator.test(email)
}

type Validator = (email:string, password: string, fullName?:string) => string

export const validateRegister: Validator = (email, password, fullName) => {
  if(!fullName){
    return 'Please enter your full name';
  }

  if(!validateEmail(email)){
    return 'Please enter a valid email address';
  }

  if(password.length <= 7) {
    return 'Please enter a password with at least 8 characters';
  }

  return ''
}

export const validateLogin: Validator = (email, password) => {
  if(!validateEmail(email))
    return 'Please enter a valid email address';

  if(!password)
    return 'This field is required'

  return ''
}