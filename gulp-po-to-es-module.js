var through = require('through2');
var gettextParser = require('gettext-parser');

function poToEsm(file) {
  dataStr = file.contents.toString('utf8');
  var po = gettextParser.po.parse(dataStr);
  var translation = po.translations[''];
  var translationFormatted = Object.keys(translation).reduce((mem, curr) => {
    mem[curr] = translation[curr]['msgstr'][0];
    return mem;
  }, {});
  var translationStr = `export default ${JSON.stringify(translationFormatted, null, 2)}`;
  var translationBuffer = Buffer.from(translationStr, 'utf8');
  file.contents = translationBuffer;
  return file;
}

module.exports = function () {
  return through.obj(function (file, encoding, callback) {
    callback(null, poToEsm(file));
  });
};