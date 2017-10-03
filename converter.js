let fs = require('fs');
let PDFParser = require("pdf2json");
let pdfParser = new PDFParser(this,1);
let patternLine = /\d\d\d\d\s?[a-zA-z]/g;

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
   let rawContent = pdfParser.getRawTextContent().toString();
   let arrContent = rawContent.split(/\r\n/);
   let filterContent = arrContent.filter(item => patternLine.test(item))
   let mapContent = filterContent.map(ccc)
  fs.writeFile("./dest/out.txt", mapContent);
   console.log(mapContent);

});

function ccc (item) {
  var pos1 = item.slice(-6).trim()
  var pos2 = item.slice(0,4).trim()
  return pos2 + ',' + pos1
}
pdfParser.loadPDF("./src/personaleinkauf.pdf");
