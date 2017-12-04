import path from 'path';
import fs from 'fs';

function _parse(initPath, callback) {

  fs.readdirSync(initPath).forEach(function(name) {

    var itemPath = path.join(initPath, name)
      , stat = fs.statSync(itemPath);

    if (stat && stat.isDirectory(itemPath)) {

      //recursive dir reading
      _parse(itemPath, callback);

    } else {
      callback(itemPath, name);
    }

	});
}

export default {
  routes : function(application) {
    _parse(path.join(__dirname, '..', 'routes'), function(itemPath, name) {
      require(itemPath).default(application);
    });
  },
}