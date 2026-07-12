type BmiMessage = 'Underweight' | 'Normal weight' | 'Overweight' | 'Obese'

interface Bmi {
  bmi: number,
  message: BmiMessage
}

interface MemberSince { 
  date: string,
  months: string
}

export default interface BmiAndMemberSince {
  bmi: Bmi,
  memberSince: MemberSince
}