import * as _ from 'lodash';
import inviteListModel from '../models/inviteList';
import supplierListModel from '../models/supplierList';
import userAction from './user';

class SupplierAction {

  async acceptInvitation (inviteData, user) {
    const invitation = await inviteListModel.getInvitationBySupplier({ id: inviteData.id, supplierEmail: user.email, status: 'new' });
    if (_.isEmpty(invitation)) {
      throw('Invitation not found');
    }
    await inviteListModel.getChangeStatus({ id: inviteData.id, status: 'accepted' });

    const resObj = await supplierListModel.setSupplier({ idCustomer: invitation.idCustomer, idSupplier: user.id });
    const supplierSetData = await supplierListModel.getById({ id: resObj.insertId });
    return supplierSetData;
  }

  async declineInvitation (inviteData, user) {
    const invitation = await inviteListModel.getInvitationBySupplier({ id: inviteData.id, supplierEmail: user.email, status: 'new' });
    if (_.isEmpty(invitation)) {
      throw('Invitation not found');
    }
    await inviteListModel.getChangeStatus({ id: inviteData.id, status: 'declined' });
    return { result: 'success' };
  }

  async getInvitations (user) {
    const invitationList = await inviteListModel.getInvitationListBySupplier({ supplierEmail: user.email });
    return invitationList;
  }

  async getInvitation (id ,user) {
    const invitation = await inviteListModel.getInvitationListBySupplierById({ id, supplierEmail: user.email });
    if (_.isEmpty(invitation)) {
      throw('Invitation not found');
    }
    return invitation;
  }

  async getCustomers (user) {
    let customerList = await supplierListModel.getCustomersByIdSupplier({ idSupplier: user.id });
    customerList = customerList.map((user) => {
      return userAction.omitUserData({user});
    });
    return customerList;
  }

  async getCustomer (id ,user) {
    const customer = await supplierListModel.getCustomerByIdSupplierById({ id, idSupplier: user.id });
    if (_.isEmpty(customer)) {
      throw('Supplier not found');
    }
    return userAction.omitUserData({user: customer});
  }
}

export default new SupplierAction();