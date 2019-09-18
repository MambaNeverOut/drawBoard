let drawBoard = document.getElementById('draw-board');
let context = drawBoard.getContext('2d');
let lineWidth = 5

autoSetCanvasSize(drawBoard)

listenToUser(drawBoard)


let eraserEnabled = false
pen.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function () {
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}
clear.onclick = function () {
  context.clearRect(0, 0, drawBoard.width, drawBoard.height);
}
download.onclick = function () {
  let url = drawBoard.toDataURL("image/png")
  let a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的作品'
  a.target = '_blank'
  a.click()
}


red.onclick = function () {
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  black.classList.remove('active')
}
green.onclick = function () {
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  red.classList.remove('active')
  green.classList.add('active')
  black.classList.remove('active')
  blue.classList.remove('active')
}
blue.onclick = function () {
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  red.classList.remove('active')
  green.classList.remove('active')
  black.classList.remove('active')
  blue.classList.add('active')
}
black.onclick = function () {
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  black.classList.add('active')
}

line.onclick = function () {
  lineWidth = 2
}
thin.onclick = function () {
  lineWidth = 5
}
thick.onclick = function () {
  lineWidth = 10
}

/******/

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize() {
    let pageWidth = document.documentElement.clientWidth
    let pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {


  let using = false
  let lastPoint = {
    x: undefined,
    y: undefined
  }
  // 特性检测
  if (document.body.ontouchstart !== undefined) {
    // 触屏设备 
    canvas.ontouchstart = function (phone) {
      let x = phone.touches[0].clientX
      let y = phone.touches[0].clientY
      // console.log(x, y)
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove = function (phone) {
      // console.log('边摸边动')
      let x = phone.touches[0].clientX
      let y = phone.touches[0].clientY

      if (!using) {
        return
      }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        let newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function () {
      // console.log('摸完了')
      using = false
    }
  } else {
    // 非触屏设备
    canvas.onmousedown = function (PC) {
      let x = PC.clientX
      let y = PC.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.onmousemove = function (PC) {
      let x = PC.clientX
      let y = PC.clientY

      if (!using) {
        return
      }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        let newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }

    }
    canvas.onmouseup = function (PC) {
      using = false
    }
  }

}