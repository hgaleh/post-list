import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { PostModel } from './model/post.model';

interface State {
  posts: PostModel[];
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private initialState: State = {
    posts: []
  };

  private stateSubject: BehaviorSubject<State> = new BehaviorSubject<State>(this.initialState);
  state$: Observable<State> = this.stateSubject.asObservable();

  setPosts(posts: PostModel[]): void {
    const newState = this.deepCloneState();
    newState.posts = posts;
    this.stateSubject.next(newState);
  }

  getPost(id: number): Observable<PostModel> {
    return this.stateSubject.pipe(map(state => {
      return state.posts.find(p => p.id === id) as PostModel;
    }));
  }

  addPost(post: PostModel): void {
    const newState = this.deepCloneState();
    newState.posts.push(post);
    this.stateSubject.next(newState);
  }

  updatePost(post: PostModel): void {
    const newState = this.deepCloneState();
    newState.posts = newState.posts.map(p => (p.id === post.id ? post : p));
    this.stateSubject.next(newState);
  }

  deletePost(postId: number): void {
    const newState = this.deepCloneState();
    newState.posts = newState.posts.filter(p => p.id !== postId);
    this.stateSubject.next(newState);
  }

  private deepCloneState(): State {
    return JSON.parse(JSON.stringify(this.stateSubject.getValue()));
  }
}
