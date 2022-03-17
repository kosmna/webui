import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';

import { MarketplaceAppComponent } from './marketplace-app.component';
import { TruncatePipe } from '@app/shared/pipes';

describe('MarketplaceAppComponent', () => {
  let component: MarketplaceAppComponent;
  let fixture: ComponentFixture<MarketplaceAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule
      ],
      declarations: [
        MarketplaceAppComponent,
        TruncatePipe
       ],
      providers: [

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
