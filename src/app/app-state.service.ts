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
  private stateSubject: BehaviorSubject<State> = new BehaviorSubject<State>({
    posts: []
  });

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

  getPosts(): Observable<PostModel[]> {
    return this.stateSubject.pipe(map(state => {
      return state.posts;
    }));
  }

  isPostsEmpty(): boolean {
    return this.stateSubject.getValue().posts.length === 0
  }

  private deepCloneState(): State {
    return JSON.parse(JSON.stringify(this.stateSubject.getValue()));
  }
}
