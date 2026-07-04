import ContainerDiv from "../shared/ui/ContainerDiv"
import LogEntry from "./ui/LogEntry"
import Pagination from "./Pagination"
import { useState } from "react"
import Title from "../shared/ui/Title"

const MealLog = () => {
  const [page, setPage] = useState(1)

  return (
    <ContainerDiv>
      <Title name="Meal log" />
      <div className="w-full h-6/7 flex flex-col gap-2">
        <LogEntry />
        <LogEntry />
        <LogEntry />
        <LogEntry />
        <LogEntry />
      </div>
      <div className="w-[110%] pb-10 mt-2 flex items-center justify-center gap-4 text-4xl font-bold text-white bg-green-700 select-none">
        <Pagination
          page={page}
          setPage={setPage}
          maxPage={2}
        />
      </div>
    </ContainerDiv>
  )
}

export default MealLog