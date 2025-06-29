export const validateEmail = (email: string) => {
  const validator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return validator.test(email)
}