const {year, month, day, dateTimeFormat, datapath} = require('./constants');

const main = async () => {
    const fs = require('fs')
    const date = new Date()
    const isMonday = date.getDay() === 1
    let diff = isMonday ? 3 : 1
    const todayFile = `${year}-${month}-${day}.json`;
    const [{ value: lastMonth },,{ value: lastDay },,{ value: lastYear }] = dateTimeFormat.formatToParts(date.setDate(date.getDate()-diff));
    const lastFile = `${lastYear}-${lastMonth}-${lastDay}.json`;


    const today = fs.readFileSync(`${datapath}/${todayFile}`)
    const last = fs.readFileSync(`${datapath}/${lastFile}`)

    const compare = today.compare(last)
    console.log(`Compare number: ${compare}`)
    if(compare === 0) {
        process.exit(1)
    }
}

main()