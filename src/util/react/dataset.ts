import * as Array from '../Array'
import {pipe} from '../Function'
import * as Record from '../Record'

/**
 * A component that set its `dataset` prop as `data-` attributes on one of its
 * elements.
 */
export interface HasData {
  dataset: DataAttributes
}

export type DataAttributes = Record<`data-${string}`, string>

/**
 * Spread the given `string ⇒ string` record as element `data-*` attributes.
 */
export const datasetAttributes = (
  dataset: Record<string, string>,
): DataAttributes =>
  pipe(
    dataset,
    Record.toEntries,
    Array.map(([key, value]) => [`data-${key}`, value] as const),
    Record.fromEntries,
  )
