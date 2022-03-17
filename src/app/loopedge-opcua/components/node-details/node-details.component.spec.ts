import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDetailsComponent } from './node-details.component';
import { SharedModule } from '@app/shared';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  Favicon_Config,
  BROWSER_FAVICONS_CONFIG,
  Favicons,
  FaviconService,
} from '@app/core';

describe('NodeDetailsComponent', () => {
  let component: NodeDetailsComponent;
  let fixture: ComponentFixture<NodeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [NodeDetailsComponent],
      providers: [
        { provide: BROWSER_FAVICONS_CONFIG, useValue: Favicon_Config },
        { provide: Favicons, useClass: FaviconService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDetailsComponent);
    component = fixture.componentInstance;
    component.node = {
      name: 'name',
      data: {
        data: {},
      },
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
