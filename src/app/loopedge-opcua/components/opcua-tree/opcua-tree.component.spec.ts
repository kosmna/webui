import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcuaTreeComponent } from './opcua-tree.component';
import { SharedModule } from '@app/shared';

describe('OpcuaTreeComponent', () => {
  let component: OpcuaTreeComponent;
  let fixture: ComponentFixture<OpcuaTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [OpcuaTreeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcuaTreeComponent);
    component = fixture.componentInstance;
    component.nodeList = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
