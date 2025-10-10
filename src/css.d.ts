import 'react'

declare module '*.css' {
  const content: string
  export default content
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      selectedcontent: any
    }
  }
}
