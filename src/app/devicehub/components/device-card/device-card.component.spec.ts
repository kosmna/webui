import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatIconModule,
  MatCardModule,
  MatSnackBarModule
} from '@angular/material';
import { ClipboardModule } from 'ngx-clipboard';

import { CopyButtonComponent } from '@app/shared';
import { DeviceCardComponent } from './device-card.component';
import { deviceResponse } from '@app/test';
import { LoopTagDirective } from '@app/shared';
import { I18nTestProviders } from '@app/test/i18n-test.import';

describe('DeviceCardComponent', () => {
  let component: DeviceCardComponent;
  let fixture: ComponentFixture<DeviceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ClipboardModule,
        MatCardModule,
        MatIconModule,
        MatSnackBarModule
      ],
      declarations: [
        CopyButtonComponent,
        DeviceCardComponent,
        LoopTagDirective,
      ],
      providers: [
        ...I18nTestProviders,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(DeviceCardComponent);
    component = fixture.componentInstance;
    component.device = deviceResponse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //  U can use a host test component to test Inputs

  // @Component({
  //   selector: `loop-host-component`,
  //   template: `<loop-device-card [device]="device"></loop-device-card>`
  // })
  // class TestHostComponent {
  //   @ViewChild(DeviceCardComponent)
  //   public componentUnderTestComponent: DeviceCardComponent;
  //   public device: Device = device;
  // }
});
