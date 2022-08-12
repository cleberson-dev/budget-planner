import { AnimatePresence } from "framer-motion"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import EntryScreen from "./screens/Entry.screen"
import HomeScreen from "./screens/Home.screen"

const Container = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 0 1.25rem;
`

function App() {
  return (
    <AnimatePresence>
      <Container>
        <Router>
          <Routes>
            <Route index element={<HomeScreen />} />
            <Route path="entry" element={<EntryScreen />} />
          </Routes>
        </Router>
      </Container>
    </AnimatePresence>
  )
}

export default App
