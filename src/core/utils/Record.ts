export default class Record {
  canvas: HTMLCanvasElement
  canvasBackup: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
  ctxBackup: CanvasRenderingContext2D | null
  recorder?: MediaRecorder
  recorderBackup?: MediaRecorder
  datas: Blob[] = []
  datasBackup: Blob[] = []
  recording: boolean = false
  frameRequestRate = 60
  onRecordStart: () => void = () => { }
  onRecordEnd: (url: string, urlBackup: string) => void = window.open
  stopStatus = {
    primary: false,
    backup: false
  }
  hasOnAllStoped = false

  constructor(canvas: HTMLCanvasElement, canvasBackup: HTMLCanvasElement, frameRequestRate: number = 60) {
    this.canvas = canvas
    this.canvasBackup = canvasBackup
    this.ctx = canvas.getContext('2d')
    this.ctxBackup = canvasBackup.getContext('2d')
    this.frameRequestRate = frameRequestRate
    this.stopStatus = new Proxy({ primary: false, backup: false }, {
      set: (target, prop: keyof typeof this.stopStatus, value) => {
        target[prop] = value
        if (target.backup && target.primary && !this.hasOnAllStoped) {
          this.onAllRecorderStop()
        }
        return true
      }
    })
  }

  initializeRecorder() {
    this.datas = []
    this.datasBackup = []
    this.recording = false
    this.hasOnAllStoped = false
    this.stopStatus.primary = false
    this.stopStatus.backup = false
    this.recorder = this.recorderFactory(this.canvas, this.datas, 'primary')
    this.recorderBackup = this.recorderFactory(this.canvasBackup, this.datasBackup, 'backup')
  }

  recorderFactory(canvas: HTMLCanvasElement, datas: Blob[], stopType: keyof typeof this.stopStatus) {
    const recorder = new MediaRecorder(
      canvas.captureStream(this.frameRequestRate),
      { mimeType: 'video/webm' }
    );
    this.registerOnData(recorder, datas)
    this.registerOnStop(recorder, stopType)
    return recorder
  }

  registerOnData(recorder: MediaRecorder, datas: Blob[]) {
    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size) {
        datas.push(event.data);
      }
    };
  }

  registerOnStop(recorder: MediaRecorder, stopType: keyof typeof this.stopStatus) {
    recorder.onstop = () => {
      this.stopStatus[stopType] = true
    };
  }

  onAllRecorderStop() {
    this.hasOnAllStoped = true
    this.recording = false
    const url = URL.createObjectURL(new Blob(this.datas, { type: 'video/webm' }));
    const urlBackup = URL.createObjectURL(new Blob(this.datasBackup, { type: 'video/webm' }));
    this.onRecordEnd(url, urlBackup)
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
    if (
      this.recorder &&
      this.recorderBackup &&
      typeof this.recorder.start === 'function' &&
      typeof this.recorderBackup.start === 'function' &&
      !this.recording
    ) {
      this.recording = true
      this.onRecordStart()
      whiteBackground && this.enWhiteCanvasBackground()
      this.recorderBackup.start()
      this.recorder.start()
    }
  }

  endRecord() {
    if (
      this.recorder &&
      this.recorderBackup &&
      typeof this.recorder.stop === 'function' &&
      typeof this.recorderBackup.stop === 'function' &&
      this.recording
    ) {
      this.recorderBackup.stop();
      this.recorder.stop();
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
