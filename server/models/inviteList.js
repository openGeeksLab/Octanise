import q from 'q';
import * as _ from 'lodash';
import db from '../db';
import helper from '../components/helper';
import Model from '../components/model';

class InviteList extends Model {

  constructor() {
    super();
    this.tableName = 'inviteList';
  }

  async inviteSupplier ({idCustomer, supplierName, supplierEmail}) {
    const deferred = q.defer();

    db.query(`INSERT INTO ${this.tableName} SET ?`, 
      {
        idCustomer,
        supplierName,
        supplierEmail,
      }, 
      function (error, results, fields) {
        if (error) {
          return deferred.reject(error);
        }

        deferred.resolve(results);
    });
    
    return deferred.promise;
  }

  async getInvitationBySupplier ({id, supplierEmail, status}) {
    const deferred = q.defer();

    db.query(`SELECT * FROM ${this.tableName} WHERE id = ${id} AND supplierEmail = '${supplierEmail}' AND status = '${status}'`, 
      function (error, results, fields) {
        if (error) {
          return deferred.reject(error);
        }

        deferred.resolve(helper.rowToJSON(results[0]));
    });
    
    return deferred.promise;
  }

  async getChangeStatus ({id, status}) {
    const deferred = q.defer();

    db.query(`UPDATE ${this.tableName} SET status = '${status}' WHERE id = ${id}`, 
      function (error, results, fields) {
        if (error) {
          return deferred.reject(error);
        }

        deferred.resolve(results);
    });
    
    return deferred.promise;
  }



  async getInvitationListBySupplier ({supplierEmail}) {
    const deferred = q.defer();

    db.query(`SELECT * FROM ${this.tableName} WHERE supplierEmail = '${supplierEmail}'`, 
      function (error, results, fields) {
        if (error) {
          return deferred.reject(error);
        }

        deferred.resolve(helper.rowToJSON(results));
    });
    
    return deferred.promise;
  }

  async getInvitationListBySupplierById ({id, supplierEmail}) {
    const deferred = q.defer();

    db.query(`SELECT * FROM ${this.tableName} WHERE id = ${id} AND supplierEmail = '${supplierEmail}'`, 
      function (error, results, fields) {
        if (error) {
          return deferred.reject(error);
        }

        deferred.resolve(helper.rowToJSON(results[0]));
    });
    
    return deferred.promise;
  }

  async getInvitationListByCustomer ({idCustomer}) {
    const deferred = q.defer();

    db.query(`SELECT * FROM ${this.tableName} WHERE idCustomer = '${idCustomer}'`, 
      function (error, results, fields) {
        if (error) {
          return deferred.reject(error);
        }

        deferred.resolve(helper.rowToJSON(results));
    });
    
    return deferred.promise;
  }

  async getInvitationListByCustomerById ({id, idCustomer}) {
    const deferred = q.defer();

    db.query(`SELECT * FROM ${this.tableName} WHERE id = ${id} AND idCustomer = '${idCustomer}'`, 
      function (error, results, fields) {
        if (error) {
          return deferred.reject(error);
        }

        deferred.resolve(helper.rowToJSON(results[0]));
    });
    
    return deferred.promise;
  }
}

export default new InviteList();