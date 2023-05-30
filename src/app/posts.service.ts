import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostAddModel, PostModel } from './model/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.apiUrl);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(`${this.apiUrl}/${id}`);
  }

  createPost(post: PostAddModel): Observable<PostModel> {
    return this.http.post<PostModel>(this.apiUrl, post);
  }

  updatePost(post: PostModel): Observable<PostModel> {
    return this.http.put<PostModel>(`${this.apiUrl}/${post.id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
