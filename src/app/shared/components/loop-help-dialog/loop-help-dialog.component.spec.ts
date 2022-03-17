import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatIconModule,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material';

import { dialogRefStub } from '@app/test';
import { LoopHelpDialogComponent } from '@app/shared/components/loop-help-dialog/loop-help-dialog.component';
import { NgxMdModule } from 'ngx-md';

describe('LoopHelpDialogComponent', () => {
  let component: LoopHelpDialogComponent;
  let fixture: ComponentFixture<LoopHelpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, NgxMdModule, MatDialogModule],
      declarations: [LoopHelpDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { content: '# Markdown content' },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopHelpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
