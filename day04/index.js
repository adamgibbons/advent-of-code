const { readFileSync } = require('fs')

const passports = readFileSync('./data.txt', { enconding : 'utf8' })
  .toString()
  .split('\n\n')
  .map(i => i.split('\n'))
  .map(i => i.join(' '))
  .map(i => i.split(' '))
  .map(i => i.reduce((acc, el, arr, idx) => {
    const key = el.slice(0, 3)
    const value = el.slice(4)

    acc[key] = value
    return acc
  }, {}))

console.log(passports.length)

function isValid(attributes) {
  const keys = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
  ]

  return keys.every(key => {
    return Object.keys(attributes).includes(key)
  })
}

const count = passports.filter(isValid).length
console.log(count)
