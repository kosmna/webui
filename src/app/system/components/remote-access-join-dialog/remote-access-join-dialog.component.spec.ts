import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatDialogModule, MatDialogRef } from '@angular/material';
import { dialogRefStub } from '@app/test';
import { RemoteAccessJoinDialogComponent } from './remote-access-join-dialog.component';

describe('RemoteAccessJoinDialogComponent', () => {
  let component: RemoteAccessJoinDialogComponent;
  let fixture: ComponentFixture<RemoteAccessJoinDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      declarations: [ RemoteAccessJoinDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteAccessJoinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
