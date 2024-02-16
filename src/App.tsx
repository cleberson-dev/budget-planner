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
  padding-top: 30px;
`

const Titlebar = styled.div`
  user-select: none;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #20232a;
  text-align: center;
  text-transform: lowercase;
  font-size: 0.8rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.2);
  padding: 8px 0;
`

function App() {
  return (
    <AnimatePresence>
      <Container>
        <Titlebar>Budget Planner</Titlebar>
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
