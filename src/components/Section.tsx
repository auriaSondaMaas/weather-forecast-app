import { useState } from 'react'
import { ICity } from '../models/City.model'
import Card from './weather/Card'
import SearchCity from './weather/SearchCity'

function AppAppBar () {
  const [city, setCity] = useState<ICity | undefined>()

  return (
    <div>
      <SearchCity setCurrentCity={setCity} />
      <Card city={city} />
    </div>
  )
}

export default AppAppBar
