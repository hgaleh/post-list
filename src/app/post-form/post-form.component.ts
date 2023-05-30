import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PostsService } from '../posts.service';
import {ActivatedRoute, Router} from "@angular/router";
import {AppStateService} from "../app-state.service";
import { PostModel } from '../model/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {
   mode: 'Add' | 'Edit' = 'Add';
   postId: number | null = null;
   formSubmitted = new EventEmitter();
   subscription: Subscription[] = [];

  post: PostModel = {
    id: 0,
    userId: 0,
    title: '',
    body: ''
  };

  constructor(private router: Router, private route: ActivatedRoute, private postsService: PostsService) {}

  ngOnInit(): void {
    this.subscription.push(this.route.params.subscribe(params => {
      if (params['id']) {
        this.mode = 'Edit';
        this.postId = parseInt(params['id'], 10);
        this.subscription.push(this.postsService.getPost(this.postId).subscribe(post => {
          this.post = post;
        }));
      } else {
        this.mode = 'Add';
      }
    }));
  }

  onSubmit(): void {
    if (this.mode === 'Add') {
      this.subscription.push(this.postsService.createPost(this.post).subscribe(() => {
        this.router.navigate(['/']);
      }));
    } else if (this.mode === 'Edit') {
      this.subscription.push(this.postsService.updatePost(this.post).subscribe(() => {
        this.router.navigate(['/']);
      }));
    }
  }

  ngOnDestroy(): void {
      this.subscription.forEach(sub => {
        sub.unsubscribe();
      })
  }
}
