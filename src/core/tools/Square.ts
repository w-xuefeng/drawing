import BaseDrawTools from '../base/BaseDrawTools'
import HistoryRecord from '../base/HistoryRecord'

export default class Square extends BaseDrawTools {
  constructor(
    canvas: HTMLCanvasElement,
    canvasBackup: HTMLCanvasElement,
    historyRecord: HistoryRecord,
    key?: string
  ) {
    super(
      '矩形',
      'crop_square',
      canvas,
      canvasBackup,
      historyRecord,
      'crosshair',
      key
    )
  }
  draw() {
    const noop = () => {}
    return {
      onmousedown: noop,
      onmousemove: (
        e: MouseEvent,
        options?: { startX: number; startY: number }
      ) => {
        if (this.canDraw && options) {
          const { startX, startY } = options
          const { clientX: x, clientY: y } = this.getClientPostion(e)
          this.ctxBackup.beginPath()
          this.clearContext()
          this.ctxBackup.moveTo(startX, startY)
          this.ctxBackup.lineTo(x, startY)
          this.ctxBackup.lineTo(x, y)
          this.ctxBackup.lineTo(startX, y)
          this.ctxBackup.lineTo(startX, startY)
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
