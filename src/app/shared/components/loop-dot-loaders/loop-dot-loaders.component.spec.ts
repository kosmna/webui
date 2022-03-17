import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotLoadersComponent } from '@app/shared/components/loop-dot-loaders/loop-dot-loaders.component';

describe('DotLoadersComponent', () => {
  let component: DotLoadersComponent;
  let fixture: ComponentFixture<DotLoadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotLoadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotLoadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
