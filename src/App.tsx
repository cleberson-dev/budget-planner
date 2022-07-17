import styled from "styled-components"
import { entries } from "./data"
import EntryList from "./component/EntryList"

const Container = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 0 1.25rem;
`

const Greeting = styled.h2`
  margin: 0;
`

const Price = styled.strong`
  display: block;
  font-weight: bold;
`

const Date = styled.p`
  text-align: center;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-top: 2rem;
`

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1rem;
`

const Button = styled.button`
  color: white;
  background: purple;
  font-weight: 600;
  font-family: "Albert Sans", sans-serif;
  border: 0;
  border-radius: 5px;
  padding: 1rem;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`

const CreateExpenseButton = styled(Button)`
  background: #ef233c;
`

const CreateIncomeButton = styled(Button)`
  background: #2b9348;
`

function App() {
  return (
    <Container>
      <Date>16 de Julho de 2022</Date>
      <Greeting>Oi, Cleberson!</Greeting>
      <p>
        Seu saldo atual é <Price>R$1.219,32</Price>
      </p>
      <Actions>
        <CreateIncomeButton>Criar receita</CreateIncomeButton>
        <CreateExpenseButton>Criar despesa</CreateExpenseButton>
      </Actions>

      <EntryList list={entries} />
    </Container>
  )
}

export default App
