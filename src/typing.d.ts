import { CSSProperties } from 'vue'
import type BaseDrawTools from './core/base/BaseDrawTools'
import type HistoryRecord from './core/base/HistoryRecord'

declare interface IDrawCanvas {
  canvas: HTMLCanvasElement | null
  canvasBackup: HTMLCanvasElement | null
  historyRecord: HistoryRecord | null
  style: CSSProperties
}

declare interface IDarwToolsBarState {
  currentTools: BaseDrawTools | null
  tools: BaseDrawTools[]
}
