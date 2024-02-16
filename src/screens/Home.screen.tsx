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
  color: ${({ theme }) => theme.colors.income};
`
const ExpensePrice = styled(Price)`
  color: ${({ theme }) => theme.colors.expense};
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
  background: ${({ theme }) => theme.colors.expense};
`

const CreateIncomeButton = styled(Button)`
  background: ${({ theme }) => theme.colors.income};
`

const EntryLabel = styled.span`
  font-size: 0.8rem;
`

const AccountSummary = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
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
      <AccountSummary>
        <EntryLabel>
          Atual <Price>{formattedCurrentBalance}</Price>
        </EntryLabel>
        <EntryLabel>
          Receitas <IncomePrice>{formattedMonthIncomes}</IncomePrice>
        </EntryLabel>
        <EntryLabel>
          Despesas <ExpensePrice>{formattedMonthExpenses}</ExpensePrice>
        </EntryLabel>
        <EntryLabel>
          Fim do Mês <Price>{formattedFutureBalance}</Price>
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
