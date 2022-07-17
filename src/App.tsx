import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeScreen from "./screens/Home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <HomeScreen />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
