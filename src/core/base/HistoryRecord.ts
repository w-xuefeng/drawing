import BaseDrawTools from './BaseDrawTools'
export interface IHistoryRecordList<T extends BaseDrawTools = BaseDrawTools> {
  tools: T
  data: string
}
export default class HistoryRecord {
  public list: Map<number, IHistoryRecordList> = new Map()
  public index: number = 0

  constructor() {}

  add(tools: BaseDrawTools, data: string) {
    this.index = this.list.size + 1
    this.list.set(this.index, { tools, data })
  }

  undo(i?: number) {
    const index = i || this.index - 1
    if (index <= 0) return
    return this.recoverRecord(index)
  }

  redo() {
    const index = this.index + 1
    if (index > this.list.size) return
    return this.recoverRecord(index)
  }

  recoverRecord(index: number) {
    this.index = index
    return this.list.get(this.index)
  }
}
