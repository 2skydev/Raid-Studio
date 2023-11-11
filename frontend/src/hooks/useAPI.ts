import axios from 'axios'
import useSWR, { SWRConfiguration } from 'swr'

export interface useAPIOptions extends SWRConfiguration {
  disabled?: boolean
}

const useAPI = <Data = any>(url: string, options: useAPIOptions = {}) => {
  const { disabled, ...swrOptions } = options

  const swr = useSWR<Data>(disabled ? null : url, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 0,
    fetcher: async key => {
      try {
        const { data } = await axios.get(key, {
          baseURL: '/api',
        })

        return data
      } catch (error: any) {
        throw {
          message: error.response.data?.error || '알 수 없는 에러가 발생했습니다.',
          status: error.response.status,
        }
      }
    },
    ...swrOptions,
  })

  return swr
}

export default useAPI
