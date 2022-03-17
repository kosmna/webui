import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { LoopPaginatorComponent } from '@app/shared/components/loop-paginator/loop-paginator.component';

describe('LoopPaginatorComponent', () => {
  let component: LoopPaginatorComponent;
  let fixture: ComponentFixture<LoopPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxPaginationModule,
        MatButtonModule,
        MatIconModule
      ],
      declarations: [ LoopPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
