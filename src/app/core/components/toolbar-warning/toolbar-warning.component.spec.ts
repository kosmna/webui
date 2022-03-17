import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';

import { ToolbarWarningComponent } from './toolbar-warning.component';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('ToolbarWarningComponent', () => {
  let component: ToolbarWarningComponent;
  let fixture: ComponentFixture<ToolbarWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        FlexLayoutModule,

      ],
      declarations: [
        ToolbarWarningComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
