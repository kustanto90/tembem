const fs = require('fs')
const path = require('path')

const listDataFiles = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(path.join(process.cwd(), 'public'), (err, files) => {
            if(err) {
                reject(err)
            } else {
                resolve(files.filter(f => f.split('.')[1] === 'json'))
            }
        })
    })
}

const getData = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(process.cwd(), 'public', `${file}.json`), (err, buf) => {
            if(err) {
                reject(err)
            } else {
                resolve(JSON.parse(buf))
            }
        })
    })
}

module.exports = {
    listDataFiles: listDataFiles,
    getData: getData
}