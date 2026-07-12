const calculateBmi = (weight: number, height: number) => {
  // height will come as e.g. 184 and we need 1.84 in formula
  height = height / 100

  const messages = ['Underweight', 'Normal weight', 'Overweight', 'Obese']
  const bmi = Number((weight / (height ** 2)).toFixed(2))

  if(bmi < 18.5)
    return { message: messages[0], bmi }
  if(bmi < 24.9)
    return { message: messages[1], bmi }
  if(bmi < 29.9)
    return { message: messages[2], bmi }

  return { messages: messages[3], bmi }
}

export default calculateBmi 