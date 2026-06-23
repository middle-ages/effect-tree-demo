import {pipe, type EndoOf, type LazyArg} from '#Function'
import type {Pair} from '#Pair'

export interface WorkerEntry {
  id: string
  worker: Worker
  isBusy: boolean
}

const buildWorker: LazyArg<Worker> = () => {
  return new Worker(new URL('./worker', import.meta.url), {
    type: 'module',
  })
}

const workerMap = new Map<string, WorkerEntry>()

const nextId: LazyArg<string> = (() => {
  let id = 0
  return () => {
    return `worker-${(id++).toString()}`
  }
})()

const WorkerEntry = (): WorkerEntry => {
  const entry = {
    id: nextId(),
    worker: buildWorker(),
    isBusy: false,
  }
  workerMap.set(entry.id, entry)
  return entry
}

export const withWorker = async <Result>(
  f: (worker: Worker) => Promise<Result>,
): Promise<Result> => {
  const entry = pipe(getAvailableWorker(), setBusy)
  const {worker} = entry

  try {
    const result = await f(worker)
    setAvailable(entry)
    return result
  } catch (error) {
    abortWorker(entry)
    throw new Error(`Worker error: ${error as string}`, {cause: error})
  } finally {
    adjustPool()
  }
}

const [setBusy, setAvailable]: Pair<EndoOf<WorkerEntry>> = [
  entry => {
    workerMap.set(entry.id, {...entry, isBusy: true})
    return entry
  },
  entry => {
    workerMap.set(entry.id, {...entry, isBusy: false})
    return entry
  },
]

export const abortWorker = ({id, worker}: WorkerEntry) => {
  workerMap.delete(id)
  worker.terminate()
}

const findAvailable = (): WorkerEntry | undefined =>
  workerMap.entries().find(([, {isBusy}]) => !isBusy)?.[1]

const filterAvailable = (): WorkerEntry[] => [
  ...workerMap
    .entries()
    .filter(([, {isBusy}]) => !isBusy)
    .map(([, entry]) => entry),
]

const [poolMin, poolMax] = [10, 20]

const poolDelta = () => {
  const size = filterAvailable().length
  return size < poolMin ? poolMin - size : size > poolMax ? poolMax - size : 0
}

const getAvailableWorker = () => findAvailable() ?? WorkerEntry()

const adjustPool = () => {
  const delta = poolDelta()
  if (delta > 0) {
    for (let i = 0; i < delta; i++) {
      WorkerEntry()
    }
  } else if (delta < 0) {
    const [head] = filterAvailable()
    if (head !== undefined) {
      abortWorker(head)
    }
  }
}
