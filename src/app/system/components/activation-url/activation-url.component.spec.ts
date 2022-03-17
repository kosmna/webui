import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationUrlComponent } from './activation-url.component';
import { MatListModule, MatInputModule, MatIconModule, MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ActivationUrlComponent', () => {
  let component: ActivationUrlComponent;
  let fixture: ComponentFixture<ActivationUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatListModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        FormsModule,
      ],
      declarations: [ ActivationUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
