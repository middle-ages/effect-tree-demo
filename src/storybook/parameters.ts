export const source = <P extends {}>(code: string, docParameters?: P) =>
  ({docs: {source: {code, type: 'code'}}, ...docParameters}) as const

export const paddedLayout = {layout: 'padded'} as const,
  fullscreenLayout = {layout: 'fullscreen'} as const,
  centeredLayout = {layout: 'centered'} as const
