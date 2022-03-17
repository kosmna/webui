import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ZerotierNetwork, ZerotierNetworkStatus, ZerotierNetworkType,  } from '@app/system/models';
@Component({
  selector: 'loop-remote-access-card',
  templateUrl: './remote-access-card.component.html',
  styleUrls: ['./remote-access-card.component.scss']
})
export class RemoteAccessCardComponent implements OnInit {
  /**
   * TODO: Make all return methods into get methods
   */
  @Input() network: ZerotierNetwork;
  @Output() leaveNetwork: EventEmitter<string> = new EventEmitter();
  okStatus: string = ZerotierNetworkStatus[ZerotierNetworkStatus.OK] as string;
  get status() {
    let status = this.network.status as string;
    if (status.includes('_')) {
      status = status.replace(/_/g, ' ');
    }
    return status;
  }
  constructor() { }

  ngOnInit() {}

  getNetworkStatus(statusKey: number): string {
    return ZerotierNetworkStatus[statusKey];
  }

  clickLeaveNetwork(): void {
    this.leaveNetwork.emit(this.network.id);
  }

  typeIsPublic(type: ZerotierNetworkType): boolean {
    return type === ZerotierNetworkType.PUBLIC;
  }

  getTagColor(status: any): string {
    return status === this.okStatus ? 'enabled' : 'disabled';
  }

  headerClass(status: any): string {
    return status === ZerotierNetworkStatus[ZerotierNetworkStatus.OK] ?
    'network-card__header--enabled-top-border' : 'network-card__header--disabled-top-border';
  }
}
