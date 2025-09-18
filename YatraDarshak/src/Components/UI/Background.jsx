import React from 'react'

const Background = () => {
  return (
    <>
        <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-500 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </>
  )
}

export default Background