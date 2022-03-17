import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule, MatButtonModule, MatIconModule, MatDialogModule } from '@angular/material';
import { Router } from '@angular/router';

import { LoopNotificationsListComponent } from '@app/loop-notifications/loop-notifications-list/loop-notifications-list.component';
import { SharedModule } from '@app/shared';
import { NotificationsService } from '@app/loop-notifications/services';
import { routerServiceStub } from '@app/test';

describe('LoopNotificationsListComponent', () => {
  let component: LoopNotificationsListComponent;
  let fixture: ComponentFixture<LoopNotificationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        SharedModule,
        MatListModule,
        MatButtonModule,
        MatIconModule
      ],
      declarations: [ LoopNotificationsListComponent ],
      providers: [
        NotificationsService,
        { provide: Router, useValue: routerServiceStub },

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopNotificationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
