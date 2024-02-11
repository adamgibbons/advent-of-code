const data = require('./data')

const result1 = data.filter(el => {
  return data.find(i => el + i === 2020)
})

console.log('part 1:', result1[0] * result1[1])

const result2 = data.filter(el1 => {
  return data.find(el2 => {
    return data.find(el3 => el1 + el2 + el3 === 2020)
  })
})

console.log('part 2', result2[0] * result2[1] * result2[2])