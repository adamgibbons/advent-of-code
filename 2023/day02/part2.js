process.stdin.on("data", data => {
    function getTotal(str) {
        return str.split(' ').slice(2).reverse().reduce((acc, current, idx, arr) => {
            if (current.indexOf('green') !== -1) {
                acc.green.push(parseInt(arr[idx + 1]))
            }
            if (current.indexOf('blue') !== -1) {
                acc.blue.push(parseInt(arr[idx + 1]))
            }
            if (current.indexOf('red') !== -1) {
                acc.red.push(parseInt(arr[idx + 1]))
            }
            return acc
        }, { blue: [], red: [], green: [] })
    }

    result = data.toString().split('\n').map(game => {
        return {
            idx: parseInt(game.replace('Game ', '',)),
            raw: game,
            ...getTotal(game)
        }
    }).map(game => {
        return {
            blue: Math.max(...game.blue),
            red: Math.max(...game.red),
            green: Math.max(...game.green)
        }
    }).map(({ blue, red, green }) => {
        return blue * red * green
    }).reduce((a, b) => a + b)
  
    process.stdout.write(result + "\n")
})