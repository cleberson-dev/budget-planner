import styled from "styled-components"

type EntryListProps = {
  list: Entry[]
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

  :not(:last-child) {
    margin-bottom: 1rem;
  }
`

const EntryBullet = styled.div<{ type: EntryTypes }>`
  content: "";
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${({ type }) =>
    ({ INCOME: "#2b9348", EXPENSE: "#ef233c" }[type])};
  opacity: 0.6;
  margin-right: 0.8rem;
`

const EntryList = ({ list }: EntryListProps): JSX.Element => {
  return (
    <Container>
      {list.map((entry) => (
        <EntryItem key={entry.id}>
          <EntryBullet type={entry.type} />
          <span>{entry.description}</span>
        </EntryItem>
      ))}
    </Container>
  )
}

export default EntryList
