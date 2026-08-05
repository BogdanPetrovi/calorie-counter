import { NavLink } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/4 p-8 bg-muted/10 border border-border shadow-2xl rounded-2xl flex flex-col items-center gap-3 text-center">
        <h1 className="text-5xl font-extrabold">404 Page not found</h1>
        <h4 className="font-semibold text-2xl">Oops! Looks like this page contains 0 calories—and 0 content.</h4>
        <h5 className="text-muted">
          It seems the link you followed was trimmed off the menu or moved somewhere else. 
          Don't worry, no logging needed for this misstep! Head back to your Dashboard to track your meals.
        </h5>
        <NavLink 
          to={'/dashboard'}
          className={'w-[90%] p-4 bg-green-700 text-white rounded-lg text-2xl font-bold hover:bg-green-600 active:bg-green-500 duration-300'}
        >
          Go to dashboard
        </NavLink>
      </div>
    </div>
  )
}

export default NotFound