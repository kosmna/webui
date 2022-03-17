import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  MatCardModule,
  MatIconModule
} from '@angular/material';

import { LoaderService } from '@app/loop-loader/services';
import { routerServiceStub } from '@app/test';
import { LoopTagDirective } from '@app/shared';
import { GridViewComponent } from './grid-view.component';

describe('GridViewComponent', () => {
  let component: GridViewComponent;
  let fixture: ComponentFixture<GridViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule
      ],
      declarations: [
        GridViewComponent,
        LoopTagDirective
      ],
      providers: [
        LoaderService,
        { provide: Router, useValue: routerServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
