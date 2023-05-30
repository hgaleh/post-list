import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../posts.service";
import {Router} from "@angular/router";
import { PostModel } from '../model/post.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-right-side-list',
  templateUrl: './right-side-list.component.html',
  styleUrls: ['./right-side-list.component.scss']
})
export class RightSideListComponent implements OnInit, OnDestroy {
  items$: Observable<PostModel[]> = this.postsService.getPosts();
  private subscription: Subscription[] = [];
  
  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {}

  onItemClick(postId: number): void {
    this.router.navigate(['/post/edit', postId]);
  }

  navigateToAddForm(): void {
    this.router.navigate(['/post/new']);
  }

  deletePost(postId: number): void {
    this.subscription.push(this.postsService.deletePost(postId).subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
    this.postsService.unsubscribePendingRequests();
  }
}

