<template>
  <div class="layout">
    <div class="header">      
      <div class="logo">
        <span>Drawing</span>
        </div>
      <div class="nav">
        <mu-flat-button v-for="tab in tabs" :key="tab.name" :label="tab.name" class="tab demo-flat-button" :icon="tab.icon" @click="tabfun(tab.fun)"  primary backgroundColor="#FFFFFF"/>
        <mu-flat-button :label="chooseColorBtn" class="tab demo-flat-button" icon="color_lens" @click="setColor()"  primary backgroundColor="#FFFFFF" :color="color.hex"/>
        <a href="javascript:void(0);" ref="download" download="picture.png" v-show="false"></a>        
      </div>
      <PhotoshopPicker v-model="color" v-if="ischoosecolor" style="position:absolute;z-index:10;top:56px;" @ok="setColor()" @cancel="falseColor()"/>
    </div>
    <div class="content">
      <div class="content-left">
        <div class="setterSize">
          <span>线条粗细:{{penSize}}</span>
          <mu-slider v-model="penSize" :step="1" :max="30"/>
          <span>虚线长度:{{lineType[0]}}</span>
          <mu-slider v-model="lineType[0]" :step="1" :max="100"/>
          <span>虚线间距:{{lineType[1]}}</span>
          <mu-slider v-model="lineType[1]" :step="1" :max="100"/> 
        </div>
        <mu-paper>
          <mu-menu v-for="tool in tools" :key="tool.name">
            <mu-menu-item :title="tool.name" :leftIcon="tool.icon" @click="drawType(tool)" :class="{'selected':tool.ischoose}"/>
          </mu-menu>
        </mu-paper>        
      </div>
      <div class="content-right">
        <div class="body" :style="{width:canvasSize.width + 'px',height: canvasSize.height + 'px' }">
            <canvas id="canvas" ref="canvas" :style="{cursor:curcursor}"></canvas>
            <canvas id="canvas_bak" ref="canvas_bak" :style="{cursor:curcursor}"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Photoshop } from 'vue-color'

export default {
  name: 'draw',
  data () {
    return {
      canvasSize: {
        width: window.screen.availWidth - 320,
        height: window.screen.availHeight * 0.75
      },
      canvas: this.$refs.canvas,
      canvasTop: 67,
      canvasLeft: 300,
      context: null,
      canvas_bak: this.$refs.canvas_bak,
      context_bak: null,
      ischoosecolor: false,
      toolsToggle: false,
      chooseColorBtn: '选择颜色',
      color: {
        hex: '#2196f3',
        hsl: {
          h: 205,
          s: 86,
          l: 0,
          a: 1
        },
        hsv: {
          h: 205,
          s: 86,
          v: 92,
          a: 1
        },
        rgba: {
          r: 33,
          g: 150,
          b: 243,
          a: 1
        },
        a: 1
      },      
      penSize: 1,      
      lineType: [0, 0],
      canDraw: false,
      curcursor: 'auto',
      cancelList: [],
      cancelIndex: 0,
      tools: [{
          name: '铅笔',
          icon: 'mode_edit',
          fun: 'pencil',
          ischoose: false,
        }, {
          name: '直线',
          icon: 'remove',
          fun: 'line',
          ischoose: false
        }, {
          name: '圆形',
          icon: 'panorama_fish_eye',
          fun: 'circle',
          ischoose: false
        }, {
          name: '矩形',
          icon: 'crop_square',
          fun: 'square',
          ischoose: false
        }, {
          name: '涂鸦',
          icon: 'brush',
          fun: 'handwriting',
          ischoose: false
        }, {
          name: '橡皮',
          icon: 'border_style',
          fun: 'rubber',
          ischoose: false
        }],
      tabs: [{
          name: '清除',
          icon: 'clear',
          fun: 'clear'
        }, {
          name: '保存',
          icon: 'system_update_alt',
          fun: 'save'
        }]
    }
  },
  methods: {
    initCanvas () {
      this.canvas =  document.getElementById("canvas")
      this.canvas.width = this.canvasSize.width
      this.canvas.height = this.canvasSize.height
      this.context = this.canvas.getContext('2d')
      this.canvas_bak =  document.getElementById("canvas_bak")
      this.canvas_bak.width = this.canvasSize.width
      this.canvas_bak.height = this.canvasSize.height
      this.context_bak = this.canvas_bak.getContext('2d')
    },
    setColor () {
      this.chooseColorBtn = this.ischoosecolor ? '选择颜色':'确认选择'
      this.ischoosecolor = this.ischoosecolor ? false : true
    },
    falseColor() {
      this.ischoosecolor = false
    },
    drawType (pen) {
      switch (pen.fun) {
        case 'pencil':
            this.curcursor = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAZ0lEQVR4AdXOrQ2AMBRF4bMc/zOUOSrYoYI5cQQwpAieQDW3qQBO7Xebxx8bWAk5/CASmRHzRHtB+d0Bkw0W5ZiT0SYbFcl6u/2eeJHbxIHOhWO6Er6/y9syXpMul5PLefAGKZ1/rwtTimwbWLpiCgAAAABJRU5ErkJggg==') 3 24,  auto"
            break
        case 'rubber':
        this.curcursor = 'pointer'
        break
        case 'circle':
        case 'square':
        case 'line':
        case 'handwriting':
        this.curcursor = 'crosshair'
        break          
        default:
        this.curcursor = 'auto'
          break;
      }  
      this.draw_graph(pen.fun)
      this.chooseImg(pen)
    },
    //选择功能按钮 修改样式
    chooseImg(obj){
        for (let i = 0; i < this.tools.length; i++) {
          this.tools[i].ischoose = false
        }
        obj.ischoose = true        
    },
    tabfun(fun) {
      if(fun === 'clear' ){
        this.clearContext('1')
      }else if(fun === 'save' ){
        this.downloadImage()
      }
    },
    draw_graph (graphType) {    
        this.canvas_bak.style.zIndex = 1
        //先画在蒙版上 再复制到画布上       
        this.canDraw = false      
        let startX,startY
      //鼠标按下获取 开始xy开始画图
        let mousedown = (e) => {
          this.context.strokeStyle = this.color.hex
          this.context_bak.strokeStyle = this.color.hex
          this.context_bak.lineWidth = this.penSize
          e=e||window.event
          startX = e.clientX - this.canvasLeft
          startY = e.clientY - this.canvasTop
          this.context_bak.moveTo(startX, startY)
          this.canDraw = true
        if(graphType == 'pencil'){
          this.context_bak.beginPath()
        }else if(graphType == 'circle'){
          this.context.beginPath()
          this.context.moveTo(startX, startY)
          this.context.lineTo(startX + 2, startY + 2)
          this.context.stroke()
        }else if(graphType == 'rubber'){
          this.context.clearRect(startX - this.penSize * 10, startY - this.penSize * 10, this.penSize * 20, this.penSize * 20)
        }
      }
      //鼠标离开 把蒙版canvas的图片生成到canvas中
      let mouseup = (e) => {
        e=e||window.event
        this.canDraw = false
        let image = new Image()
        if (graphType!='rubber') {          
          image.src = this.canvas_bak.toDataURL()
          image.onload = () => {
            this.context.drawImage(image, 0, 0, image.width, image.height, 0, 0, this.canvasSize.width, this.canvasSize.height)
            this.clearContext()
            this.saveImageToAry()
          }
          let x = e.clientX - this.canvasLeft
          let y = e.clientY - this.canvasTop
          this.context.beginPath()
          this.context.moveTo(x, y)
          this.context.lineTo(x + 2, y + 2)
          this.context.stroke()
        }
      }
      // 鼠标移动
      let mousemove = (e) => {
        e=e||window.event
        let x = e.clientX - this.canvasLeft
        let y = e.clientY - this.canvasTop
        this.context_bak.setLineDash(this.lineType)
        //方块  即4条直线
        if (graphType == 'square') {
          if (this.canDraw) {
            this.context_bak.beginPath()
            this.clearContext()
            this.context_bak.moveTo(startX, startY)
            this.context_bak.lineTo(x, startY)
            this.context_bak.lineTo(x, y)
            this.context_bak.lineTo(startX, y)
            this.context_bak.lineTo(startX, startY)
            this.context_bak.stroke()
          }
        //直线
        } else if (graphType =='line' ){
          if (this.canDraw) {
            this.context_bak.beginPath()
            this.clearContext()
            this.context_bak.moveTo(startX, startY)
            this.context_bak.lineTo(x, y)
            this.context_bak.stroke()
          }
        //画笔
        } else if (graphType == 'pencil') {
          if (this.canDraw) {
            this.context_bak.lineTo(e.clientX   - this.canvasLeft ,e.clientY  - this.canvasTop)
            this.context_bak.stroke()
          }
        //圆 未画得时候 出现一个小圆
        } else if (graphType == 'circle') {
          this.clearContext()
          if (this.canDraw) {           
            this.context_bak.beginPath()
            let radii = Math.sqrt((startX - x) * (startX - x)  + (startY - y) * (startY - y))
            this.context_bak.arc(startX,startY,radii,0,Math.PI * 2,false)
            this.context_bak.stroke()
          } else {
            this.context_bak.beginPath()
            this.context_bak.arc(x, y, 20, 0, Math.PI * 2, false)
            this.context_bak.stroke()
          }
        //涂鸦 未画得时候 出现一个小圆
        } else if (graphType == 'handwriting') {
          if (this.canDraw) {
            this.context_bak.beginPath()
            this.context_bak.strokeStyle = this.color.hex
            this.context_bak.fillStyle  = this.color.hex
            this.context_bak.arc(x, y, this.penSize*10 ,0, Math.PI * 2, false)
            this.context_bak.fill()
            this.context_bak.stroke()
          } else {
            this.clearContext()
            this.context_bak.beginPath()
            this.context_bak.fillStyle = this.color.hex
            this.context_bak.arc(x, y, this.penSize*10, 0, Math.PI * 2,false)
            this.context_bak.fill()
            this.context_bak.stroke()
          }
        //橡皮擦 不管有没有在画都出现小方块 按下鼠标 开始清空区域
        } else if (graphType == 'rubber'){
          this.context_bak.setLineDash([0, 0])          
          this.context_bak.lineWidth = 1
          this.clearContext()
          this.context_bak.beginPath()
          this.context_bak.strokeStyle = '#000000'
          this.context_bak.moveTo(x - this.penSize * 10,  y - this.penSize * 10 )
          this.context_bak.lineTo(x + this.penSize * 10, y - this.penSize * 10 )
          this.context_bak.lineTo(x + this.penSize * 10, y + this.penSize * 10 )
          this.context_bak.lineTo(x - this.penSize * 10, y + this.penSize * 10 )
          this.context_bak.lineTo(x - this.penSize * 10, y - this.penSize * 10 )
          this.context_bak.stroke()
          if (this.canDraw) {
            this.context.clearRect(x - this.penSize * 10,  y - this.penSize * 10, this.penSize * 20, this.penSize * 20)
          }
          this.context_bak.setLineDash(this.lineType)
        }
      }
      //鼠标离开区域以外 除了涂鸦 都清空
      let mouseout = () => {
        if (graphType != 'handwriting') {
          this.clearContext()
        }
      }
      this.canvas_bak.onmousedown = () => mousedown()
      this.canvas_bak.onmousemove = () => mousemove()
      this.canvas_bak.onmouseup = () => mouseup()
      this.canvas_bak.onmouseout = () => mouseout()

    },
    clearContext (type) {
      if (!type) {
        this.context_bak.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
      } else {
        this.context.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
        this.context_bak.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
      }
    },
    downloadImage () {
      this.$refs.download.href = this.canvas.toDataURL()
      this.$refs.download.click()
    },
    cancel () {
      this.cancelIndex++
      this.context.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
      let image = new Image()
      let index = this.cancelList.length-1 - this.cancelIndex
      let url = this.cancelList[index]
      image.src = url
      image.onload = ()=> {
        this.context.drawImage(image , 0, 0, image.width, image.height, 0, 0, this.canvasSize.width, this.canvasSize.height)
      }
    },
    next () {
      this.cancelIndex--
      this.context.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
      let image = new Image()
      let index = this.cancelList.length-1 - this.cancelIndex
      let url = this.cancelList[index]
      image.src = url
      image.onload = () => {
        this.context.drawImage(image, 0, 0, image.width, image.height, 0, 0, this.canvasSize.width, this.canvasSize.height)
      }
    },
    //保存历史 用于撤销
    saveImageToAry () {
      this.cancelIndex = 0
      let dataUrl =  this.canvas.toDataURL()
      this.cancelList.push(dataUrl)   
    },
    // 处理文件拖入事件，防止浏览器默认事件带来的重定向  
    handleDragOver (evt) {  
      evt.stopPropagation()
      evt.preventDefault()
    },
    isImage (type) {  
      switch (type) {        
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
      case 'image/bmp':
      case 'image/jpg':
        return true
      default:
        return false
      }  
    },
    // 处理拖放文件列表  
    handleFileSelect (evt) {
      evt.stopPropagation()
      evt.preventDefault()
      let files = evt.dataTransfer.files
      for (let i = 0, f; (f = files[i]); i++) {
        let t = f.type ? f.type : 'n/a'
        let reader = new FileReader()
        let isImg = this.isImage(t)
        // 处理得到的图片
        if (isImg) {
          reader.onload = (() =>  {
            return (e) => {
              let  image = new Image()
              image.src =  e.target.result
              image.onload = ()=> {
                this.context.drawImage(image, 0, 0, image.width, image.height, 0, 0, this.canvasSize.width, this.canvasSize.height)
              }
            }
          })(f)
          reader.readAsDataURL(f)
        }
      }
    },
     //初始化拖入效果
    initDrag () {
      let dragDiv  = document.getElementById("canvas_bak")
      dragDiv.addEventListener('dragover', this.handleDragOver, false) 
      dragDiv.addEventListener('drop', this.handleFileSelect, false)
    },
    addkeyBoardlistener () {
      document.onkeydown = (event) => {   
        let e = event || window.event || arguments.callee.caller.arguments[0]
        if (e.keyCode === 89 && e.ctrlKey) {
          //ctrl+Y
          this.next()
        }
        if (e.keyCode === 90 && e.ctrlKey) {
          // ctrl+Z
          this.cancel()
        }
      }
    }
  },
  components: {
    'PhotoshopPicker': Photoshop
  },
  mounted () {
    this.initCanvas()
    this.initDrag()
    this.addkeyBoardlistener()
    this.drawType(this.tools[0])
    this.canvas_bak.addEventListener('click', this.falseColor)
    window.addEventListener('resize', () => {
      this.canvasSize = {
        width: window.screen.availWidth - 320,
        height: window.screen.availHeight * 0.75
      }
    })
  }
}
</script>
<style scoped>
* {
  -webkit-user-select: none;
  -moz-user-select: none; 
  -ms-user-select: none; 
  user-select: none;
}

canvas {
  position: absolute;
  z-index : 0;
  left: 0;
  right: 0;
  width: 100%;
  height:100%;  
}

.layout {
  background-color: rgb(236, 236, 236);
  height: 100%;
}

.header {
  background-color: #2196f3;
  position: relative;
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 24px;
  color: white;
  padding: 10px 20px;
}

.nav {
  display: flex;
  width: calc(100% - 150px);
  margin: 0 auto;
}

.content {
  overflow: hidden;
  width: 100%;
  height: calc(100vh - 56px);
  display: flex;
}

.content-left {
  width: 280px;
  background-color: white;
}

.content-right {
  width: calc(100% - 280px);
  height: 100%;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0)
}

.body {
  position: relative;
  background-color: white;
  border-radius: 5px;
  height:100%;
  margin: 0 auto;
}

.setterSize {
  padding: 5%;
  font-size: 0.5rem;
}

.selected {
  background: rgba(0,0,0,0.35)!important;
}

.tab {
  margin-right: 5px
}
</style>