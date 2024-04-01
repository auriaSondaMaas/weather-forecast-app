import axios, { Method } from 'axios'

export interface IAxiosRequest {
  auth: boolean,
  token?: string;
  method: Method;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  file?: boolean;
}

export default async function axiosService<T> ({ auth, token, method, url, body }: IAxiosRequest): Promise<T> {
  const headers: Record<string, string> = {}

  if (auth) {
    headers.Authorization = `Bearer ${token}`
  }

  headers['Content-Type'] = 'application/json'

  const response = await axios({
    method,
    url,
    headers,
    data: body
  })
  return response.data
}
