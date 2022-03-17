import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToPageComponent } from './go-to-page.component';
import { MatInputModule, MatPaginator, MatPaginatorModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GoToPageComponent', () => {
  let component: GoToPageComponent;
  let fixture: ComponentFixture<GoToPageComponent>;
  let paginator: ComponentFixture<MatPaginator>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        FormsModule,
        MatPaginatorModule,
      ],
      declarations: [ GoToPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoToPageComponent);
    paginator = TestBed.createComponent(MatPaginator);
    paginator.detectChanges();

    component = fixture.componentInstance;
    component.paginator = paginator.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
