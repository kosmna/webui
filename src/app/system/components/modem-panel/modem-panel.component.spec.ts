import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CdkTableModule } from '@angular/cdk/table';
import { MatIconModule, MatCardModule, MatTableModule, MatTooltipModule } from '@angular/material';

import { ModemPanelComponent } from './modem-panel.component';
import { AddSpacePipe } from '@app/shared/pipes';
import { WifiQualityComponent } from '../wifi-quality';

describe('ModemPanelComponent', () => {
  let component: ModemPanelComponent;
  let fixture: ComponentFixture<ModemPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCardModule,
        CdkTableModule,
        MatTableModule,
        MatTooltipModule,
      ],

      declarations: [
        ModemPanelComponent,
        AddSpacePipe,
        WifiQualityComponent,
       ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModemPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
