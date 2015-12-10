if (!process.argv[3]) {
    console.log("usage: node pack.js {template} {tag} {output}");
    return;
}

var riot = require('riot'),
    fs = require('fs'),
    file = fs.readFileSync(process.argv[2], 'utf-8'),
    js = riot.compile(fs.readFileSync(process.argv[3], 'utf-8'))

file = file.replace(/\/\/\sBEGIN\sRIOT\sTAGS[\s\S]+\/\/\sEND\sRIOT\sTAGS/, "//BEGIN RIOT TAGS\n" +
    js + "        //END RIOT TAGS");
fs.writeFile(process.argv[4], file);
console.log('packed: ' + process.argv[4]);

