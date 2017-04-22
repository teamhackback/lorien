import {observable} from 'mobx';

class MenuTitleStore {
  @observable title = "Default";
  @observable progress;
}


export default new MenuTitleStore();
