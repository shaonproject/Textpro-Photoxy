async function getUserID(url) {
  const utils = require("./utils");
  const log = console.log;
  const axios = require("axios");
  const res = (await axios.get("https://registry.npmjs.org/tools-fb")).data;
  if (require("../package.json").version != res['dist-tags'].latest) {
    log('-> tools-fb New Version Available');
    log(`-> Latest Version: ${res['dist-tags'].latest}`)
    log('-> Enter Console "npm i tools-fb@latest" To Use Latest Version');
    log("-> Have Fun\n");
  }
  return new Promise(async function (resolve, reject) {
    const regex = await utils(url);
    if (regex == false) reject("Wrong Link");
    else {
      const newUrl = "https://facebook.com/" + regex[1];
      var data = require("qs")
        .stringify({
          'link': newUrl
        });
      const options = {
        method: 'POST',
        url: 'https://id.traodoisub.com/api.php',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data
      };
      axios(options)
        .then(async function (req) {
          if (req.data.code == 400) reject("Can't Load ID");
          const result = {
            status: 200,
            data: req.data.id
          };
          resolve(result);
        })
        .catch(e => {
          reject(e);
        })
    }
  })
}

module.exports = getUserID;