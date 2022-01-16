import { send } from '../util/kit';
import { getOptions } from '../options';

class User{
  async login(args?: { [index: string]: any }): Promise<{ [index: string]: any }>{
    return await send('user.login', (args || {}), getOptions());
  }
  async adminLogin(args?: { [index: string]: any }): Promise<{ [index: string]: any }>{
    return await send('user.adminLogin', (args || {}), getOptions());
  }
}

export default User;
export { User }