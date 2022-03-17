import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiQualityComponent } from './wifi-quality.component';

describe('WifiQualityComponent', () => {
  let component: WifiQualityComponent;
  let fixture: ComponentFixture<WifiQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WifiQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WifiQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
