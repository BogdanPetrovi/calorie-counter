export interface SetupData {
  gender: 'Male' | 'Female',
  weight: number,
  height: number,
  dateOfBirth: string,
  activicyLevel: 0 | 1 | 2 | 3 ,
  goal: 'lose' | 'maintain' | 'gain'
}