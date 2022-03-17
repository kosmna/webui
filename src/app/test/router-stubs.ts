import { Component, Directive, Input, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Event } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'router-outlet',
  template: 'stub',
})
export class RouterOutletStubComponent {
  @Input() menuItems: any;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()',
  },
})
export class RouterLinkStubDirective {
  @Input() routerLink: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.routerLink;
  }
}
const events: BehaviorSubject<Event> = new BehaviorSubject({
  id: 3,
  url: '/login',
  urlAfterRedirects: '/login',
});

export const routerServiceStub = {
  events,
  currentRoute: '/',

  navigate(route: string) {
    this.currentRoute = route;
  },

  isActive(route: string, exact: boolean) {
    if (exact) {
      return this.currentRoute === route;
    } else {
      return this.currentRoute.includes(route);
    }
  },
};

export const activatedRouteStub = {
  get paramMap() {
    return of({
      get: name => 'add-on-name',
    });
  },
  get snapshot() {
    return {
      paramMap: {
        get: _ => 'test',
      },
    };
  },
};
