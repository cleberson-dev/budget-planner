import { Link, useLocation } from "react-router-dom"

const CreateScreen = (): JSX.Element => {
  const location = useLocation()
  return (
    <main>
      <h1>Create a new {(location.state as any).entryType.toLowerCase()}</h1>
      <Link to="/">Back</Link>
    </main>
  )
}

export default CreateScreen
