import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatIconModule, MatCardModule, MatListModule
} from '@angular/material';

import { InfoMemoryPanelComponent } from './info-memory-panel.component';
import { D3ChartComponent } from '@app/shared';
import { NvD3Module } from 'ng2-nvd3';

describe('InfoMemoryPanelComponent', () => {
  let component: InfoMemoryPanelComponent;
  let fixture: ComponentFixture<InfoMemoryPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCardModule,
        MatListModule,
        NvD3Module
      ],
      declarations: [
        InfoMemoryPanelComponent,
        D3ChartComponent,
      ],
      providers: [

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMemoryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
