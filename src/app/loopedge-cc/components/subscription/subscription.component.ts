import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from '@app/kosmyna-cc/models';

@Component({
  selector: 'loop-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  @Input() rowHeight: number;
  @Input() enabled: boolean;
  @Input() title: string;
  @Input() subtitle: string;
  @Input()
  actions: Array<{
    icon: string;
    name: string;
    action: (item?: Subscription) => void;
  }>;
  @Input() item: Subscription;
  constructor() {}

  ngOnInit() {}
}
