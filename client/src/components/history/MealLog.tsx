import ContainerDiv from "../shared/ui/ContainerDiv"
import LogEntry from "./ui/LogEntry"
import Pagination from "./Pagination"
import { useEffect, useState } from "react"
import Title from "../shared/ui/Title"
import mealLogOptions from '../../utils/useQuery/mealLogQueryOptions'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useLogPages from "../../utils/useQuery/logPagesQuery"
import type { ToastWithShow } from "../../types/toastTypes"
import Toast from "../shared/Toast"

const MealLog = () => {
  const [toast, setToast] = useState<ToastWithShow>({
    message: '',
    type: 'success',
    show: false
  })
  const toastSettings = ( toast: ToastWithShow ) => {
    setToast({
      ...toast,
      message: toast.message,
      show: toast.show,
      type: toast.type
    })
  }
  const [page, setPage] = useState(1)
  const { data, isPending } = useQuery(mealLogOptions(page))
  const { data: pages, isPending: arePagesPending } = useLogPages()
  const queryClient = useQueryClient()

  useEffect(() => {
    if(page !== 1)
      queryClient.prefetchQuery(mealLogOptions(page-1))

    queryClient.prefetchQuery(mealLogOptions(page+1))
  }, [page, queryClient])

  if(isPending || !data || !pages || arePagesPending) return <></>

  return (
    <>
      <ContainerDiv>
        <Title name="Meal log" />
        <div className="w-full min-h-88 flex flex-col gap-2">
          {
            data.map(entry => (
              <LogEntry
                key={entry.id}
                id={entry.id}
                calories={entry.calories}
                foodName={entry.foodName}
                mealType={entry.mealType}
                createdAt={entry.createdAt}
                servingSize={entry.servingSize}
                toastSettings={toastSettings}
              />
            ))
          }
        </div>
        <div className="w-[110%] pb-10 mt-2 flex items-center justify-center gap-4 text-4xl font-bold text-white bg-green-700 select-none">
          <Pagination
            page={page}
            setPage={setPage}
            maxPage={ pages }
          />
        </div>
      </ContainerDiv>
      {
        toast.show &&
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({...toast, show: false})}
          />
      }
    </>
  )
}

export default MealLog