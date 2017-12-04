import q from 'q';
import * as _ from 'lodash';
import db from '../db';
import helper from '../components/helper';

class Model {


  async getById ({id}) {
    const deferred = q.defer();

    let t = db.query(`SELECT * from ${this.tableName} where id = ${id}`, function (error, results, fields) {
      if (error) {
        return deferred.reject(error);
      }

      if (!_.isArray(results) || !results.length) {
        return deferred.reject(`${this.tableName} not found`);
      }

      deferred.resolve(helper.rowToJSON(results[0]));
    });

    return deferred.promise;
  }
}

export default Model;