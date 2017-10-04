const MDNr = 1;
const LANr = 191;
const Dat = '';
const KoSt = '';
const KoTr = '';
const Aa = '';
const Anz = '1,00';
const Zuschl = '';
const delimiter = ';';
let fs = require('fs');
let PDFParser = require("pdf2json");
let pdfParser = new PDFParser(this,1);
let patternLine = /^\d\d\d\d\s?[a-zA-z]/;
let datePattern = /\d\d\d\d\.\d\d/;

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
  let rawContent = pdfParser.getRawTextContent().toString();
  let indexOfDate = rawContent.search(datePattern);
  let arrContent = rawContent.split('\n');
  let AbrJahr = rawContent.slice(indexOfDate, indexOfDate + 4);
  let AbrMon = rawContent.slice(indexOfDate + 5, indexOfDate + 7);
  let ANNr = '';
  let Betrag = '';
  let output = '';

  arrContent.forEach(function(item) {
    if (patternLine.test(item)) {
      ANNr = item.slice(0,4).trim()
      Betrag = item.slice(-6).trim()
      output += MDNr + delimiter + AbrMon + delimiter + AbrJahr + delimiter + ANNr + delimiter + LANr + delimiter + Dat + delimiter + KoSt + delimiter + KoTr + delimiter + Aa  + delimiter + Anz + delimiter + Betrag + delimiter + Zuschl + delimiter + '\n';
    }
  })
  console.log(output);
  fs.writeFile("./dest/output.csv", output);
});
pdfParser.loadPDF("./src/personaleinkauf09.pdf");
