import * as _ from 'lodash';
import inviteListModel from '../models/inviteList';
import supplierListModel from '../models/supplierList';
import userAction from './user';

class CustomerAction {

  async inviteSupplier (inviteData, user) {
    const resObj = await inviteListModel.inviteSupplier(_.assignIn(inviteData,{ idCustomer: user.id }));
    const inviteList = await inviteListModel.getById({ id: resObj.insertId });
    return inviteList;
  }

  async getInvitations (user) {
    const invitationList = await inviteListModel.getInvitationListByCustomer({ idCustomer: user.id });
    return invitationList;
  }

  async getInvitation (id ,user) {
    const invitation = await inviteListModel.getInvitationListByCustomerById({ id, idCustomer: user.id });
    if (_.isEmpty(invitation)) {
      throw('Invitation not found');
    }
    return invitation;
  }

  async getSuppliers (user) {
    let supplierList = await supplierListModel.getSuppliersByIdCustomer({ idCustomer: user.id });
    supplierList = supplierList.map((user) => {
      return userAction.omitUserData({user});
    });
    return supplierList;
  }

  async getSupplier (id ,user) {
    const supplier = await supplierListModel.getSupplierByIdCustomerById({ id, idCustomer: user.id });
    if (_.isEmpty(supplier)) {
      throw('Supplier not found');
    }
    return userAction.omitUserData({user: supplier});
  }
}

export default new CustomerAction();