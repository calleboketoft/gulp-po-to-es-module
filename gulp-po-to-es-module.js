var through = require('through2');
var gettextParser = require('gettext-parser');

function poToEsm(file) {
  dataStr = file.contents.toString('utf8');
  var po = gettextParser.po.parse(dataStr);
  var translation = po.translations[''];
  var translationStr = `export default ${JSON.stringify(translation, null, 2)}`;
  var translationBuffer = Buffer.from(translationStr, 'utf8');
  file.contents = translationBuffer;
  return file;
}

module.exports = function () {
  return through.obj(function (file, encoding, callback) {
    callback(null, poToEsm(file));
  });
};