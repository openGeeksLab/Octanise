import q from 'q';
import * as _ from 'lodash';
import crypto from 'crypto';
import db from '../db';
import helper from '../components/helper';
import Model from '../components/model';

class UserModel extends Model {

  constructor() {
    super();
    this.tableName = 'user';
  }

  _hashPassword(password) {
    var salt = crypto.randomBytes(16).toString('base64');
    return {
      salt : salt,
      password : this._saltPassword(salt,password)
    };
  };

  _saltPassword (salt,password) {
    return  crypto.pbkdf2Sync(password, salt, 10000, 64,'sha1').toString('base64');
  }

  checkPassword ({password, user}) {
    const hashPass = this._saltPassword(user.salt, password);

    return hashPass === user.password;
  };


  async newUser ({email, passwd, role, name, phone}) {
    const deferred = q.defer();

    const userObj = _.assignIn({
      email,
      role,
      name,
      phone,
    },
    this._hashPassword(passwd));

    db.query(`INSERT INTO ${this.tableName} SET ?`, 
      userObj, 
      function (error, results, fields) {
        if (error) {
          return deferred.reject(error);
        }

        deferred.resolve(results);
    });
    
    return deferred.promise;
  }

  async getByEmail ({email}) {
    const deferred = q.defer();

    db.query(`SELECT * from ${this.tableName} where ${this.tableName}.email = '${email}'`, function (error, results, fields) {
      if (error) {
        return deferred.reject(error);
      }

      if (!_.isArray(results) || !results.length) {
        return deferred.reject('User not found');
      }

      deferred.resolve(helper.rowToJSON(results[0]));
    });

    return deferred.promise;
  }
}

export default new UserModel();