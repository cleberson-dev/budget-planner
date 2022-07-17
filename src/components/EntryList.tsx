import styled from "styled-components"
import ptBR from "date-fns/locale/pt-BR"
import format from "date-fns/format"

type EntryListProps = {
  list: Entry[]
}

function getColorByEntryType(entryType: EntryTypes) {
  return {
    INCOME: "#2b9348",
    EXPENSE: "#ef233c",
  }[entryType]
}

const Container = styled.ul`
  padding: 0;
`

const EntryItem = styled.li`
  list-style: none;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  :hover {
    background: rgba(255, 255, 255, 0.12);
  }

  :not(:last-child) {
    margin-bottom: 1rem;
  }
`

const EntryBullet = styled.div<{ type: EntryTypes }>`
  content: "";
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${({ type }) => getColorByEntryType(type)};
  opacity: 0.6;
  margin-right: 0.8rem;
`

const Description = styled.p`
  margin: 0;
`

const Details = styled.small`
  color: #cbcbcb;
`

const Main = styled.div`
  flex-grow: 1;
`

const Price = styled.p<{ type: EntryTypes }>`
  font-weight: 600;
  font-size: 1rem;
  color: ${({ type }) => getColorByEntryType(type)};
`

const EntryList = ({ list }: EntryListProps): JSX.Element => {
  return (
    <Container>
      {list.map((entry) => (
        <EntryItem key={entry.id}>
          <EntryBullet type={entry.type} />
          <Main>
            <Description>{entry.description}</Description>
            <Details>
              {`${format(entry.createdAt, `d 'de' LLLL 'de' yyyy`, {
                locale: ptBR,
              })} - Carteira`}
            </Details>
          </Main>
          <Price type={entry.type}>
            {{ INCOME: "+", EXPENSE: "-" }[entry.type]} R$
            {entry.value.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Price>
        </EntryItem>
      ))}
    </Container>
  )
}

export default EntryList