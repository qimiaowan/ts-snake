import { getStyle, setStyle } from "./utils"

const oWrap: HTMLElement = document.querySelector("#wrap")
const oFood: HTMLElement = document.querySelector(".food")
const oSnake: HTMLElement = document.querySelector(".snake-wrap")
const w = getStyle(oWrap, 'width') as number
const h = getStyle(oWrap, 'height') as number

let timer = null
// 格子宽
let space = 10

let snakeMap = []
// 默认方向

const dirMap = {
  37: 'left',
  38: 'top',
  39: 'right',
  40: 'bottom'
}

let curDir = 'right'

let foodPos

// 初始化
const init = (s: number) => {
  space = s
  curDir = 'right'
  snakeMap = [['head',[space, 0]],['body',[0, 0]]]
  render()
  move(curDir)
  bind()
}
// 生成场景
const render = () => {
  foodPos = food()
  snake()
}

const dirPos = (dir: string) => {
  let moveMap = null
  switch(dir) {
    case "left":
      moveMap = curDir!=="right" && [-space, 0]
      break
    case "top":
      moveMap = curDir!=="bottom" && [0, -space]
      break
    case "right":
      moveMap = curDir!=="left" && [space, 0]
      break
    case "bottom":
      moveMap = curDir!=="top" && [0, space]
      break
  }
  return moveMap
}

// 移动
const move = (dir: string) => {
  const m = dirPos(dir)
  if(!m) {
    return
  }

  clearInterval(timer)
  timer = setInterval(()=>{
    let prev = []
    snakeMap.forEach((item, index) => {
      let [name, pos] = item
      const c = Array.from(pos)
      if(name === 'head') {
        pos[0] += m[0]
        pos[1] += m[1]
        // 碰撞检测
        const isCollision: Boolean | undefined = collision(pos)
        if(isCollision) {
          alert("呵呵， gg!")
          clear()
          return;
        }
        const isFood: Boolean | undefined = testFood(pos)
        if(isFood) {
          // 吃到食物了 1.创建蛇身 2. 重新生成食物位置
          const add = JSON.parse(JSON.stringify(snakeMap[snakeMap.length - 1]))
          const c = create(add[1])
          snakeMap.push(add)
          oSnake.appendChild(c)
          foodPos = food()
        }
      } else {
        pos[0] = prev[0]
        pos[1] = prev[1]
      }
      prev = c
      setStyle((oSnake.children as any)[index], { 'left': pos[0] + "px", 'top': pos[1] + "px" })
      curDir = dir
    })
  },200)
}

const clear = () => {
  init(space)
}

// 碰撞检测
const collision = (pos:number[]) => {
  const [x, y] = pos
  if(x < 0 || y < 0 || x >= w || y >= h) {
    return true
  }
  return snakeMap.some((item:any)=>{
    const [name, _pos] = item
    if(name !== "head") {
      return x === _pos[0] && y === _pos[1]
    }
  })
}

// 检测是否吃到食物
const testFood = (pos:number[]) => {
  if(foodPos) {
    if(pos[0] === foodPos[0] && pos[1] === foodPos[1]) {
      return true
    }
  }
}

const dirDown = (e) => {
  if(dirMap[e.keyCode] === curDir) {
    return
  }
  move(dirMap[e.keyCode])
}

const bind = () => {
  document.removeEventListener('keydown', dirDown, false)
  document.addEventListener('keydown', dirDown, false)
}

// 生成小蛇
const snake = () => {
  const fram = document.createDocumentFragment()
  for (const [name, pos] of snakeMap) {
    const c = create(pos)
    if(name === "head") {
      c.classList.add("head")
    }
    fram.appendChild(c)
  }
  oSnake.innerHTML = ""
  oSnake.appendChild(fram)
}

const create = (pos: any) => {
  const c = document.createElement("div") as HTMLElement
  c.classList.add("snake")
  setStyle(c, { 'left': pos[0] + "px", 'top': pos[1] + "px" })
  return c
}

// 生成食物
const food = () => {
 const randX: number = Math.floor(Math.random() * (w / space)) * space
 const randY: number = Math.floor(Math.random() * (h / space)) * space
 setStyle(oFood, { 'left': randX + "px", 'top': randY + "px" })
 return [randX, randY]
}

export default init
