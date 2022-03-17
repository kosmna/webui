import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumesListComponent } from './volumes-list.component';
import { SharedModule } from '@app/shared';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('VolumesListComponent', () => {
  let component: VolumesListComponent;
  let fixture: ComponentFixture<VolumesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [VolumesListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
