import React from 'react'
import ExchangeCard from './ExchangeCard'

const Rate = () => {
  return (
    <div className="w-full flex flex-col mt-10 gap-2">
      <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-white">
        Exchange Rate
      </p>
      <ExchangeCard />
    </div>
  )
}

export default Rate
