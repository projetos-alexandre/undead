import fs from 'fs'

export class IndicatorService {
  async logs() {
    const logs = await fs.promises.readFile('./coletor.log', 'utf-8')
    return logs
  }
}
