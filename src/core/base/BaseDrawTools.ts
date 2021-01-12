import HistoryRecord from './HistoryRecord'

export default abstract class BaseDrawTools {
  /**
   * show property
   */
  public name: string
  public icon: string
  public cursor?: string
  public key?: string
  public active: boolean
  public rubber: boolean

  /**
   * draw property
   */
  public canvas: HTMLCanvasElement
  public canvasBackup: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  public ctxBackup: CanvasRenderingContext2D
  public color: string = '#000'
  public size: number = 1
  public dashedLineLong: number = 0
  public dashedInterval: number = 0
  public canDraw: boolean = false

  /**utils property*/
  public historyRecord: HistoryRecord

  constructor(
    name: string,
    icon: string,
    canvas: HTMLCanvasElement,
    canvasBackup: HTMLCanvasElement,
    historyRecord: HistoryRecord,
    cursor?: string,
    key?: string,
    rubber: boolean = false,
    active: boolean = false
  ) {
    this.name = name
    this.icon = icon
    this.canvas = canvas
    this.canvasBackup = canvasBackup
    this.ctx = this.canvas.getContext('2d')!
    this.ctxBackup = this.canvasBackup.getContext('2d')!
    this.historyRecord = historyRecord
    this.cursor = cursor
    this.key = key
    this.rubber = rubber
    this.active = active
  }

  clearContext(clearAll?: boolean) {
    if (clearAll) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    this.ctxBackup.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  getClientPostion(e: MouseEvent) {
    return {
      clientX:
        e.clientX -
        (this.canvas.parentElement ? this.canvas.parentElement.offsetLeft : 0),
      clientY:
        e.clientY -
        (this.canvas.parentElement ? this.canvas.parentElement.offsetTop : 0),
    }
  }

  enable() {
    this.canvasBackup.style.zIndex = '1'
    this.canDraw = false
    this.active = true

    const mousedown = (e: MouseEvent) => {
      this.ctx.strokeStyle = this.color
      this.ctxBackup.strokeStyle = this.color
      this.ctxBackup.lineWidth = this.size
      e = e || window.event
      const { clientX, clientY } = this.getClientPostion(e)
      this.ctxBackup.moveTo(clientX, clientY)
      this.canDraw = true
      this.draw().onmousedown(e)
    }

    const mouseup = (e: MouseEvent) => {
      e = e || window.event
      this.canDraw = false
      this.draw().onmouseup(e)
      const image = new Image()
      if (!this.rubber) {
        image.src = this.canvasBackup.toDataURL('image/png', 1)
        image.onload = () => {
          this.ctx.drawImage(
            image,
            0,
            0,
            image.width,
            image.height,
            0,
            0,
            this.canvas.width,
            this.canvas.height
          )
          this.clearContext()
          this.historyRecord.add(this, this.canvas.toDataURL('image/png', 1))
        }
        const { clientX: x, clientY: y } = this.getClientPostion(e)
        this.ctx.beginPath()
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(x + 2, y + 2)
        this.ctx.stroke()
      }
    }

    const mousemove = (e: MouseEvent) => {
      e = e || window.event
      this.ctxBackup.setLineDash([this.dashedLineLong, this.dashedInterval])
      this.draw().onmousemove(e)
    }

    const mouseout = (e: MouseEvent) => {
      this.clearContext()
      this.draw().onmouseout(e)
    }

    this.canvasBackup.onmousedown = mousedown
    this.canvasBackup.onmousemove = mousemove
    this.canvasBackup.onmouseup = mouseup
    this.canvasBackup.onmouseout = mouseout
  }

  disable() {
    this.active = false
  }

  abstract draw(): {
    onmousedown: (e: MouseEvent) => void
    onmousemove: (e: MouseEvent) => void
    onmouseup: (e: MouseEvent) => void
    onmouseout: (e: MouseEvent) => void
  }
}
