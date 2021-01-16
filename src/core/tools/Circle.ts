import BaseDrawTools from '../base/BaseDrawTools'
import HistoryRecord from '../base/HistoryRecord'

export default class Circle extends BaseDrawTools {
  constructor(
    canvas: HTMLCanvasElement,
    canvasBackup: HTMLCanvasElement,
    historyRecord: HistoryRecord,
    key?: string
  ) {
    super(
      '圆形',
      'panorama_fish_eye',
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
        this.clearContext()
        const { clientX: x, clientY: y } = this.getClientPostion(e)
        if (this.canDraw && options) {
          const { startX, startY } = options
          this.ctxBackup.beginPath()
          let radii = Math.sqrt(
            (startX - x) * (startX - x) + (startY - y) * (startY - y)
          )
          this.ctxBackup.arc(startX, startY, radii, 0, Math.PI * 2, false)
          this.ctxBackup.stroke()
        } else {
          this.ctxBackup.beginPath()
          this.ctxBackup.arc(x, y, 20, 0, Math.PI * 2, false)
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
