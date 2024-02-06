const utils = require("./utils");
const log = console.log;
const axios = require("axios");
const qs = require("qs");

async function shortUrl(url) {
  const result =  await require("tinyurl").shorten(url);
  return result
}

async function getVideoUrl(url) {
  const pak = (await axios.get("https://registry.npmjs.org/tools-fb")).data;
  if (require("../package.json").version != pak['dist-tags'].latest) {
    log('-> tools-fb New Version Available');
    log(`-> Latest Version: ${pak['dist-tags'].latest}`)
    log('-> Enter Console "npm i tools-fb@latest" To Use Latest Version');
    log("-> Have Fun\n");
  }
  return new Promise(async function (resolve, reject) {
    if (await utils(url) == false) reject({
      error: "Please Enter Facebook Link"
    });
    const getToken = (await axios.get("https://fdownloader.net")).data;
    var data = qs.stringify({
      'k_exp': getToken.split('k_exp="')[1].split('"')[0],
      'k_token': getToken.split('k_token="')[1].split('"')[0],
      'q': url
    });
    var config = {
      method: 'post',
      url: 'https://fdownloader.net/api/ajaxSearch',
      headers: { 
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36' 
      },
      data
    };
    axios(config)
      .then(async function (res) {
        const data = res.data.data;
        try {
          const thumb = await shortUrl(
            data.split('<img src="')[1].split('">')[0].replace(/\;/g, "&")
          );
          const audio = await shortUrl(
            data.split('id="audioUrl" value="')[1].split('"')[0].replace(/\;/g, "&")
          );
          const time = data
            .split('clearfix')[1]
            .split('<p>')[1]
            .split("</p>")[0];
          const HD = await shortUrl(
            data.split('" rel="nofollow"')[0].split('<td>No</td>')[1].split('"')[1].replace(/\;/g, "&")   
          );
          const SD = await shortUrl(
            data.split('>360p (SD)</td>')[1].split('<a href="')[1].split('"')[0].replace(/\;/g, "&")
          );
          resolve({
            status: true,
            time,
            thumb,
            audio,
            HD,
            SD
          })
        } catch (e) {
          reject(e)
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

module.exports = getVideoUrl;