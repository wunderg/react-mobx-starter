import { observable, action, computed, when, useStrict, runInAction, autorun } from 'mobx';
useStrict(false);

class AppState {
  @observable timer = 0;
  @observable x = 'HEY';
}

export default AppState;
