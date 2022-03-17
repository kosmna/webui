import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { DeviceManagementService } from '@app/system/services';
import { CrtStore } from '@app/system/models';
import { flatMap, finalize } from 'rxjs/operators';
import { CertstoreDetailDialogComponent } from '../certstore-detail-dialog/certstore-detail-dialog.component';

@Component({
  selector: 'loop-certificates-certstore',
  templateUrl: './certificates-certstore.component.html',
  styleUrls: ['./certificates-certstore.component.scss']
})
export class CertificatesCertstoreComponent implements OnInit {
  // file input
  @ViewChild('fileInput') fileInput: ElementRef;
  accept = '';
  disabled = false;
// table
  dataSource: MatTableDataSource<CrtStore>;
  certificates: CrtStore[];
  columnsDef: string[] = ['valid', 'issuer', 'notBefore', 'notAfter', 'subject', 'actions'];
  constructor(
    private _dmService: DeviceManagementService,
    public matDialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.populateTable();
  }

  populateTable(): void {
    this._dmService.getCrtStore()
    .subscribe((certificates: CrtStore[]) => {
      this.dataSource.data = certificates;
    });
  }
  /**
   * Get session ID then upload file
   *
   * @param {*} ev
   * @memberof CertificatesCertstoreComponent
   */
  uploadFile(event: any): void {
    const fileList: any = event.target || event.srcElement;
    if (fileList.files && fileList.files.length > 0) {
         // Plus 20% increase
      const size = fileList.files[0].size + Math.round(fileList.files[0].size * .25);
      this._dmService.createCrtStoreUploadSession({size: size})
      .pipe(
        flatMap((sessionId) => this._dmService.uploadCrtStore(sessionId.id, fileList.files[0])),
        finalize(() => this.clearFileInput())
      )
      .subscribe(_ => {
        // file has successfully uploaded
        this.populateTable();
      });
    }

  }
  /**
   * Remove a custom certificate
   *
   * @param {string} id
   * @memberof CertificatesCertstoreComponent
   */
  removeFile(id: string): void {
    this._dmService.deleteCrtStore(id)
    .subscribe(_ => {
      this.populateTable();
    });
  }
  /**
   * Clear input tag's value
   *
   * @memberof CertificatesCertstoreComponent
   */
  clearFileInput(): void {
    this.fileInput.nativeElement.value = null;
  }
  /**
   * Open detail dialog with extra info
   *
   * @param {string} id
   * @memberof CertificatesCertstoreComponent
   */
  moreDetails(id: string): void {
    this._dmService.getCrtStoreDetail(id)
    .subscribe((details: CrtStore) => {
      this.matDialog.open(CertstoreDetailDialogComponent, {
        data: details
      });

    });
  }
  /**
   * Checks if not before  date is valid
   *
   * @param {string} stringDate
   * @returns {boolean}
   * @memberof CertificatesCertstoreComponent
   */
  notBeforeDateCheck(stringDate: string ): boolean {
    const beforeDate = new Date(stringDate);
    const today = new Date();
    return today > beforeDate;
  }
/**
 * Checks not after date if it's valid
 *
 * @param {*} stringDate
 * @returns {boolean}
 * @memberof CertificatesCertstoreComponent
 */
  notAfterDateCheck(stringDate: string): boolean {
    const afterDate = new Date(stringDate);
    const today = new Date();
    return today  < afterDate;
  }
  /**
   * Checks if certificate is valid
   *
   * @param {*} certificate
   * @returns {boolean}
   * @memberof CertificatesCertstoreComponent
   */
  isCertificateValid(certificate: CrtStore): boolean {
    const { notBefore, notAfter } = certificate;
    return this.notBeforeDateCheck(notBefore) && this.notAfterDateCheck(notAfter);
  }
}
