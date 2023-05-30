import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, map, tap } from 'rxjs';
import { PostAddModel, PostModel } from './model/post.model';
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private subscription: Subscription[] = [];

  constructor(private http: HttpClient, private appState: AppStateService) {}

  getPosts(): Observable<PostModel[]> {
    this.fillPosts();
    return this.appState.getPosts();
  }

  getPost(id: number) {
    return this.appState.getPost(id);
  }

  createPost(post: PostAddModel): Observable<PostModel> {
    return this.http.post<PostModel>(this.apiUrl, post).pipe(tap(res => {
      this.appState.addPost(res);
    }));
  }

  updatePost(post: PostModel): Observable<PostModel> {
    return this.http.put<PostModel>(`${this.apiUrl}/${post.id}`, post).pipe(tap(res => {
      this.appState.updatePost(res);
    }));
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(tap(() => {
      this.appState.deletePost(id);
    }))
  }

  unsubscribePendingRequests(): void {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private fillPosts(): void {
    if (this.appState.isPostsEmpty()) {
      this.subscription.push(this.http.get<PostModel[]>(this.apiUrl).subscribe(posts => {
        this.appState.setPosts(posts);
      }));
    }
  }
}
