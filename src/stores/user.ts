import { action, computed, makeObservable, observable } from "mobx";
import User from "../models/user";
import IUser from "../types/user";
import AppStore from "./app";

export default class UserStore {
  byId = observable.map<number, User>();

  constructor(private store: AppStore) {
    makeObservable(this, {
      load: action,
      all: computed,
    });
  }

  load(users: IUser[]) {
    users.forEach((it) => this.byId.set(it.id, new User(this.store, it)));
  }

  get all() {
    return Array.from(this.byId.values());
  }
}
