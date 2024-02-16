import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import useStore from "../store"

type LocationState = {
  entry: Entry
  entryType: string
  type: string
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-bottom: 2rem;
  box-sizing: border-box;
`

const Form = styled.form`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`

const Label = styled.label`
  display: block;
  font-size: 1rem;
  margin-bottom: 5px;
`

const Input = styled.input<{ fullWidth?: boolean }>`
  display: block;

  background: rgba(0, 0, 0, 0.2);
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 1rem;
  box-sizing: border-box;
  font-family: "Albert Sans", sans-serif;
  ${(props) => (props.fullWidth ? "width: 100%;" : "min-width: 10rem;")}

  :focus {
    outline: 0;
    border-color: rgba(0, 0, 0, 0.8);
  }
`

const FormGroup = styled.div`
  margin-bottom: 1rem;
`

const Button = styled.button`
  color: white;
  background: blueviolet;
  font-weight: 600;
  font-family: "Albert Sans", sans-serif;
  border: 0;
  border-radius: 5px;
  padding: 1rem;
  cursor: pointer;
  width: 100%;

  a {
    color: inherit;
    text-decoration: none;
  }

  :hover {
    opacity: 0.8;
  }

  :not(:last-child) {
    margin-bottom: 8px;
  }
`

const UpdateButton = styled(Button)`
  background: orange;
`

const RemoveButton = styled(Button)`
  background: #ef233c;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  text-decoration: none;
  color: white;

  img {
    width: 24px;
    margin-right: 4px;
  }
`

const EntryScreen = (): JSX.Element => {
  const { accounts, addEntry, removeEntry, updateEntry } = useStore()
  const location = useLocation()
  const navigate = useNavigate()

  const { entry, entryType, type } = location.state as LocationState

  const valueInputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    valueInputRef.current?.focus()
  }, [])

  const isNew = type === "new"

  const { register, getValues } = useForm({
    defaultValues: {
      value: isNew ? "" : `${Math.abs(entry.value)}`,
      description: isNew ? "" : entry.description,
      accountId: isNew ? "" : entry.accountId,
      createdAt: (isNew ? new Date() : entry.createdAt)
        .toISOString()
        .split("T")[0],
      paid: isNew ? true : entry.paid,
    },
  })

  const onCreateEntry = () => {
    const newEntry = getValues()
    addEntry({
      accountId: newEntry.accountId,
      description: newEntry.description,
      value: Number(entryType === "INCOME" ? newEntry.value : -newEntry.value),
      createdAt: new Date(newEntry.createdAt),
      paid: newEntry.paid,
    })

    navigate("/")
  }

  const onUpdateEntry = () => {
    const changedEntry = getValues()
    updateEntry({
      id: entry.id,
      accountId: entry.accountId,
      value: Number(
        entry.value >= 0 ? changedEntry.value : -changedEntry.value
      ),
      createdAt: new Date(changedEntry.createdAt),
      description: changedEntry.description,
      paid: changedEntry.paid,
    })

    navigate("/")
  }

  const onRemoveEntry = () => {
    removeEntry({
      accountId: entry.accountId,
      entryId: entry.id,
    })
    navigate("/")
  }

  return (
    <Main>
      <Header>
        <BackLink to="/">
          <img src="/arrow-back.svg" alt="Back link icon" />
          Voltar
        </BackLink>
      </Header>

      <Form id="entryForm">
        <FormGroup>
          <Label>Digite o valor desejado</Label>
          <Input
            {...register("value")}
            type="number"
            min="0"
            placeholder="999.99"
            fullWidth
            style={{ fontSize: "1.75rem" }}
            ref={valueInputRef}
          />
        </FormGroup>

        <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
          <FormGroup>
            <Label>Conta</Label>
            <Input {...register("accountId")} disabled={!isNew} as="select">
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup style={{ marginLeft: "2rem" }}>
            <Label>Data</Label>
            <Input {...register("createdAt")} type="date" />
          </FormGroup>
        </div>

        <FormGroup>
          <Label>Descrição</Label>
          <Input {...register("description")} width="100%" fullWidth />
        </FormGroup>

        <div style={{ display: "flex" }}>
          <Input
            {...register("paid")}
            id="paid"
            type="checkbox"
            style={{ minWidth: "0" }}
          />
          <Label htmlFor="paid">Pago</Label>
        </div>
      </Form>

      {isNew ? (
        <Button onClick={onCreateEntry}>Create</Button>
      ) : (
        <>
          <UpdateButton onClick={onUpdateEntry}>Update</UpdateButton>
          <RemoveButton onClick={onRemoveEntry}>Remove</RemoveButton>
        </>
      )}
    </Main>
  )
}

export default EntryScreen
