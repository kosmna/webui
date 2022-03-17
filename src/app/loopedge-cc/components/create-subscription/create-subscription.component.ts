import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'loop-create-subscription',
  templateUrl: './create-subscription.component.html',
  styleUrls: ['./create-subscription.component.scss'],
})
export class CreateSubscriptionComponent implements OnInit {
  subscriptionForm: FormGroup;
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.subscriptionForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: [],
      enabled: [false],
    });
  }
}
