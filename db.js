const fs = require("fs");

module.exports.up = (opt) => {
  function save(db) {
    fs.writeFileSync('data.json', JSON.stringify(db, null, 2));
  }

  function load() {
    if (!fs.existsSync('data.json')) fs.writeFileSync('data.json', JSON.stringify({
      total: 0
    }, null, 2));
    let db = JSON.parse(fs.readFileSync('data.json'));
    return db;
  }

  let db = load();
  if (opt) {
    if (db[opt]) {
      db[opt]++;
    } else db[opt] = 1;
  };
  save(db);
}