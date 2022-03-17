import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingTemplateComponent } from './loading-template.component';
import { MatProgressSpinnerModule } from '@angular/material';

describe('LoadingTemplateComponent', () => {
  let component: LoadingTemplateComponent;
  let fixture: ComponentFixture<LoadingTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatProgressSpinnerModule,
      ],
      declarations: [ LoadingTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
