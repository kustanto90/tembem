console.time('runtime');

const {localBrowserInstall, githubActionBrowserInstall, baseUrl, languages, datapath, year, month, day} = require('./constants');
const pptr = require('puppeteer-core');

const main = async () => {
    let browser;
    if(process.env.GITHUB_ACTIONS) {
        browser = await pptr.launch({executablePath: githubActionBrowserInstall, args: ['--no-sandbox']})
    } else {
        browser = await pptr.launch({executablePath: localBrowserInstall});
    }
    const promises = [];
    languages.forEach(lang => {
        promises.push(
            browser.newPage().then(async (page) => {
                await page.goto(baseUrl + lang);
                const items = await page.evaluate(() => {
                    const data = [];
                    const getText = (node) => node ? node.textContent.trim() : undefined;
                    const getRepo = (article) => {
                        let r = getText(article.querySelector('.h3.lh-condensed'));
                        return r ? r.replace(/\s/g, '').replace(/\n/g, '') : r;
                    };
                    const getDescription = (article) => getText(article.querySelector('p'));
                    const getLanguage = (article) => getText(article.querySelector('[itemprop=programmingLanguage]'));

                    const articles = document.querySelectorAll('.Box-row');

                    for(const a of articles) {
                        data.push({
                            repository: getRepo(a),
                            description: getDescription(a),
                            programmingLanguage: getLanguage(a)
                        })
                    }

                    return data;
                });
                return {heading: (lang ? lang : 'trending'), items: items};
            })
        )
    });
    const d = await Promise.all(promises);
    await browser.close();
    let json = {};
    d.forEach(page => json[page.heading] = page.items);

    const filename = `${year}-${month}-${day}.json`;
    const fs = require('fs');
    fs.writeFile(`${datapath}/${filename}`,
        JSON.stringify(json),
        (err) => err ? console.error(err) : console.timeEnd('runtime')
    )
    //Solves #75
    fs.writeFile(`${datapath}/latest.json`,
        JSON.stringify(json),
        (err) => {if(err) {console.error(err)}})
};


main();