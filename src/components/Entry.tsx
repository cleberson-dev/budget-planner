import styled from "styled-components"
import { formatDate, formatToBRLCurrency } from "../utils"

function getColorByEntryType(entryType: EntryTypes) {
  return {
    INCOME: "#2b9348",
    EXPENSE: "#ef233c",
  }[entryType]
}

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

type Props = {
  value: number
  description: string
  creationDate: Date
  accountName: string
  onEntryClick?: () => void
}

const Entry = ({
  value,
  description,
  creationDate,
  accountName,
  onEntryClick,
}: Props) => {
  const type: EntryTypes = value >= 0 ? "INCOME" : "EXPENSE"
  const detailsText = `${formatDate(creationDate)} - ${accountName}`

  return (
    <EntryItem onClick={onEntryClick}>
      <EntryBullet type={type} />
      <Main>
        <Description>{description}</Description>
        <Details>{detailsText}</Details>
      </Main>
      <Price type={type}>{formatToBRLCurrency(value)}</Price>
    </EntryItem>
  )
}

export default Entry
