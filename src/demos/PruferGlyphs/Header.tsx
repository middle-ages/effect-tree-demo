interface Props {
  messages: string[]
}

export const Header = ({messages}: Props) => {
  return (
    <h1>
      {messages.map((message, i) => (
        <div key={i}>{message}</div>
      ))}
    </h1>
  )
}
