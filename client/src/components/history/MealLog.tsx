import ContainerDiv from "../shared/ui/ContainerDiv"
import LogEntry from "./ui/LogEntry"
import Pagination from "./Pagination"
import { useEffect, useState } from "react"
import Title from "../shared/ui/Title"
import mealLogOptions from '../../utils/useQuery/mealLogQueryOptions'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useLogPages from "../../utils/useQuery/logPagesQuery"

const MealLog = () => {
  const [page, setPage] = useState(1)
  const { data, isPending } = useQuery(mealLogOptions(page))
  const { data: pages, isPending: arePagesPending } = useLogPages()
  const queryClient = useQueryClient()

  console.log(pages)

  useEffect(() => {
    if(page !== 1)
      queryClient.prefetchQuery(mealLogOptions(page-1))

    queryClient.prefetchQuery(mealLogOptions(page+1))
  }, [page, queryClient])

  if(isPending || !data || !pages || arePagesPending) return <></>

  return (
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
  )
}

export default MealLog