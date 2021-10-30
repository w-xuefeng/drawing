export default class Record {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
  recorder?: MediaRecorder
  datas: Blob[] = []
  recording: boolean = false
  frameRequestRate = 60
  onRecordStart: () => void = () => { }
  onRecordEnd: (url: string) => void = window.open

  constructor(canvas: HTMLCanvasElement, frameRequestRate: number = 60) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.frameRequestRate = frameRequestRate
  }

  initializeRecorder() {
    this.datas = []
    this.recorder = new MediaRecorder(
      this.canvas.captureStream(this.frameRequestRate),
      { mimeType: 'video/webm' }
    );
    this.registerOnData(this.recorder, this.datas)
    this.registerOnStop(this.recorder, this.datas)
  }

  registerOnData(recorder: MediaRecorder, datas: Blob[]) {
    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size) {
        datas.push(event.data);
      }
    };
  }

  registerOnStop(recorder: MediaRecorder, datas: Blob[]) {
    recorder.onstop = () => {
      const url = URL.createObjectURL(new Blob(datas, { type: 'video/webm' }));
      this.onRecordEnd(url)
    };
  }

  enWhiteCanvasBackground() {
    this.noninvasiveRender({
      undergroundRender: (ctx) => {
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      }
    })
  }

  startRecord(whiteBackground = false) {
    this.initializeRecorder()
    if (this.recorder && typeof this.recorder.start === 'function' && !this.recording) {
      this.recording = true
      this.onRecordStart()
      whiteBackground && this.enWhiteCanvasBackground()
      this.recorder.start()
    }
  }

  endRecord() {
    if (this.recorder && typeof this.recorder.stop === 'function' && this.recording) {
      this.recorder.stop();
      this.recording = false
    }
  }

  noninvasiveRender(renderOptions: {
    undergroundRender?: (ctx: CanvasRenderingContext2D) => void,
    coverRender?: (ctx: CanvasRenderingContext2D) => void
    onlyCover?: boolean
  }) {
    const { undergroundRender, coverRender, onlyCover = false } = renderOptions || {}
    if (this.ctx) {
      const backupFillStyle = this.ctx.fillStyle
      if (!onlyCover) {
        const backupPrevContent = this.canvas.toDataURL('image/png', 1)
        typeof undergroundRender === 'function' && undergroundRender(this.ctx)
        this.drawImage(backupPrevContent, {
          sx: 0,
          sy: 0,
          dx: 0,
          dy: 0,
        })
      }
      typeof coverRender === 'function' && coverRender(this.ctx)
      this.ctx.fillStyle = backupFillStyle
    }
  }

  drawImage(
    imageSrc: string,
    options: {
      sx: number
      sy: number
      dx: number
      dy: number
    }
  ) {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      this.ctx && this.ctx.drawImage(
        img,
        options.sx,
        options.sy,
        img.width,
        img.height,
        options.dx,
        options.dy,
        this.canvas.width,
        this.canvas.height
      )
    }
    img.src = imageSrc
  }
}
