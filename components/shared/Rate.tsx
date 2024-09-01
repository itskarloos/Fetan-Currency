import React from 'react'
import ExchangeCard from './ExchangeCard'

const Rate = () => {
  return (
    <div className="h-[100] w-full flex p-5 md:p-10 flex-col mt-10 gap-2">
      <p className="text-base md:text-2xl text-white">
        Exchange Rate
      </p>
      <ExchangeCard />
    </div>
  )
}

export default Rate
