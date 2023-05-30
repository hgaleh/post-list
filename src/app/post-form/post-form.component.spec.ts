import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormComponent } from './post-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStateService } from '../app-state.service';
import { PostsService } from '../posts.service';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
  const postsService = jasmine.createSpyObj('PostsService', ['test']);
  const router = jasmine.createSpyObj('Router', ['test']);
  const appStateService = jasmine.createSpyObj('AppStateService', ['test']);
  const activatedRoute = jasmine.createSpyObj('ActivatedRoute', ['test']);
  activatedRoute.params = {
    subscribe: (par: any) => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFormComponent ],
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
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
