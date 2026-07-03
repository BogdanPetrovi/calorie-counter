import type { Dispatch, SetStateAction } from "react"

interface PaginationProps {
  page: number,
  setPage: Dispatch<SetStateAction<number>>,
  maxPage: number
}

const Pagination = ({ page, setPage, maxPage }: PaginationProps) => {
  const allowedClass = 'cursor-pointer'
  const notAllowedClass = "cursor-not-allowed text-white/20"

  const changePage = (direction: 'next' | 'prev') => {
    if((page === 1 && direction === 'prev') || (page === maxPage && direction === 'next'))
      return

    const newPage = direction === 'next' ? page + 1 : page - 1

    setPage(newPage)
  }
  return (
    <>
      <h2 
        className={ page === 1 ? notAllowedClass : allowedClass }
        onClick={() => changePage('prev')}
      >{ '<' }</h2>
      <h2>{ page }</h2>
      <h2 
        className={ page === maxPage ? notAllowedClass : allowedClass }
        onClick={() => changePage('next')}
      >{ '>' }</h2>
    </>
  )
}

export default Pagination