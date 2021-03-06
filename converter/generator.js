const fs = require("fs");
const xlsx = require("node-xlsx");
const extractor = require("./extractor");

const inputPath = `${__dirname}/data.xlsx`;

// Parse a file
const data = xlsx.parse(inputPath);

let target = null;
for (let group of data) {
  if (group.name.startsWith("all")) target = extractor(group.data);
}

// fs.writeFileSync("./data.json", JSON.stringify(data));
fs.writeFileSync("../scrumtest/src/data.json", JSON.stringify(target));
