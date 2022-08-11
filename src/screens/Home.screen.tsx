import styled from "styled-components"
import EntryList from "../components/EntryList"
import useStore from "../store"
import { useNavigate } from "react-router-dom"
import { formatToBRLCurrency } from "../utils"
import format from "date-fns/format"
import ptBR from "date-fns/locale/pt-BR"

const Greeting = styled.h2`
  margin: 0;
`

const Price = styled.strong`
  display: block;
  font-weight: bold;
`

const Today = styled.p`
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

  a {
    color: inherit;
    text-decoration: none;
  }

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

const HomeScreen = (): JSX.Element => {
  const entries = useStore((state) =>
    state.accounts.map((acc) => acc.entries).flat()
  )
  const totalBalance = useStore((state) =>
    state.accounts.reduce(
      (prevTotalBalance, currentAccount) =>
        prevTotalBalance +
        currentAccount.entries.reduce(
          (prevAccountBalance, { type, value }) =>
            prevAccountBalance + (type === "INCOME" ? value : -value),
          0
        ),
      0
    )
  )
  const formattedTotalBalance = formatToBRLCurrency(totalBalance)

  const navigate = useNavigate()

  const goToCreation = (entryType: EntryTypes) => {
    navigate("/create", { state: { entryType } })
  }

  const formattedToday = format(new Date(), `d 'de' LLLL 'de' yyyy`, {
    locale: ptBR,
  })

  return (
    <main>
      <Today>{formattedToday}</Today>
      <Greeting>Oi, Cleberson!</Greeting>
      <p>
        Seu saldo atual é <Price>{formattedTotalBalance}</Price>
      </p>
      <Actions>
        <CreateIncomeButton onClick={() => goToCreation("INCOME")}>
          Criar receita
        </CreateIncomeButton>
        <CreateExpenseButton onClick={() => goToCreation("EXPENSE")}>
          Criar despesa
        </CreateExpenseButton>
      </Actions>

      <EntryList
        list={entries.slice(0, 5)}
        onEntryClick={(entry) => navigate("/entry", { state: { entry } })}
      />
    </main>
  )
}

export default HomeScreen
