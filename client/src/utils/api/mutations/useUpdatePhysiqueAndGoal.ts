import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePhysiqueAndGoal } from "../requests/user.requests"
import { useToast } from "../../../context/ToastContext"
import { AxiosError } from "axios"

interface Payload {
  gender: string, 
  weight: number, 
  height: number, 
  dateOfBirth: string, 
  activicyLevel: number, 
  goal: string
}

const useUpdatePhysiqueAndGoal = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToast()
  
  return useMutation({
    mutationFn: ({ activicyLevel, dateOfBirth, gender, goal, height, weight }: Payload) => updatePhysiqueAndGoal(
      gender,
      weight,
      height,
      dateOfBirth,
      activicyLevel,
      goal
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: ['bmi-and-member-since'] })
      showToast("Succesfuly changed your data!", 'success')
    },
    onError: (err) => {
      if(err instanceof AxiosError){
        showToast(err.response?.data.message || err.message, 'error')
        return
      }
      showToast("Couldn't save your new data, try again!", 'error')
    }
  })
}

export default useUpdatePhysiqueAndGoal