import { Component, OnInit, ViewChild } from '@angular/core';
import { cosmynaService } from '@app/cosmyna/services';
import {
  Device,
  RegistersUpload,
  MultiRegisterUpload,
} from '@app/cosmyna/models';
import { ITreeOptions, TREE_ACTIONS } from 'angular-tree-component';
import { MatSelect, MatDialogRef } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'loop-browse-tag-dialog',
  templateUrl: './browse-tag-dialog.component.html',
  styleUrls: ['./browse-tag-dialog.component.scss'],
})
export class BrowseTagDialogComponent implements OnInit {
  @ViewChild(MatSelect)
  device: MatSelect;
  devices: Device[];
  selectedDevice: Device;
  tags: any;
  selectedData: any[] = [];

  options: ITreeOptions = {
    useCheckbox: true,
    useTriState: true,
    displayField: 'name',
    hasChildrenField: 'children',
    actionMapping: {
      mouse: {
        click: TREE_ACTIONS.TOGGLE_SELECTED,
      },
    },
  };

  constructor(
    private _cosmynaService: cosmynaService,
    public dialogRef: MatDialogRef<BrowseTagDialogComponent>
  ) {}

  ngOnInit(): void {
    this._cosmynaService
      .getDevices()
      .pipe(map(x => x.filter(b => b['deviceType']['name'] === 'OPCUA')))
      .subscribe(devices => {
        this.devices = devices;
      });
  }

  getTags(device): void {
    this.selectedDevice = device;
    this._cosmynaService.browseTags(device.id).subscribe(tags => {
      this.tags = tags;
    });
  }

  select(ev): void {
    const node = ev.node.data;
    this.selectedData.push(node);
  }

  deselect(ev): void {
    const node = ev.node.data;
    const index = this.selectedData.findIndex(x => x === node);
    if (index > -1) {
      this.selectedData.splice(index, 1);
    }
  }

  onSubmit(): void {
    const registers = this.prepareTags();
    const {
      id: deviceId,
      name: deviceName,
      driver: { name: driverName },
    } = this.selectedDevice;

    const output: MultiRegisterUpload = {
      deviceId,
      deviceName,
      driverName,
      registers,
    };

    this.dialogRef.close(output);
  }

  private prepareTags(): RegistersUpload[] {
    return this.selectedData
      .map(node => {
        return {
          name: node.tag,
          description: node.description,
          properties: {
            valueType: node.type,
          },
          tagName: node.tag,
        };
      })
      .filter(x => x.properties.valueType !== undefined);
  }
}
