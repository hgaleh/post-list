import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSideListComponent } from './right-side-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { AppStateService } from '../app-state.service';

describe('RightSideListComponent', () => {
  let component: RightSideListComponent;
  let fixture: ComponentFixture<RightSideListComponent>;
  const postsService = jasmine.createSpyObj('PostsService', ['getPosts', 'unsubscribePendingRequests']);
  const router = jasmine.createSpyObj('Router', ['test']);
  const appStateService = jasmine.createSpyObj('AppStateService', ['test']);
  appStateService.state$ = {
    subscribe: (par: any) => {
      return {
        unsubscribe: () => {}
      }
    }
  };

  postsService.getPosts.and.returnValue({
    subscribe: (par: any) => {
      return {
        unsubscribe: () => {}
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightSideListComponent ],
      providers: [
        {
          provide: PostsService,
          useValue: postsService
        },
        {
          provide: Router,
          useValue: router
        },
        {
          provide: AppStateService,
          useValue: appStateService
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightSideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
