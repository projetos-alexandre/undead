import StockFundamentalIndicator from '#models/stock_fundamental_indicator'
import Ticker from '#models/ticker'
import axios from 'axios'
import * as cheerio from 'cheerio'

type Row = Record<string, string>
type StockFundamentalPayload = Partial<{
  tickerId: number
  price: number
  peRatio: number
  pbRatio: number
  psRatio: number
  dividendYield: number
  priceToAssets: number
  priceToWorkingCapital: number
  priceToEbit: number
  priceToCurrentAssets: number
  evToEbit: number
  evToEbitda: number
  ebitMargin: number
  netMargin: number
  roic: number
  roe: number
  currentRatio: number
  avgLiquidity2Months: number
  netEquity: number
  grossDebtToEquity: number
  revenueGrowth5y: number
}>

export class IndicatorService {
  async update() {
    const url = this.getUrl()
    const header = this.getHeader()
    const columns = this.getAcoesColumns()

    const response = await axios.get(url, { headers: header, responseType: 'arraybuffer' })
    const html = new TextDecoder('iso-8859-1').decode(response.data)

    const $ = cheerio.load(html)
    const table = $('table').first()

    const headers: string[] = []
    table.find('thead tr th').each((_, el) => {
      headers.push($(el).text().trim())
    })

    const rows: Row[] = []

    for (const row of table.find('tbody tr').toArray()) {
      const rowData: Row = {}
      let stockFundamentalIndicator = new StockFundamentalIndicator()
      let payload: StockFundamentalPayload = {}

      for (const [i, col] of $(row).find('td').toArray().entries()) {
        const originalKey = headers[i]
        if (originalKey === 'Papel') {
          let ticker = await Ticker.firstOrCreate(
            { symbol: $(col).text().trim() },
            { symbol: $(col).text().trim() }
          )
          payload.tickerId = ticker.id
        }
        let mappedKey = columns?.[originalKey] ?? originalKey

        if (mappedKey !== 'ticker') {
          payload[mappedKey as keyof StockFundamentalPayload] = this.parseValue(
            $(col).text().trim()
          )
        }

        rowData[mappedKey] = $(col).text().trim()
      }

      stockFundamentalIndicator.fill(payload)

      await stockFundamentalIndicator.save()

      rows.push(rowData)
    }

    return [{ response: rows, status: 'ok' }]
  }

  getUrl(): string {
    return 'https://www.fundamentus.com.br/resultado.php'
  }

  getHeader(): Record<string, string> {
    return {
      'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; rv:2.2) Gecko/20110201',
      'Accept': 'text/html, text/plain, text/css, text/sgml, */*;q=0.01',
      'Accept-Encoding': 'gzip, deflate',
    }
  }

  getAcoesColumns(): Record<string, string> {
    return {
      'Papel': 'ticker',
      'Cotação': 'price',
      'P/L': 'peRatio',
      'P/VP': 'pbRatio',
      'PSR': 'psRatio',
      'Div.Yield': 'dividendYield',
      'P/Ativo': 'priceToAssets',
      'P/Cap.Giro': 'priceToWorkingCapital',
      'P/EBIT': 'priceToEbit',
      'P/Ativ Circ.Liq': 'priceToCurrentAssets',
      'EV/EBIT': 'evToEbit',
      'EV/EBITDA': 'evToEbitda',
      'Mrg Ebit': 'ebitMargin',
      'Mrg. Líq.': 'netMargin',
      'ROIC': 'roic',
      'ROE': 'roe',
      'Liq. Corr.': 'currentRatio',
      'Liq.2meses': 'avgLiquidity2Months',
      'Patrim. Líq': 'netEquity',
      'Dív.Brut/ Patrim.': 'grossDebtToEquity',
      'Cresc. Rec.5a': 'revenueGrowth5y',
    }
  }

  parseValue(value: string): number | undefined {
    if (!value || value === '-') return undefined

    // Remove % e espaços
    let cleaned = value.replace('%', '').trim()

    // Remove pontos (separador de milhar) e troca vírgula por ponto (decimal)
    cleaned = cleaned.replace(/\./g, '').replace(',', '.')

    const parsed = Number(cleaned)

    // Verifica se o número é válido
    if (isNaN(parsed) || !isFinite(parsed)) return undefined

    // Para percentuais, divide por 100
    if (value.includes('%')) {
      return parsed / 100
    }

    return parsed
  }
}
