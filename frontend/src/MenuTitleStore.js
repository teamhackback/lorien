import {observable} from 'mobx';

class MenuTitleStore {
  @observable title = "Default";
  @observable progressSelected;
}


export default new MenuTitleStore();
