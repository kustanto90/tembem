const os = require('os');
let localBrowserInstall = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
if(os.type() === 'Linux') {
    localBrowserInstall = '/usr/bin/chromium';
}

const dateTimeFormat = new Intl.DateTimeFormat('en', {year: 'numeric', month: '2-digit', day: '2-digit' });
const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(new Date());

module.exports = {
    githubActionBrowserInstall: 'google-chrome-stable',
    baseUrl: 'https://github.com/trending/',
    languages: ['', 'java', 'scala', 'kotlin', 'swift', 'python', 'javascript', 'typescript', 'go', 'rust'],
    datapath: './data',
    localBrowserInstall,
    month,
    day,
    year,
    dateTimeFormat
}