process.stdin.on("data", data => {
    const result = data.toString().split('\n').map(line => {
        const winningNumbers = line.split(' ').filter(i => !!i).slice(2, 12)
        
        const myNumbers = line.split(' ').filter(i => !!i).slice(13)

        const matches = myNumbers.filter(n => {
            return winningNumbers.some((wn) => {
                return wn === n
            })
        })

        let score = 0

        if (matches.length) {
            score = Math.pow(2, matches.length - 1)
        }

        return score
    }).reduce((a, b) => a + b)

    process.stdout.write(String(result) + "\n")
})
