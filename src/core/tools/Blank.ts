import BaseDrawTools from '../base/BaseDrawTools'
import HistoryRecord from '../base/HistoryRecord'

export default class Pencil extends BaseDrawTools {
  constructor(
    canvas: HTMLCanvasElement,
    canvasBackup: HTMLCanvasElement,
    historyRecord: HistoryRecord,
    key?: string
  ) {
    super('白板', 'mode_edit', canvas, canvasBackup, historyRecord, 'auto', key)
  }
  draw() {
    const noop = () => {}
    return {
      onmousedown: (_: MouseEvent) => {
        this.ctxBackup.beginPath()
      },
      onmousemove: (e: MouseEvent) => {
        if (this.canDraw) {
          const { clientX: x, clientY: y } = this.getClientPostion(e)
          this.ctxBackup.lineTo(x, y)
          this.ctxBackup.stroke()
        }
      },
      onmouseup: noop,
      onmouseout: (_: MouseEvent) => {
        this.clearContext()
      },
    }
  }
}
