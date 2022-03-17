import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyContainerComponent } from './key-container.component';
import { MatIconModule, MatSnackBarModule } from '@angular/material';
import { CopyButtonComponent } from '@app/shared/components/copy-button';
import { ClipboardModule } from 'ngx-clipboard';

describe('KeyContainerComponent', () => {
  let component: KeyContainerComponent;
  let fixture: ComponentFixture<KeyContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        ClipboardModule,
        MatSnackBarModule,
      ],
      declarations: [
        KeyContainerComponent,
        CopyButtonComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
