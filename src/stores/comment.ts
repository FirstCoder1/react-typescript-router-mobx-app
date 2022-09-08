import { action, computed, makeObservable, observable } from "mobx";
import Comment from "../models/comment";
import IComment from "../types/comment";
import AppStore from "./app";

export default class CommentStore {
  byId = observable.map<number, Comment>();
  constructor(private store: AppStore) {
    makeObservable(this, {
      load: action,
      all: computed,
    });
  }
  load(comments: IComment[]) {
    comments.forEach((it) => this.byId.set(it.id, new Comment(this.store, it)));
  }
  get all() {
    return Array.from(this.byId.values());
  }
}
