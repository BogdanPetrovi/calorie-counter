import { useState } from "react"
import ContainerDiv from "../shared/ui/ContainerDiv"
import Title from "../shared/ui/Title"
import LogEntry from "./LogEntry"
import Pagination from "./Pagination"

const MealHistoryOverview = () => {
  const [page, setPage] = useState(1)

  return (
    <div className="w-full lg:w-11/12 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <ContainerDiv>
        <Title name="Meal log" />
        <div className="w-full h-6/7 flex flex-col gap-2 mt-1">
          <LogEntry />
          <LogEntry />
          <LogEntry />
          <LogEntry />
          <LogEntry />
        </div>
        <div className="w-[110%] pb-10 mt-3 flex items-center justify-center gap-4 text-4xl font-bold text-white bg-green-700 select-none">
          <Pagination
            page={page}
            setPage={setPage}
            maxPage={2}
          />
        </div>
      </ContainerDiv>
    </div>
  )
}

export default MealHistoryOverview