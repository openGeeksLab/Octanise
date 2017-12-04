import * as _ from 'lodash';

class Helper {
  rowObjToJSON (row) {
    let res = {};
    for (const key in row) {
      res[key] = row[key];
    }
    return res;
  }

  rowToJSON (row) {
    if (!_.isArray(row)) {
      return this.rowObjToJSON(row);
    }

    const res = [];
    for (const i in row) {
      res.push(this.rowObjToJSON(row[i]));
    }

    return res;
  }
}

export default new Helper();