import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { AddOn, Field, Operation } from '@app/dynamic/models';
import { AddOnsService } from '@app/dynamic/services/add-ons.service';
import { GenericSource } from '@app/dynamic/add-on/generic-source.datasource';
import { CommonDialogComponent } from '@app/shared/components';
import { ElementsDialogComponent } from '@app/dynamic/elements-dialog';
import { AddDialogComponent } from '@app/dynamic/add-dialog';

@Component({
  selector: 'loop-add-on',
  templateUrl: './add-on.component.html',
  styleUrls: ['./add-on.component.css']
})
export class AddOnComponent implements OnInit {

  addOnConfig: AddOn;
  initState: any;
  displayedColumns = [];
  datasource: GenericSource | null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _addOnsService: AddOnsService,
    private _mdDialog: MatDialog
  ) { }

  ngOnInit() {
    this._activatedRoute.paramMap
      .subscribe(parametersMap => this.getAddOnDefinition(parametersMap.get('name')));
  }

  /**
   * Fetch add-on definition from API
   *
   * @param {string} name
   * @memberof AddOnComponent
   */
  getAddOnDefinition(name: string) {
    this._addOnsService.getAddonConfig(name)
      .subscribe(addOnConfig => {
        this.addOnConfig = addOnConfig;
        this.initAddon();
      });
  }

  /**
   * Add-on initialization
   *
   * @memberof AddOnComponent
   */
  initAddon() {
    const init = this.addOnConfig.operations.find(operation => operation.name === 'init');
    switch (init.type) {
      case 'GET':
        this._addOnsService.addOnGetRequest(this.addOnConfig.endpoint + init.path)
          .subscribe(result => this.setState(result));
        break;
      default:
        break;
    }
    this.initTable();
  }

  /**
   * Initialize the table part
   *
   * @memberof AddOnComponent
   */
  initTable() {
    const tableConfig = this.addOnConfig.model.find(element => element.type === 'table');
    if (tableConfig) {
      const getOperation = tableConfig.operations.find(element => element.name === 'read');
      this.displayedColumns = tableConfig.columns;
      switch (getOperation.type) {
        case 'GET':
          this.datasource = new GenericSource(this._addOnsService.addOnGetRequest(this.addOnConfig.endpoint + getOperation.path));
          break;
        default:
          break;
      }
    }
  }

  /**
   * Set add-on state, mostly for init
   *
   * @param {*} data
   * @memberof AddOnComponent
   */
  setState(data: any) {
    const keys = Object.keys(data);
    keys.forEach(key => {
      const parameter = this.addOnConfig.model.find(field => field.parameter === key);
      parameter.parameterValue = data[key];
    });
  }

  /**
   * Toggle parameter for button toggle element
   *
   * @param {Field} field
   * @memberof AddOnComponent
   */
  buttonToggle(field: Field) {
    const operation = field.operations.find(selectedOperation => selectedOperation.name === (field.parameterValue ? 'off' : 'on'));
    switch (operation.type) {
      case 'PUT':
        this._addOnsService.addOnPutRequest(this.addOnConfig.endpoint + operation.path)
          .subscribe(() => field.parameterValue = !field.parameterValue);
        break;
      default:
        break;
    }
  }

  /**
   * Toggle parameter for slide toggle element
   *
   * @param {Field} field
   * @memberof AddOnComponent
   */
  slideToggle(field: Field) {
    const operation = field.operations.find(selectedOperation => selectedOperation.name === (field.parameterValue ? 'off' : 'on'));
    switch (operation.type) {
      case 'PUT':
        this._addOnsService.addOnPutRequest(this.addOnConfig.endpoint + operation.path)
          .subscribe(() => field.parameterValue = !field.parameterValue);
        break;
      default:
        break;
    }
  }

  /**
   * Unique list of sections
   *
   * @readonly
   * @memberof AddOnComponent
   */
  get sections() {
    return new Set(this.addOnConfig.model.map(element => element.section));
  }

  /**
   * Returns true if current section contains table
   *
   * @param {string} section
   * @returns {boolean}
   * @memberof AddOnComponent
   */
  isTableSection(section: string) {
    return this.addOnConfig.model
      .filter(element => element.section === section)
      .map(element => element.type)
      .includes('table');
  }

  /**
   * Capitalize string
   *
   * @param {string} input
   * @returns {string}
   * @memberof AddOnComponent
   */
  capitalize(input: string) {
    return input[0].toUpperCase() + input.substr(1);
  }

  /**
   * List of table row actions excluding 'read'
   *
   * @param {string} section
   * @returns {Array}
   * @memberof AddOnComponent
   */
  tableSectionOperations(section: string) {
    return this.addOnConfig.model
      .find(element => element.section === section)
      .operations.filter(operation => operation.name !== 'read' && operation.name !== 'add');
  }

  /**
   * Get table add operation from operations
   *
   * @param {string} section
   * @returns {Operation}
   * @memberof AddOnComponent
   */
  tableSectionAddOperation(section: string) {
    return this.addOnConfig.model
      .find(element => element.section === section)
      .operations.find(operation => operation.name === 'add');
  }

  /**
   * Perform action for table row
   *
   * @param {Operation} operation
   * @param {*} parameters
   * @memberof AddOnComponent
   */
  tableAction(operation: Operation, parameters: any) {
    let params;
    switch (operation.type) {
      case 'PUT':
        params = operation.parameters.map(parameter => parameters[parameter]);
        this._addOnsService.addOnPutRequest(this.addOnConfig.endpoint + operation.path, params)
          .subscribe(result => {
            if (result) {
              this._mdDialog.open(ElementsDialogComponent, { width: '40%', data: result });
            } else {
              this._mdDialog.open(ElementsDialogComponent, { width: '40%', data: 'Success' });
            }
          });
        break;
      case 'DELETE':
        params = operation.parameters.map(parameter => parameters[parameter]);
        this._mdDialog.open(CommonDialogComponent, { width: '40%', data: { title: 'Confirmation', content: 'Are you sure?' } })
          .afterClosed()
          .subscribe(result => {
            if (result) {
              this._addOnsService.addOnDeleteRequest(this.addOnConfig.endpoint + operation.path, params)
              .subscribe(() => {
                this.datasource.dataChanged = true;
              });
            }
          });
        break;
      case 'POST':
        this._addOnsService.addOnPostRequest(this.addOnConfig.endpoint + operation.path, parameters)
          .subscribe(result => {
            if (result) {
              this.datasource.dataChanged = true;
              this._mdDialog.open(ElementsDialogComponent, { width: '40%', data: result });
            }
          });
        break;
      default:
        break;
    }
  }

  /**
   * Check if section have add operation
   *
   * @param {string} section
   * @returns {booleat}
   * @memberof AddOnComponent
   */
  allowAdd(section: string) {
    return this.isTableSection(section) &&
      this.addOnConfig.model.find(model => model.section === section)
        .operations.map(operation => operation.name)
        .includes('add');
  }

  /**
   * Execute add operation
   *
   * @param {string} section
   * @memberof AddOnComponent
   */
  addOperation(section: string) {
    const operation = this.tableSectionAddOperation(section);
    this._mdDialog.open(AddDialogComponent, { width: '40%', data: operation })
      .afterClosed()
      .subscribe(value => {
        if (value) {
          this.tableAction(operation, value);
        }
      });
  }

}
