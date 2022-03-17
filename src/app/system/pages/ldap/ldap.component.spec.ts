import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule,
  MatTableModule,
  MatMenuModule,
  MatDialog,
  MatDialogModule,
  MatIconModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

import { LdapComponent } from './ldap.component';
import { DemoAuthService } from '@app/core/services';
import { authServiceStub } from '@app/test';
import { I18nTestProviders } from '@app/test/i18n-test.import';

describe('LdapComponent', () => {
  let component: LdapComponent;
  let fixture: ComponentFixture<LdapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        MatCardModule,
        MatTableModule,
        MatMenuModule,
        MatDialogModule,
        MatIconModule
      ],
      declarations: [ LdapComponent ],
      providers: [
        MatDialog,
        { provide: DemoAuthService, useValue: authServiceStub },
        ...I18nTestProviders,

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
