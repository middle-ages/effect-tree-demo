import {useEffect, useState} from 'react'
import {decode} from './client'
import {DecodeRequest, type DecodeResponse} from './message'
import type {RootState} from '#model'

export const useTreeWorker = ({
  code: {code},
  style: {format, theme},
}: RootState): DecodeResponse | undefined => {
  const [response, setResponse] = useState<DecodeResponse>()

  useEffect(() => {
    const [promise, terminate] = decode(DecodeRequest(code, format, theme))

    promise
      .then(setResponse)
      .catch((error: unknown) => {
        throw error
      })
      .finally(terminate)

    return terminate
  }, [code, format, theme])

  return response
}
