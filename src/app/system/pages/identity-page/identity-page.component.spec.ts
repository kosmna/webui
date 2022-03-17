import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule, MatCardModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CopyButtonComponent } from '@app/shared';
import { DeviceManagementService } from '@app/system/services';
import { dmServiceStub } from '@app/test';
import { IdentityPageComponent } from './identity-page.component';

describe('IdentityPageComponent', () => {
  let component: IdentityPageComponent;
  let fixture: ComponentFixture<IdentityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        ClipboardModule,
        MatCardModule,
        MatIconModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      declarations: [ IdentityPageComponent, CopyButtonComponent ],
      providers: [
        { provide: DeviceManagementService, useValue: dmServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
