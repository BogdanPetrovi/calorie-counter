import type BmiAndMemberSince from "../../../types/bmiAndMemberSinceTypes";
import type WeightChangeRow from "../../../types/weightChangeTypes";

export let mockBmiAndMemberSince: BmiAndMemberSince = {
  bmi: {
    bmi: 22.45,
    message: 'Normal weight'
  },
  memberSince: {
    date: 'January 2026',
    months: 7
  }
}

export let mockWeightChange: WeightChangeRow[] = [
  {
    weight: 81,
    date: '10 Jul'
  },
  {
    weight: 80.7,
    date: '14 Jul'
  },
  {
    weight: 80.2,
    date: '21 Jul'
  },
  {
    weight: 80.6,
    date: '25 Jul'
  },
  {
    weight: 81.1,
    date: '27 Jul'
  },
]