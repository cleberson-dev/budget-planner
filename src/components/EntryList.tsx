import styled from "styled-components"
import useStore from "../store"
import Entry from "./Entry"

type EntryListProps = {
  entries: Entry[]
  onEntryClick?: (entry: Entry) => void
}

const Container = styled.ul`
  padding: 0;
`

const EntryList = ({ entries, onEntryClick }: EntryListProps): JSX.Element => {
  const accounts = useStore((state) => state.accounts)

  return (
    <Container>
      {entries.map((entry) => (
        <Entry
          key={entry.id}
          value={entry.value}
          description={entry.description}
          creationDate={entry.createdAt}
          accountName={accounts.find((acc) => acc.id === entry.accountId)!.name}
          onEntryClick={() => onEntryClick?.(entry)}
        />
      ))}
    </Container>
  )
}

export default EntryList
