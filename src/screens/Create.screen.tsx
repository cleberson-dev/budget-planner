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

const CreateScreen = (): JSX.Element => {
  const location = useLocation()
  const navigate = useNavigate()
  const entryType = (location.state as any).entryType as string
  const { register, handleSubmit } = useForm()
  const accounts = useStore((state) => state.accounts)
  const addEntry = useStore((state) => state.addEntry)

  const onSubmit: Parameters<typeof handleSubmit>[0] = (data: any) => {
    console.log({ formData: data })

    addEntry({
      accountId: data.accountId,
      description: data.description,
      value: Number(data.value),
      type: entryType.toUpperCase() as EntryTypes,
      createdAt: new Date(data.createdAt),
    })

    navigate("/")
  }

  return (
    <Main>
      <Header>
        <h1>Create a new {entryType.toLowerCase()}</h1>
        <Link to="/">Back</Link>
      </Header>

      <Form id="createEntryForm" onSubmit={handleSubmit(onSubmit)}>
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
            <Input as="select" {...register("accountId")}>
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

      <Button type="submit" form="createEntryForm">
        Create
      </Button>
    </Main>
  )
}

export default CreateScreen
