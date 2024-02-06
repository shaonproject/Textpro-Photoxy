'use strict';
 const { errorHandler } = require("../utils");
//don't touch my code !!!

let credits = "Chards Bot";
const sim = require("string-similarity");
const similarity = require("../modules/sendTxt.js");
const fs = require('fs-extra');

if (!fs.existsSync(__dirname + "/data/saved_sim.json")) {
		var template = {hi:"hello"};
		fs.writeFileSync(__dirname + "/data/saved_sim.json", JSON.stringify(template, null, 4));
}

const data = JSON.parse(fs.readFileSync(__dirname + '/data/saved_sim.json'));


exports.main2 = async (req, res, next) => {
  res.json({"Author":"Chard ","Usages":{"get":"get sim replies", "add":"add sim reply"}});
};

exports.getInfo2 = async (req, res, next) => {
  let { input } = req.params;
  input = input.replace(/\s+/g, ' ').trim().toLowerCase();
  findFromInput(input, res);
}


var findFromInput = (ask, res) => {
  var Keys = Object.keys(data);
  let find = Keys.find(item => item == ask);
  var Values = [];
  if (!find) {
    var askSplit = ask.split(' ');
    var size = askSplit.length;
    var array = [], startArray = [];
    for (let i = 1; i < askSplit.length; i++) {
      let askSlice = askSplit.slice(0, i);
      let backToString = askSlice.join(" ");
      startArray.push(backToString);
      if (Keys.find(item => item == backToString)) Values.push(...data[backToString]), array.push(backToString);
    }
    if (!array[0]) {
      let halfFirst = askSplit.slice(0, Math.floor(size/2)).join(" ");
      let halfLast = askSplit.slice(Math.floor(size/2)).join(" ");
      let testArray = [];
      if (size > 5) {
        let left = askSplit.slice(0, Math.floor(size/3)).join(" ");
        let mid = askSplit.slice(Math.floor(size/3), Math.floor(size/3*2)).join(" ");
        let right = askSplit.slice(Math.floor(size/3*2)).join(" ");
        startArray.push(left, mid, right);
        testArray.push(left, mid, right);
      }
      if (size > 1) startArray.push(halfFirst, halfLast);
      else startArray.push(ask);
      testArray.push(halfFirst, halfLast);
      checkData(testArray);
        if (!array[0]) {
          if (size > 11) {
            var three_two_Words = [];
            for (let i = 0; i < size; i+=3) {
              let divAsk = askSplit.slice(i, i+3).join(" ");
              three_two_Words.push(divAsk);
              startArray.push(divAsk);
            }
            for (let i = 0; i < size; i+=2) {
              let divAsk = askSplit.slice(i, i+2).join(" ");
              three_two_Words.push(divAsk);
              startArray.push(divAsk);
            }
            checkData(three_two_Words);
          }
          if (!array[0]) {
              for (let i of startArray) {
                let filterArray = (Keys.filter(item => item.startsWith(i)));
                for (let i of filterArray) {
                  Values.push(...data[i]), array.push(i);
                }
              }
              if (!array[0]) {
                let percents = [], keyP = [];
                for (let i of startArray) {
                  let iRegex = i.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                    let anotherFind = Keys.filter(item => item.match(iRegex));
                    if (anotherFind) {
                      for (let ir of anotherFind) {
                        if (similarity(i, ir) >= 0.5) {
                            percents.push(similarity(i, ir));
                            keyP.push(ir);
                        }
                      }
                    }
                }
                if (percents) {
                    let max = Math.max(...percents);
                    for (let i of percents) {
                        if (i == max) {
                            let index = percents.indexOf(i);
                            Values.push(...data[keyP[index]]), array.push(keyP[index]);
                        }
                    }
                }
              }
          }
        }
    }
  } else Values = data[ask];
  function checkData(array) {
      for (let key of array) {
          if (Keys.find(item => item == key)) Values.push(...data[key]), array.push(key);
      }
  }
  let value = Values[Math.floor(Math.random()*Values.length)];
  if (value) {
    res.json({"Author":"chard", "input": `${ask}`, "reply": `${value}` });
    return;
  } else {
    return res.json({"Authors":"chard", "input": `${ask}`, "reply": " " });
  }
}



exports.addInfo2 = async (req, res, next) => {

  let { input } = req.params;
  input = input.replace(/\s+/g, ' ').trim();
  let key = input.toLowerCase().split("&&")[0];
  let value0 = input.split("&&")[1];
  if (!input.split("&&")[1]) return res.json({"Authors":"chard", "input": `${input}`, "reply": "wrong format, format: ask&&answer" });
  try {
    var Keys = Object.keys(data);
    let find = Keys.find(item => item == key);
      if (!find) {
        let value = [];
        value.push(value0);
        data[key] = value
        fs.writeFileSync(__dirname + "/data/saved_sim.json", JSON.stringify(data, null, 4));
        res.json({"Authors":"chard", "input": `${input}`, "reply": "Key not have, has been create new key" });
        return;
      }
      if (find) {
        let values = data[key];
        if (!values.includes(value0)) {
          data[key].push(value0);
          fs.writeFileSync(__dirname + "/data/saved_sim.json", JSON.stringify(data, null, 4));
          res.json({"Authors":"chard", "input": `${input}`, "reply": "SUCCESS create new SIM" });
          return;
        }
      }
      res.json({"Authors":"chard", "input": `${input}`, "reply": "FAILED already created this SIM" });
  } catch (error) {
    console.log(error);
    res.json({"Authors":"chard", "input": `${input}`, "reply": "There's something went wrong, I don't know" });
  }
    }


