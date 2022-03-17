import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatahubService } from '@app/datahub/services';
import { CloudConnector } from '@app/datahub';

@Component({
  selector: 'loop-raw-subscription-dialog',
  templateUrl: './raw-subscription-dialog.component.html',
  styleUrls: ['./raw-subscription-dialog.component.css'],
})
export class RawSubscriptionDialogComponent implements OnInit {
  isLoading = false;
  availableCloudConnectors: Array<CloudConnector>;
  subscriptionForm: FormGroup;
  get topics() {
    return this._dataHubService.rawSubscriptions.filter(topic =>
      !!this.data ? topic.name !== this.data.name : true
    );
  }

  constructor(
    public dialogRef: MatDialogRef<any>,
    private _dataHubService: DatahubService,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.subscriptionForm = this._formBuilder.group({
      id: [],
      name: [
        '',
        [Validators.required, this.checkForDuplicateTopics(this.topics)],
      ],
      description: [''],
      cloudConnectorID: ['', [Validators.required]],
      cloudConnectorName: [''],
      cloudConnector: this._formBuilder.group({
        id: [''],
        name: [''],
        uri: [],
      }),
    });
    if (this.data !== (undefined || null)) {
      const connectorDefined = !!this.data.cloudConnector;
      const dataClone = { ...this.data };
      if (!connectorDefined) {
        dataClone.cloudConnector = {
          id: '',
          name: '',
          uri: '',
        };
      }
      this.subscriptionForm.patchValue(dataClone);
      this.connectorSelect();
    }
    this._dataHubService.cloudConnectors$.subscribe(
      connectors => (this.availableCloudConnectors = connectors)
    );
  }

  /**
   * Create new subscription
   *
   * @memberof RawSubscriptionDialogComponent
   */
  submitSubscription() {
    this.isLoading = true;
    this.dialogRef.close(this.subscriptionForm.value);
  }

  /**
   * Check if we create a new or edit existing subscription
   *
   * @readonly
   * @memberof RawSubscriptionDialogComponent
   */
  get isNewSubscription() {
    return this.subscriptionForm.controls['id'].value === (undefined || null);
  }

  /**
   * Sync connector selection
   *
   * @memberof RawSubscriptionDialogComponent
   */
  connectorSelect() {
    this.subscriptionForm.controls['cloudConnectorID'].setValue(
      this.subscriptionForm.controls['cloudConnector'].value.id
    );
    if (this.availableCloudConnectors) {
      this.subscriptionForm.controls['cloudConnectorName'].setValue(
        this.availableCloudConnectors.find(
          connector =>
            connector.id ===
            this.subscriptionForm.controls['cloudConnector'].value.id
        ).name
      );
    }
  }

  checkForDuplicateTopics(validationList: any[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return validationList.some(value => value.name === control.value)
        ? { duplicateName: { value: control.value } }
        : null;
    };
  }
}
