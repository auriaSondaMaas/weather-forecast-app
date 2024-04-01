import { IWeatherResponse } from './Weather.model'

interface ICity {
  id: number
  city_slug: string
  city_name: string
  state: string
  country: string
  lat: string
  long: string
  result_type: string
}

interface IGetCityParams {
  q?: string
}

interface ICityWeather {
  id: number
  city_slug: string
  city_name: string
  state: string
  country: string
  lat: string
  long: string
  result_type: string
  weather: IWeatherResponse
}

export type {
  ICity,
  IGetCityParams,
  ICityWeather
}
