import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatIconModule } from '@angular/material';

import { AppLogComponent } from './app-log.component';
import { DotLoadersComponent } from '@app/shared';
describe('AppLogComponent', () => {
  let component: AppLogComponent;
  let fixture: ComponentFixture<AppLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule
      ],
      declarations: [
        AppLogComponent,
        DotLoadersComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('download button should not be visible if Text is empty', () => {
    component.log = '';
    fixture.detectChanges();
    const el = fixture.debugElement.nativeElement;
    expect(el.querySelector('#download-button')).toBe(null);
  });

  it('expand button should not be visible if Text is empty', () => {
    component.log = '';
    fixture.detectChanges();
    const el = fixture.debugElement.nativeElement;
    expect(el.querySelector('#expand-button')).toBe(null);
  });

});
