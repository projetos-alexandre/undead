import axios from 'axios'
import * as cheerio from 'cheerio'

type Row = Record<string, string>

export class IndicatorService {
  async update() {
    const url = this.getUrl()
    const header = this.getHeader()
    const columns = this.getAcoesColumns()

    const response = await axios.get(url, { headers: header })
    const html = response.data as string

    const $ = cheerio.load(html)
    const table = $('table').first()

    const headers: string[] = []
    table.find('thead tr th').each((_, el) => {
      headers.push($(el).text().trim())
    })

    const rows: Row[] = []

    table.find('tbody tr').each((_, row) => {
      const rowData: Row = {}

      $(row)
        .find('td')
        .each((i, col) => {
          const originalKey = headers[i]
          const mappedKey = columns?.[originalKey] ?? originalKey
          // console.log($(col).text().trim())
          console.log(mappedKey)
          rowData[mappedKey] = $(col).text().trim()
        })

      rows.push(rowData)
    })

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
      'Papel': 'papel',
      'Cotação': 'cotacao',
      'P/L': 'pl',
      'P/VP': 'pvp',
      'PSR': 'psr',
      'Div.Yield': 'dividend_yield',
      'P/Ativo': 'p_ativo',
      'P/Cap.Giro': 'p_cap_giro',
      'P/EBIT': 'p_ebit',
      'P/Ativ Circ.Liq': 'p_ativ_circ_liqs',
      'EV/EBIT': 'ev_ebit',
      'EV/EBITDA': 'ev_ebitda',
      'Mrg Ebit': 'mrg_ebit',
      'Mrg. Líq.': 'mrg_liq',
      'ROIC': 'roic',
      'ROE': 'roe',
      'Liq. Corr.': 'liq_corr',
      'Liq.2meses': 'liq_2_meses',
      'Patrim. Líq': 'patrim_liq',
      'Dív.Brut/ Patrim.': 'div_brut_patrim',
      'Cresc. Rec.5a': 'cresc_rec_5_a',
    }
  }
}
