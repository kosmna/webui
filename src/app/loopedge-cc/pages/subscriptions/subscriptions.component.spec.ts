import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsComponent } from './subscriptions.component';
import { SharedModule } from '@app/shared';
import { SubscriptionComponent } from '@app/kosmyna-cc/components';
import { routerServiceStub, RouterLinkStubDirective } from '@app/test';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import * as fromIntegration from '../../state/integration.reducer';

describe('SubscriptionsComponent', () => {
  let component: SubscriptionsComponent;
  let fixture: ComponentFixture<SubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('integration', fromIntegration.reducer),
      ],
      declarations: [
        SubscriptionsComponent,
        SubscriptionComponent,
        RouterLinkStubDirective,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ 0: { subscriptions: [], instance: { config: '{}' } } }),
            paramMap: of({
              get(paramName: string) {
                return paramName;
              },
            }),
          },
        },
        { provide: Router, useValue: routerServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
