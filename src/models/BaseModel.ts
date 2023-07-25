import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb'
import { db, TableName, TableKey } from '../db/db'

export abstract class BaseModel<T> {
  async load() {
    const Key = { [TableKey]: this.key }
    const getCommand = new GetCommand({ TableName, Key })
    const cached = await db.send(getCommand)
    if (cached?.Item?.data) {
      this.process(cached?.Item?.data as T)
    } else {
      this.process(await this.fetch())
    }
  }

  async save() {
    const data = this.saveData()
    const Item = {
      [TableKey]: this.key,
      data
    }
    const putCommand = new PutCommand({ TableName, Item })
    await db.send(putCommand)
  }

  abstract key: string
  abstract fetch(): Promise<T>
  abstract process(data: T): Promise<void>
  abstract saveData(): T
}