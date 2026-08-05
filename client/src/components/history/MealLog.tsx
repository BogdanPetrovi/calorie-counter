import ContainerDiv from "../shared/ui/ContainerDiv"
import LogEntry from "./ui/LogEntry"
import Pagination from "./Pagination"
import { useEffect, useState } from "react"
import Title from "../shared/ui/Title"
import mealLogOptions from '../../utils/api/hooks/mealLogQueryOptions'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useLogPages from "../../utils/api/hooks/logPagesQuery"
import EmptyState from "../shared/ui/EmptyState"
import { LuCookingPot } from "react-icons/lu"
import AddMealModal from "../shared/AddMealModal"
import Loader from "../shared/Loader"

const MealLog = () => {
  const [page, setPage] = useState(1)
  const { data, isPending } = useQuery(mealLogOptions(page))
  const { data: pages, isPending: arePagesPending } = useLogPages()
  const queryClient = useQueryClient()
  const [isAddMealModal, setIsAddMealModal] = useState(false)

  useEffect(() => {
    if(pages && page > pages)
      setPage(pages)
    if(page !== 1)
      queryClient.prefetchQuery(mealLogOptions(page-1))

    queryClient.prefetchQuery(mealLogOptions(page+1))
  }, [page, pages, queryClient])

  if(isPending || !data || !pages || arePagesPending) 
    return (
      <ContainerDiv>
        <Title name="Meal log" />
        <div className="w-full min-h-88 flex justify-center items-center">
          <Loader size={100} text={false} />
        </div>
        <div className="w-[110%] pb-10 mt-2 flex items-center justify-center gap-4 text-4xl font-bold text-white bg-green-700 select-none">
        <Pagination
          page={page}
          setPage={setPage}
          maxPage={ pages || 10 }
        />
        </div>
      </ContainerDiv>
    )

  if(data.length === 0)
    return (
      <>
        <ContainerDiv>
          <Title name="Meal log" />
          <EmptyState
            Icon={LuCookingPot}
            title="No meals logged yet"
            description="Log your first meal to start tracking your nutrition and see your meal history here."
            buttonText="Add meal"
            buttonAction={() => setIsAddMealModal(true)}
          />
        </ContainerDiv>
        {
          isAddMealModal &&
            <AddMealModal close={() => setIsAddMealModal(false)} />
        }
      </>
    )

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
    </>
  )
}

export default MealLog