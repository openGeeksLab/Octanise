import q from 'q';
import * as _ from 'lodash';
import db from '../db';
import helper from '../components/helper';
import Model from '../components/model';

class SupplierList extends Model {

  constructor() {
    super();
    this.tableName = 'supplierList';
  }

  async setSupplier ({idCustomer, idSupplier}) {
    const deferred = q.defer();

    db.query(`INSERT INTO ${this.tableName} SET ?`, 
      {
        idCustomer,
        idSupplier,
      }, 
      function (error, results, fields) {
        if (error) {
          return deferred.reject(error);
        }

        deferred.resolve(results);
    });
    
    return deferred.promise;
  }

  async getSuppliersByIdCustomer ({idCustomer}) {
    const deferred = q.defer();

    db.query(`SELECT user.* FROM ${this.tableName} INNER JOIN user ON user.id = ${this.tableName}.idSupplier WHERE idCustomer = '${idCustomer}'`, 
      function (error, results, fields) {
        if (error) {
          return deferred.reject(error);
        }

        deferred.resolve(helper.rowToJSON(results));
    });
    
    return deferred.promise;
  }

  async getSupplierByIdCustomerById ({id, idCustomer}) {
    const deferred = q.defer();

    db.query(`SELECT user.* FROM ${this.tableName} INNER JOIN user ON user.id = ${this.tableName}.idSupplier WHERE idCustomer = '${idCustomer}' AND user.id = ${id}`, 
      function (error, results, fields) {
        if (error) {
          return deferred.reject(error);
        }

        deferred.resolve(helper.rowToJSON(results[0]));
    });
    
    return deferred.promise;
  }

  async getCustomersByIdSupplier ({idSupplier}) {
    const deferred = q.defer();

    db.query(`SELECT user.* FROM ${this.tableName} INNER JOIN user ON user.id = ${this.tableName}.idCustomer WHERE idSupplier = '${idSupplier}'`, 
      function (error, results, fields) {
        if (error) {
          return deferred.reject(error);
        }

        deferred.resolve(helper.rowToJSON(results));
    });
    
    return deferred.promise;
  }

  async getCustomerByIdSupplierById ({id, idSupplier}) {
    const deferred = q.defer();

    db.query(`SELECT user.* FROM ${this.tableName} INNER JOIN user ON user.id = ${this.tableName}.idCustomer WHERE idSupplier = '${idSupplier}' AND user.id = ${id}`, 
      function (error, results, fields) {
        if (error) {
          return deferred.reject(error);
        }

        deferred.resolve(helper.rowToJSON(results[0]));
    });
    
    return deferred.promise;
  }

}

export default new SupplierList();