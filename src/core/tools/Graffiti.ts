import BaseDrawTools from '../base/BaseDrawTools'
import HistoryRecord from '../base/HistoryRecord'

export default class Graffiti extends BaseDrawTools {
  constructor(
    canvas: HTMLCanvasElement,
    canvasBackup: HTMLCanvasElement,
    historyRecord: HistoryRecord,
    key?: string
  ) {
    super(
      '涂鸦',
      'brush',
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
      onmousemove: (e: MouseEvent) => {
        const { clientX: x, clientY: y } = this.getClientPostion(e)
        if (this.canDraw) {
          this.ctxBackup.beginPath()
          this.ctxBackup.strokeStyle = this.color
          this.ctxBackup.fillStyle = this.color
          this.ctxBackup.arc(x, y, this.size * 10, 0, Math.PI * 2, false)
          this.ctxBackup.fill()
          this.ctxBackup.stroke()
        } else {
          this.clearContext()
          this.ctxBackup.beginPath()
          this.ctxBackup.fillStyle = this.color
          this.ctxBackup.arc(x, y, this.size * 10, 0, Math.PI * 2, false)
          this.ctxBackup.fill()
          this.ctxBackup.stroke()
        }
      },
      onmouseup: noop,
      onmouseout: noop,
    }
  }
}
