(async function (url) {
  const tools = require("./index");
  tools.getVideoUrl(url)
    .then(result => {
      return console.log(result)
    })
})("https://fb.watch/fx38NLWMC_/")