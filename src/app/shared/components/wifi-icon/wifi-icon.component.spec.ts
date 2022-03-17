import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiIconComponent } from '@app/shared/components/wifi-icon/wifi-icon.component';

describe('WifiIconComponent', () => {
  let component: WifiIconComponent;
  let fixture: ComponentFixture<WifiIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WifiIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WifiIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
