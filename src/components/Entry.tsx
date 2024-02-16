import styled from "styled-components"
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline"
import { formatDate, formatToBRLCurrency, getEntryTypeByValue } from "../utils"

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
  background: ${({ theme, type }) => theme.colors[type.toLowerCase()]};
  opacity: 0.6;
  margin-right: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
  color: ${({ theme, type }) => theme.colors[type.toLowerCase()]};
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
  const type: EntryTypes = getEntryTypeByValue(value)
  const detailsText = `${formatDate(creationDate)} - ${accountName}`

  const Icon = type === "INCOME" ? ArrowDownIcon : ArrowUpIcon

  return (
    <EntryItem onClick={onEntryClick}>
      <EntryBullet type={type}>
        <Icon width={12} height={12} />
      </EntryBullet>
      <Main>
        <Description>{description}</Description>
        <Details>{detailsText}</Details>
      </Main>
      <Price type={type}>{formatToBRLCurrency(value)}</Price>
    </EntryItem>
  )
}

export default Entry
