import { useEffect, useState } from 'react'

export function useFetch (url: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    setIsLoading(true)
    fetch(url, { signal: abortController.signal })
      .then((response) => response.json)
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false))
    return abortController.abort
  }, [])

  return { data, isLoading, error }
}
