import {useEffect, useState} from 'react'
import {decode} from './client'
import type {DecodeRequest, DecodeResponse} from './message'

export const useTreeWorker = ({
  code,
  format,
  theme,
}: DecodeRequest): DecodeResponse | undefined => {
  const [response, setResponse] = useState<DecodeResponse>()

  useEffect(() => {
    const {terminate, result} = decode({code, format, theme})

    result
      .then(setResponse)
      .catch((error: unknown) => {
        throw error
      })
      .finally(terminate)

    return terminate
  }, [code, format, theme])

  return response
}
