import BaseDrawTools from './BaseDrawTools';
export interface IHistoryRecordList<T extends BaseDrawTools = BaseDrawTools>{
  tools: T,
  data: string;
}
export default class HistoryRecord {
  public list: Map<number, IHistoryRecordList> = new Map()

  add(tools: BaseDrawTools, data: string) {
    this.list.set(this.list.size + 1, { tools, data })
  }

  remove(i: number) {
    if (this.list.has(i)) {
      this.list.delete(i)
    }
  }
}