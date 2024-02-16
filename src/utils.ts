import format from "date-fns/format"
import ptBR from "date-fns/locale/pt-BR"

const brlCurrencyFormatter = Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  currency: "BRL",
  style: "currency",
})

export const formatToBRLCurrency = (value: number) =>
  brlCurrencyFormatter.format(value)

export const formatDate = (date: Date) =>
  format(date, `d 'de' LLLL 'de' yyyy`, {
    locale: ptBR,
  })
