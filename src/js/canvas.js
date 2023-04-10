import utils, { distance, randomColor, randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

document.body.style.overflow = 'hidden';

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

//settings
let gravity = 0.2;
let friction = 0.96;
let ballsNumber = 100;
let minRadius = 4;
let maxRadius = 20;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    //this.dy = dy
    //this.dx = dx
    this.velocity = {
      x: dx,
      y: dy,
    }
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
  }

  update() {
    if (this.y + this.radius + this.velocity.y > canvas.height) {
      this.velocity.y = -this.velocity.y * friction
      this.velocity.x = this.velocity.x * friction
    }
    else {
      this.velocity.y += gravity;
    }

    if(this.x + this.radius + this.velocity.x > canvas.width || this.x - this.radius <= 0) {
      this.velocity.x = -this.velocity.x;
    }


    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw()
  }
}

// Implementation
let ballArray;

function init() {
  ballArray = [];
  for (let i = 0; i < ballsNumber; i++) {
      let radius = randomIntFromRange(minRadius, maxRadius);
      let x = randomIntFromRange(radius, canvas.width - radius);
      let y = randomIntFromRange(0, canvas.height - radius);
      let dx = randomIntFromRange(-2, 2);
      let dy = randomIntFromRange(-2, 2);
      let color = randomColor(colors)
      ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
  //ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 30, 'red');
  console.log(ballArray);

}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)

  c.clearRect(0, 0, canvas.width, canvas.height)
  
/*   for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update()
  } */

  for (const ball of ballArray) {
    ball.update()
  }

  //c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  // objects.forEach(object => {
  //  object.update()
  // })
  //ball.update()
}

init()
animate()
