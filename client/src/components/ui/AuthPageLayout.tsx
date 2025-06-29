import React from 'react'

interface PageLayoutProps {
  children: React.ReactNode;
}

const AuthPageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="w-screen md:w-[60vw] h-screen flex flex-col justify-center items-center md:items-start ml-0 md:ml-16 gap-10">
      {children}
    </div>
  )
}

export default AuthPageLayout
