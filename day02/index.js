const { readFileSync } = require('fs')

const passwords = readFileSync('./data.txt', {encoding: 'utf8'}).split('\n').map(i => {
  const [policy, letter, password] = i.split(' ').map(i => i.replace(':', ''))

  return { policy, letter, password }
})

function isValidSection1 ({ policy, letter, password }) {
  const [min, max] = policy.split('-').map(i => parseInt(i))

  const frequency = password.split('').filter(i => letter === i).length
  if (frequency < min || frequency > max) return false

  return true
}

console.log('part 1:', passwords.filter(isValidSection1).length)

function isValidSection2 ({ policy, letter, password }) {
  const [position1, position2] = policy.split('-').map(i => parseInt(i))

  return [password[position1 - 1], password[position2 - 1]].filter(i => letter === i).length === 1
}

console.log('part 2:', passwords.filter(isValidSection2).length)
