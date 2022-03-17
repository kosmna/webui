import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatSnackBarModule
} from '@angular/material';
import { ClipboardModule } from 'ngx-clipboard';

import { CopyButtonComponent } from '@app/shared';
import { RemoteAccessCardComponent } from './remote-access-card.component';
import { LoopTagDirective } from '@app/shared';
import { apiResponseZrotierNetwork } from '@app/system/models';

describe('RemoteAccessCardComponent', () => {
  let component: RemoteAccessCardComponent;
  let fixture: ComponentFixture<RemoteAccessCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        ClipboardModule,
        MatSnackBarModule
      ],
      declarations: [
        RemoteAccessCardComponent,
        LoopTagDirective,
        CopyButtonComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteAccessCardComponent);
    component = fixture.componentInstance;
    component.network = apiResponseZrotierNetwork[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
