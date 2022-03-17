import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateInfoComponent } from './certificate-info.component';
import { SharedModule } from '@app/shared';
import { MAT_DIALOG_DATA } from '@angular/material';

describe('CertificateInfoComponent', () => {
  let component: CertificateInfoComponent;
  let fixture: ComponentFixture<CertificateInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [CertificateInfoComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
