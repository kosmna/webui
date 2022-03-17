import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcuaClientsComponent } from './opcua-clients.component';
import { SharedModule } from '@app/shared';

describe('OpcuaClientsComponent', () => {
  let component: OpcuaClientsComponent;
  let fixture: ComponentFixture<OpcuaClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [OpcuaClientsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcuaClientsComponent);
    component = fixture.componentInstance;
    component.clients = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
