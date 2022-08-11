const brlCurrencyFormatter = Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  currency: "BRL",
  style: "currency",
})

export const formatToBRLCurrency = (value: number) =>
  brlCurrencyFormatter.format(value)
