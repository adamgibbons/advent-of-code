const numbers = ['one','two','three','four','five','six','seven','eight','nine']

process.stdin.on("data", data => {
  let list = []
  let flag = false

  data.toString()
    .split('\n')
    .map((str) => {
      let counter = 0
      let str2 = ''

      while (counter < str.length) {
        if (Number.isInteger(parseFloat(str[counter]))) {
          str2 += str[counter]
          counter++
        } else {
          numbers.forEach((n, idx) => {
            if (str.indexOf(n, counter) === counter) {
              flag = true
              str2 += String(idx + 1)
              counter += n.length - 2
            }
          })
          if (!flag) {
            counter++
          }
        }
        flag=false
      }
      return str2
    })
    .map(str => {
      str = str.replace(/[a-z]/g, '')
      const item = str[0] + str[str.length - 1]
      list.push(item)
      return item
    })
    
    const result = list.reduce((acc, current) => {
      return acc + parseInt(current)
    }, 0)

  process.stdout.write(String(result) + "\n")
})