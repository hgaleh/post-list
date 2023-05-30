import {Component, OnInit} from '@angular/core';
import {PostsService} from "../posts.service";
import {Router} from "@angular/router";
import {AppStateService} from "../app-state.service";
import { PostModel } from '../model/post.model';

@Component({
  selector: 'app-right-side-list',
  templateUrl: './right-side-list.component.html',
  styleUrls: ['./right-side-list.component.scss']
})
export class RightSideListComponent implements OnInit {
  items: PostModel[] = [];

  constructor(private postsService: PostsService, private router: Router, private appState: AppStateService) {}
  ngOnInit(): void {
    this.appState.state$.subscribe(state => {
      this.items = state.posts;
    });

    if (this.items.length === 0) {
      this.postsService.getPosts().subscribe(posts => {
        this.appState.setPosts(posts);
      });
    }
  }

  onItemClick(postId: number): void {
    this.router.navigate(['/post/edit', postId]);
  }

  navigateToAddForm(): void {
    this.router.navigate(['/post/new']);
  }

  deletePost(postId: number): void {
    this.postsService.deletePost(postId).subscribe(() => {
      this.appState.deletePost(postId);
    });
  }

}

