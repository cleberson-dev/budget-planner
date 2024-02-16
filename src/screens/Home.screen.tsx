import styled from "styled-components"
import EntryList from "../components/EntryList"
import useStore from "../store"
import { useNavigate } from "react-router-dom"
import { formatDate, formatToBRLCurrency } from "../utils"
import {
  currentBalanceSelector,
  entriesSelector,
  futureBalanceSelector,
  monthExpensesSelector,
  monthIncomesSelector,
} from "../store/selectors"

const Greeting = styled.h2`
  margin: 0;
`

const Price = styled.strong`
  display: block;
  font-weight: bold;
  font-size: 1.5rem;
`

const IncomePrice = styled(Price)`
  color: #2b9348;
`
const ExpensePrice = styled(Price)`
  color: #ef233c;
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

const EntryLabel = styled.span`
  font-size: 0.9rem;
`

const AccountSummary = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`

const BalanceArea = styled.div`
  display: flex;
  justify-content: space-between;
`

const HomeScreen = (): JSX.Element => {
  const entries = useStore(entriesSelector)
  const [
    formattedCurrentBalance,
    formattedFutureBalance,
    formattedMonthIncomes,
    formattedMonthExpenses,
  ] = [
    currentBalanceSelector,
    futureBalanceSelector,
    monthIncomesSelector,
    monthExpensesSelector,
  ]
    // eslint-disable-next-line react-hooks/rules-of-hooks
    .map((selector) => useStore(selector) as number)
    .map(formatToBRLCurrency)

  const formattedToday = formatDate(new Date())

  const navigate = useNavigate()

  const goToCreation = (entryType: EntryTypes) => {
    navigate("/entry", { state: { entryType, type: "new" } })
  }

  const goToIncomeCreation = () => goToCreation("INCOME")
  const goToExpenseCreation = () => goToCreation("EXPENSE")

  return (
    <main>
      <Today>{formattedToday}</Today>
      <Greeting>Oi, Cleberson!</Greeting>
      <BalanceArea>
        <p>
          Seu saldo atual é <Price>{formattedCurrentBalance}</Price>
        </p>
        <p style={{ textAlign: "right" }}>
          Seu saldo no fim do mês será <Price>{formattedFutureBalance}</Price>
        </p>
      </BalanceArea>
      <AccountSummary>
        <EntryLabel>
          Receitas <IncomePrice>+{formattedMonthIncomes}</IncomePrice>
        </EntryLabel>
        <EntryLabel style={{ textAlign: "right" }}>
          Despesas <ExpensePrice>-{formattedMonthExpenses}</ExpensePrice>
        </EntryLabel>
      </AccountSummary>
      <Actions>
        <CreateIncomeButton onClick={goToIncomeCreation}>
          Criar receita
        </CreateIncomeButton>
        <CreateExpenseButton onClick={goToExpenseCreation}>
          Criar despesa
        </CreateExpenseButton>
      </Actions>

      <EntryList
        entries={entries.slice(0, 5)}
        onEntryClick={(entry) =>
          navigate("/entry", { state: { entry, type: "edit" } })
        }
      />
    </main>
  )
}

export default HomeScreen
