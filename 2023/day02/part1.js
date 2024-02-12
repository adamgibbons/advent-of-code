
process.stdin.on("data", data => {

    const restrictions = {
        red: 12,
        green: 13,
        blue: 14
    }
    // const result = data.toString()
    // .split('\n')

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

    const result = data.toString().split('\n').map(game => {
        return {
            idx: parseInt(game.replace('Game ', '',)),
            raw: game,
            ...getTotal(game)
        }
    }).filter(game => {
        return Math.max(...game.blue) <= restrictions.blue &&
            Math.max(...game.red) <= restrictions.red &&
            Math.max(...game.green) <= restrictions.green
    }).reduce((acc, current) => {
        return acc + current.idx
    }, 0)
    process.stdout.write(String(result) + "\n")
})
