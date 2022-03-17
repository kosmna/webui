import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  AuthenticationTypes,
  AuthenticationType,
  SecurityPolicies,
  SecurityPolicy,
} from '@app/kosmyna-opcua/models';

@Component({
  selector: 'loop-authentication-types',
  templateUrl: './authentication-types.component.html',
  styleUrls: ['./authentication-types.component.scss'],
})
export class AuthenticationTypesComponent implements OnInit {
  @Input()
  authenticationTypes: AuthenticationType[];

  @Output()
  updateAuthenticationTypes = new EventEmitter<AuthenticationType[]>();

  constructor() {}

  ngOnInit() {}

  get availableTypes() {
    const types = [];
    for (const key in AuthenticationTypes) {
      if (key) {
        types.push(key);
      }
    }
    return types;
  }

  get availablePolicies() {
    const policies = [];
    for (const policy in SecurityPolicies) {
      if (policy) {
        policies.push(policy);
      }
    }
    return policies;
  }

  getTypeDescription(typeName: string) {
    return this.authenticationTypes.find(
      item => item.Authentication === typeName
    );
  }

  checkPolicies(authenticationType: string, policy: string) {
    const typeDescription = this.getTypeDescription(authenticationType);
    return (
      !!typeDescription &&
      typeDescription.EnabledPolicies.some(item => item.name === policy)
    );
  }

  toggleAuthenticationType(typeName: AuthenticationTypes) {
    const currentStatus = this.authenticationTypes.some(
      item => item.Authentication === typeName
    );
    if (currentStatus) {
      this.updateAuthenticationTypes.emit(
        this.authenticationTypes.filter(
          item => item.Authentication !== typeName
        )
      );
    } else {
      const types = [
        ...this.authenticationTypes,
        { Authentication: typeName, EnabledPolicies: [] },
      ];
      this.updateAuthenticationTypes.emit(types);
    }
  }

  toggleEnabledPolicies(
    typeName: SecurityPolicy,
    authenticationType: string,
    enable: boolean
  ) {
    if (
      !this.authenticationTypes.some(
        item => item.Authentication === authenticationType
      )
    ) {
      return;
    }
    const affectedType = this.authenticationTypes.find(
      item => item.Authentication === authenticationType
    );
    affectedType.EnabledPolicies = enable
      ? [...affectedType.EnabledPolicies, { name: typeName }]
      : affectedType.EnabledPolicies.filter(item => item.name !== typeName);
    this.updateAuthenticationTypes.emit(this.authenticationTypes);
  }
}
