import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { EdgeAppService } from '@app/marketplace/services';
import { MarketplaceApp, SelectVersion, DefualtInputs, ConfigInput, MarketplaceDialogData } from '@app/marketplace/models';
import { LoaderService } from '@app/loop-loader/services';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'loop-marketplace-dialog',
  templateUrl: './marketplace-dialog.component.html',
  styleUrls: ['./marketplace-dialog.component.scss']
})
/** TODO: Investigate  angular-markdown ReadMe error */
export class MarketplaceDialogComponent implements OnInit {
  // set default options
  isLoading: Observable<boolean>;
  defualtInputs = DefualtInputs;
  app: MarketplaceApp;
  versionForm: FormGroup;
  inputs: ConfigInput[];
  readme: string;
  messageTitle: string;
  messageCaption: string;
  isLoadingParams = false;
  paramsForm: FormGroup = new FormGroup({});
  version: SelectVersion = { label: this._i18n('Choose an installation script version'), options: [] };


  private marketplaceID: string;
  constructor(public dialogRef: MatDialogRef<MarketplaceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public _data: MarketplaceDialogData,
              private _edgeService: EdgeAppService,
              private _fb: FormBuilder,
              private _loader: LoaderService,
              private _i18n: I18n
              ) {
    this.versionForm = _fb.group({
      'version': [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
    this.app = this._data.app;
    this.marketplaceID = this._data.marketplaceID;
    this.getAppDetail(this.marketplaceID, this.app.id);
    this.versionForm.valueChanges
      .subscribe(form => {
        this.getAppVDetails(form.version);
      });

    this.isLoading = this._loader.isLoading$;
    /*
    * is able close outside when dialog is loading/ making api call
    */
    this.isLoading
    .subscribe((res: boolean) => {
      this.dialogRef.disableClose = res;
    });

  }

  getAppDetail(mpID: string, appID: string): void {
    this._edgeService.getMarketplaceAppDetails(mpID, appID)
      .subscribe((res: MarketplaceApp) => {
        // check if installation is an array
        if (res.installationScriptVersions instanceof Array) {
          const versions = res.installationScriptVersions;
          this.version.options = versions;
        }
      });
  }

  /**
   * Grab readME and app configs based on version
   */
  getAppVDetails(version: string): void {
    this.isLoadingParams = true;
    this._edgeService.getAppReadme(this.marketplaceID, this.app.id, version)
      .subscribe(res => this.readme = res );

    this._edgeService.getAppParams(this.marketplaceID, this.app.id, version)
      .subscribe((inputs: ConfigInput[]) => {
        this.inputs = [];
        this.inputs.push(...this.defualtInputs);
        this.inputs.push(...inputs);
        this.isLoadingParams = false;
        this.paramsForm = this.makeFormGroup(this.inputs);
      });
  }

  makeFormGroup(inputs: ConfigInput[]): FormGroup {
    const group: any = {};
    inputs.forEach((input: ConfigInput) => {
      group[input.variable] = input.required ? new FormControl(input.default || '', Validators.required)
        : new FormControl(input.default || '');
    });
    return new FormGroup(group);
  }

  /**
   * Submit Form
   * */
  onSubmit(): void {
    const appParams = this.paramsForm.value;
    const versionId = this.versionForm.value.version;
    this.isLoadingParams = true;
    this._edgeService.launchMarketplaceApp(this.marketplaceID, this.app.id, versionId, appParams)
      .pipe(
        finalize(() => this.isLoadingParams = false)
      )
      .subscribe(() => {
        this.messageTitle = this._i18n('App Has Successfully Launched.');
      });

  }
}
