interface IMain {
  temp: string
  feels_like: string
  temp_min: string
  temp_max: string
  pressure: string
  sea_level: string
  grnd_level: string
  humidity:string
  temp_kf: string
}

interface IWeather {
  id: string
  main: string
  description: string
  icon: string
}

interface IClouds {
  all: number
}

interface IWInd {
  speed: number
  deg: number
  gust: number
}

interface IListWeather {
  dt: number
  main: IMain
  weather: IWeather[]
  clouds: IClouds
  wind: IWInd
  visibility: string
  pop: number
  sys: {
    pod: string
  }
  dt_txt: string
}

interface IWeatherResponse {
  co: string
  message: number
  cnt: number
  list: IListWeather[]
}

interface IGetWeatherParams {
  lat?: string
  lon?: string
  units?: string
  cnt?: number
}

export type { IGetWeatherParams, IWeatherResponse, IListWeather }
