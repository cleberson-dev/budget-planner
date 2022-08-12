import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import useStore from "../store"

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
  margin-top: 1rem;
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
  background: purple;
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
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const EntryScreen = (): JSX.Element => {
  const location = useLocation()
  const navigate = useNavigate()
  const entry = (location.state as any).entry as Entry
  const entryType = (location.state as any).entryType as string

  const type = (location.state as any).type as string
  const isNew = type === "new"

  const { register, getValues } = useForm({
    defaultValues: {
      value: isNew ? "" : `${entry.value}`,
      description: isNew ? "" : entry.description,
      accountId: isNew ? "" : entry.accountId,
      createdAt: isNew ? "" : entry.createdAt.toISOString().split("T")[0],
    },
  })
  const accounts = useStore((state) => state.accounts)
  const addEntry = useStore((state) => state.addEntry)
  const removeEntry = useStore((state) => state.removeEntry)
  const updateEntry = useStore((state) => state.updateEntry)

  const onCreateEntry = () => {
    const newEntry = getValues()
    addEntry({
      accountId: newEntry.accountId,
      description: newEntry.description,
      value: Number(newEntry.value),
      type: entryType.toUpperCase() as EntryTypes,
      createdAt: new Date(newEntry.createdAt),
    })

    navigate("/")
  }

  const onUpdateEntry = () => {
    const changedEntry = getValues()
    updateEntry({
      id: entry.id,
      type: entry.type,
      accountId: entry.accountId,
      value: Number(changedEntry.value),
      createdAt: new Date(changedEntry.createdAt),
      description: changedEntry.description,
    })

    navigate("/")
  }

  const onRemoveEntry = () => {
    removeEntry(entry.accountId, entry.id)
    navigate("/")
  }

  return (
    <Main>
      <Header>
        <Link to="/">Back</Link>
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
          />
        </FormGroup>

        <div style={{ display: "flex", width: "100%" }}>
          <FormGroup>
            <Label>Conta</Label>
            <Input disabled as="select" {...register("accountId")}>
              {accounts.map((acc) => (
                <option value={acc.id}>{acc.name}</option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup style={{ marginLeft: "2rem" }}>
            <Label>Data</Label>
            <Input type="date" {...register("createdAt")} />
          </FormGroup>
        </div>

        <FormGroup>
          <Label>Descrição</Label>
          <Input {...register("description")} width="100%" fullWidth />
        </FormGroup>
      </Form>

      {isNew ? (
        <Button onClick={onCreateEntry}>Create</Button>
      ) : (
        <>
          <Button onClick={onUpdateEntry}>Update</Button>
          <Button onClick={onRemoveEntry}>Remove</Button>
        </>
      )}
    </Main>
  )
}

export default EntryScreen
