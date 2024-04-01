import { ICity, IGetCityParams } from '../../models/City.model'
import axiosService, { IAxiosRequest } from '../../services/axiosService'

// const baseUrl = 'https://search.reservamos.mx/api/v2/places'
const baseUrl = import.meta.env.VITE_API_URL

export const getAllCities = async (params: IGetCityParams = {}) => {
  try {
    const q = `&q=${params.q}`

    const url = `${baseUrl}?${q}`

    const request: IAxiosRequest = {
      auth: false,
      method: 'get',
      url
    }
    const response = await axiosService<ICity[]>(request)
    return response
  } catch (err) {
    console.error(err)
    throw err
  }
}
