import BaseDrawTools from './BaseDrawTools';
export interface IHistoryRecordList<T extends BaseDrawTools = BaseDrawTools>{
  tools: T,
  data: string;
}
export default class HistoryRecord {
  public list: Map<number, IHistoryRecordList> = new Map()
  public index: number = 0

  constructor() {
  }

  add(tools: BaseDrawTools, data: string) {
    this.index = this.list.size + 1
    this.list.set(this.index, { tools, data })
  }

  undo(i?: number) {
    this.index = i || this.index - 1
    return this.list.get(this.index)
  }

  redo() {
    this.index++
    return this.list.get(this.index)
  }
}