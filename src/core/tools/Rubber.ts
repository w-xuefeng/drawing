import BaseDrawTools from '../base/BaseDrawTools'
import HistoryRecord from '../base/HistoryRecord'

export default class Rubber extends BaseDrawTools {
  constructor(
    canvas: HTMLCanvasElement,
    canvasBackup: HTMLCanvasElement,
    historyRecord: HistoryRecord,
    key?: string
  ) {
    super(
      '橡皮',
      'border_style',
      canvas,
      canvasBackup,
      historyRecord,
      `pointer`,
      key,
      true
    )
  }
  draw() {
    const noop = () => {}
    return {
      onmousedown: (e: MouseEvent) => {
        const { clientX: x, clientY: y } = this.getClientPostion(e)
        this.ctx.clearRect(
          x - this.size * 10,
          y - this.size * 10,
          this.size * 20,
          this.size * 20
        )
      },
      onmousemove: (e: MouseEvent) => {
        const { clientX: x, clientY: y } = this.getClientPostion(e)
        this.ctxBackup.setLineDash([0, 0])
        this.ctxBackup.lineWidth = 1
        this.clearContext()
        this.ctxBackup.beginPath()
        this.ctxBackup.strokeStyle = '#000000'
        this.ctxBackup.moveTo(x - this.size * 10, y - this.size * 10)
        this.ctxBackup.lineTo(x + this.size * 10, y - this.size * 10)
        this.ctxBackup.lineTo(x + this.size * 10, y + this.size * 10)
        this.ctxBackup.lineTo(x - this.size * 10, y + this.size * 10)
        this.ctxBackup.lineTo(x - this.size * 10, y - this.size * 10)
        this.ctxBackup.stroke()
        this.canDraw &&
          this.ctx.clearRect(
            x - this.size * 10,
            y - this.size * 10,
            this.size * 20,
            this.size * 20
          )
        this.ctxBackup.setLineDash([this.dashedLineLong, this.dashedInterval])
      },
      onmouseup: noop,
      onmouseout: () => {
        this.clearContext()
      },
    }
  }
}
