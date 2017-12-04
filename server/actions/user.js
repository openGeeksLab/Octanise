import * as _ from 'lodash';
import userModel from '../models/user';

const userOmitList = [
  'password',
  'salt'
];

class UserAction {
  omitUserData ({user}) {
    return _.omit(user, userOmitList);
  }

  async registration (user) {
    const resObj = await userModel.newUser(user);
    const userObj = await userModel.getById({ id: resObj.insertId });
    return this.omitUserData({ user: userObj });
  }

  async login ({email, password}) {
    const user = await userModel.getByEmail({email});
    if (!userModel.checkPassword({password, user})) {
      throw 'Wrong password';
    }
    return user;
  }
}

export default new UserAction();