import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { routerServiceStub } from '@app/test';
import { LoaderService } from '@app/loop-loader/services';
import { TableViewComponent } from './table-view.component';
import { LoopTagDirective } from '@app/shared';
describe('TableViewComponent', () => {
  let component: TableViewComponent;
  let fixture: ComponentFixture<TableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatTableModule,
        CdkTableModule,
        MatMenuModule,
        MatIconModule,
      ],
      declarations: [TableViewComponent, LoopTagDirective],
      providers: [
        LoaderService,
        { provide: Router, useValue: routerServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableViewComponent);
    component = fixture.componentInstance;
    component.applications = [];
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
