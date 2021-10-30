export default class Record {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
  stream: MediaStream
  recorder: MediaRecorder
  datas: Blob[]
  recording: boolean = false

  onRecordStart: () => void = () => { }

  onRecordEnd: (url: string) => void = window.open

  constructor(canvas: HTMLCanvasElement, frameRequestRate: number = 60) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.stream = canvas.captureStream(frameRequestRate);
    this.recorder = new MediaRecorder(this.stream, { mimeType: 'video/webm' });
    this.datas = []
    this.registerOnData()
    this.registerOnStop()
  }

  registerOnData() {
    this.recorder.ondataavailable = (event) => {
      if (event.data && event.data.size) {
        this.datas.push(event.data);
      }
    };
  }

  registerOnStop() {
    this.recorder.onstop = () => {
      const url = URL.createObjectURL(new Blob(this.datas, { type: 'video/webm' }));
      this.onRecordEnd(url)
    };
  }

  enWhiteCanvasBackgroound() {
    if (this.ctx) {
      const backupFillStyle = this.ctx.fillStyle
      const backuoPrevContent = this.canvas.toDataURL('image/png', 1)
      const image = new Image()
      image.src = backuoPrevContent
      this.ctx.fillStyle = '#FFFFFF'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
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
      this.ctx.fillStyle = backupFillStyle
    }
  }

  startRecord(whiteBackground = false) {
    if (this.recorder && typeof this.recorder.start === 'function' && !this.recording) {
      this.recording = true
      this.onRecordStart()
      whiteBackground && this.enWhiteCanvasBackgroound()
      this.recorder.start();
    }
  }

  endRecord() {
    if (this.recorder && typeof this.recorder.stop === 'function' && this.recording) {
      this.recorder.stop();
      this.recording = false
    }
  }
}
