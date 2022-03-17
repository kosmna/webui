import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePanelComponent } from './template-panel.component';
import { MatCheckboxModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TemplatePanelComponent', () => {
  let component: TemplatePanelComponent;
  let fixture: ComponentFixture<TemplatePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatCheckboxModule,
      ],
      declarations: [ TemplatePanelComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
