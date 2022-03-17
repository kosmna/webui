import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageListComponent } from './storage-list.component';
import { SharedModule } from '@app/shared';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StorageListComponent', () => {
  let component: StorageListComponent;
  let fixture: ComponentFixture<StorageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StorageListComponent],
      imports: [SharedModule, NoopAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageListComponent);
    component = fixture.componentInstance;
    component.mountPoints = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
