const { readFileSync } = require('fs')

const rules = {
  byr: function (value) {
    const year = parseInt(value)
    return year >= 1920 && year <= 2020
  },
  iyr: function (value) {
    const year = parseInt(value)
    return year >= 2010 && year <= 2020
  },
  eyr: function (value) {
    const year = parseInt(value)
    return year >= 2020 && year <= 2030
  },
  hgt: function (value) {
    const height = parseInt(value)
    if (value.slice(-2) === 'cm') {
      return height >= 150 && height <= 193
    }

    return height >= 59 && height <= 76
  },
  hcl: function (value) {
    return /^#[0-9a-f]{6}/.test(value)
  },
  ecl: function (value) {
    if (value.length !== 3) return false

    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].filter(i => i === value).length === 1
  },
  pid: function (value) {
    if (value.length !== 9) return false

    return /\d{9}/.test(value)
  },
  cid: function () {
    return true
  }

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.
}



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

function containsRequiredFields(attributes) {
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

function fieldIsValid({ field, value }) {
  return rules[field].call(null, value)
}

function allFieldsAreValid(fields) {
  return Object.entries(fields)
    .map(([field, value]) => fieldIsValid({ field, value }))
    .every(field => field)
}

const result = passports
  .filter(containsRequiredFields)
  .filter(allFieldsAreValid)

console.log(result.length)