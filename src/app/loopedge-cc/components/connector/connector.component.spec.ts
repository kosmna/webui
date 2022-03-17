import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorComponent } from '@app/kosmyna-cc/components/connector/connector.component';
import { SharedModule } from '@app/shared';

describe('ConnectorComponent', () => {
  let component: ConnectorComponent;
  let fixture: ComponentFixture<ConnectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ConnectorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
