const { readFileSync } = require('fs')

const matrix = readFileSync('./data.txt', { encoding: 'utf8' }).split('\n').map(i => i.split(''))

let pairs = []
let x = 0
let y = 0

do {
  pairs.push({ x, y, char: matrix[y][x] })
  x = (x + 3) % matrix[0].length
  y += 1
} while (!!matrix[y])

console.log('solution 1:', pairs.filter(i => i.char === '#').length)
