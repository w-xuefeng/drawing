import BaseDrawTools from '../base/BaseDrawTools'
import HistoryRecord from '../base/HistoryRecord'

export default class Pencil extends BaseDrawTools {
  constructor(
    canvas: HTMLCanvasElement,
    canvasBackup: HTMLCanvasElement,
    historyRecord: HistoryRecord,
    key?: string
  ) {
    super(
      '画笔',
      'mode_edit',
      canvas,
      canvasBackup,
      historyRecord,
      `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAZ0lEQVR4AdXOrQ2AMBRF4bMc/zOUOSrYoYI5cQQwpAieQDW3qQBO7Xebxx8bWAk5/CASmRHzRHtB+d0Bkw0W5ZiT0SYbFcl6u/2eeJHbxIHOhWO6Er6/y9syXpMul5PLefAGKZ1/rwtTimwbWLpiCgAAAABJRU5ErkJggg==') 3 24,  auto`,
      key
    )
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
      onmouseout: noop,
    }
  }
}
