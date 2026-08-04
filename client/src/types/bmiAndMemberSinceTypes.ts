type BmiMessage = 'Underweight' | 'Normal weight' | 'Overweight' | 'Obese'

interface Bmi {
  bmi: number,
  message: BmiMessage
}

interface MemberSince { 
  date: string,
  months: number
}

export default interface BmiAndMemberSince {
  bmi: Bmi,
  memberSince: MemberSince
}