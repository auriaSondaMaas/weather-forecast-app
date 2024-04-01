import { IGetWeatherParams, IWeatherResponse } from '../../models/Weather.model'
import axiosService, { IAxiosRequest } from '../../services/axiosService'

// const baseUrl = 'api.openweathermap.org/data/2.5/forecast?lat=25.6866142&lon=-100.3161126&appid={{appid}}&units=metric&cnt=5'
const baseUrl = import.meta.env.VITE_API_WEATHER
const appiKey = import.meta.env.VITE_API_KEY

export const getWeather = async (params: IGetWeatherParams = {}) => {
  try {
    const appid = `&appid=${appiKey}`
    const lat = `&lat=${params.lat}`
    const lon = `&lon=${params.lon}`
    const units = `&units=${params.units}`
    // const cnt = `&cnt=${params.cnt}`
    // const val = cnt !== undefined ? cnt : ''

    const url = `${baseUrl}?${appid}${lat}${lon}${units}`

    const request: IAxiosRequest = {
      auth: false,
      method: 'get',
      url
    }
    const response = await axiosService<IWeatherResponse>(request)
    return response
  } catch (err) {
    console.error(err)
    throw err
  }
}
