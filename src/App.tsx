import styled from "styled-components"

const Container = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

function App() {
  return (
    <Container>
      <h1>Budget Planner</h1>
      <small>because i dont wanna spend on mobills premium</small>
    </Container>
  )
}

export default App
