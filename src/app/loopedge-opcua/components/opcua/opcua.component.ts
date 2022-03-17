import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { OpcuaTreeComponent } from '@app/kosmyna-opcua/components/opcua-tree';
import { ITreeNode } from 'angular-tree-component/dist/defs/api';
import { OpcuaNode } from '@app/kosmyna-opcua/models';
import { MatDialog } from '@angular/material';
import { AddNodeComponent } from '@app/kosmyna-opcua/components/add-node';
import {
  CanDeactivateOnModify,
  cosmynaImportService,
} from '@app/kosmyna-opcua/services';
import { cosmynaExchange } from '@app/kosmyna-opcua/classes';
import { CommonDialogComponent } from '@app/shared';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { takeWhile } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromOpc from '../../state';
import * as opcActions from '../../state/opc.actions';

@Component({
  selector: 'loop-opcua',
  templateUrl: './opcua.component.html',
  styleUrls: ['./opcua.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpcuaComponent extends cosmynaExchange
  implements OnInit, CanDeactivateOnModify, OnDestroy {
  options = {};
  selectedNode: ITreeNode;
  treeActions = [
    {
      icon: 'add',
      tooltip: this._i18n('Add node'),
      action: this.showAddNodeDialog.bind(this),
    },
    {
      icon: 'remove',
      tooltip: this._i18n('Remove selected node'),
      action: () => {
        this.recursiveSearchAndDelete(this.selectedNode.path, this.nodes);
        this._tree.update();
        this._isModified = true;
        this._store.dispatch(new opcActions.SelectNode(null));
      },
    },
    {
      icon: 'save',
      tooltip: this._i18n('Save'),
      action: () => {
        this._store.dispatch(
          new opcActions.SaveNodes({
            ...this.recursiveIdCleanup(this.nodes)[0],
          })
        );
        this._isModified = false;
      },
    },
    {
      icon: 'refresh',
      tooltip: this._i18n('Reset hierarchy'),
      action: () => {
        this._matDialog
          .open(CommonDialogComponent, {
            width: '40%',
            minWidth: '320px',
            data: {
              title: this._i18n('Confirmation'),
              content: this._i18n(
                'This will reset the current hierarchy. Are you sure?'
              ),
              submit: this._i18n('No'),
              cancel: this._i18n('Yes'),
              reverseButtons: true,
            },
          })
          .afterClosed()
          .subscribe(response => {
            if (!response) {
              this.nodes = [];
              this._isModified = true;
              this._store.dispatch(new opcActions.SelectNode(null));
              this._changeDetectionRef.markForCheck();
            }
          });
      },
    },
    {
      icon: 'import_export',
      tooltip: this._i18n('Import from cosmyna'),
      action: () => {
        this._matDialog
          .open(CommonDialogComponent, {
            width: '40%',
            minWidth: '320px',
            data: {
              title: this._i18n('Confirmation'),
              content: this._i18n(
                'This will replace the current hierarchy. Are you sure?'
              ),
              submit: this._i18n('No'),
              cancel: this._i18n('Yes'),
              reverseButtons: true,
            },
          })
          .afterClosed()
          .subscribe(response => {
            if (!response) {
              this.cosmynaNodes.subscribe(data => {
                this.nodes = data;
                this._tree.update();
                this._isModified = true;
                this._changeDetectionRef.markForCheck();
              });
            }
          });
      },
    },
  ];
  nodes = [];
  private _isModified: boolean;
  private _componentActive = true;
  get isModified(): boolean {
    return this._isModified;
  }
  get message() {
    return this._i18n(
      'Hierarchy changes have not been saved. Are you sure you want to leave?'
    );
  }
  @ViewChild(OpcuaTreeComponent)
  private _tree: OpcuaTreeComponent;
  constructor(
    private _matDialog: MatDialog,
    private _i18n: I18n,
    protected _cosmynaImportService: cosmynaImportService,
    private _store: Store<fromOpc.State>,
    private _changeDetectionRef: ChangeDetectorRef
  ) {
    super(_cosmynaImportService);
  }

  ngOnInit() {
    this.reloadData();
    this._store
      .pipe(
        takeWhile(() => this._componentActive),
        select(fromOpc.getNodes)
      )
      .subscribe(nodes => {
        this.nodes = nodes;
        this._changeDetectionRef.markForCheck();
      });
    this._store
      .pipe(
        takeWhile(() => this._componentActive),
        select(fromOpc.getSelectedNode)
      )
      .subscribe(node => (this.selectedNode = node));
  }

  ngOnDestroy(): void {
    this._componentActive = false;
  }

  reloadData() {
    this._store.dispatch(new opcActions.LoadNodes());
  }

  /**
   * Select node callback.
   *
   * @param {ITreeNode} node          - Selected node from tree
   * @memberof OpcuaComponent
   */
  selectNode(node: ITreeNode) {
    this._store.dispatch(new opcActions.SelectNode(node));
    // this.selectedNode = node;
  }

  /**
   * Show add node dialog and then if data specified, create one
   *
   * @memberof OpcuaComponent
   */
  showAddNodeDialog() {
    const config = {
      width: '40%',
      minWidth: '320px',
    };
    this._matDialog
      .open(
        AddNodeComponent,
        this.selectedNode ? { ...config, data: this.selectedNode } : config
      )
      .afterClosed()
      .subscribe((node: OpcuaNode) => {
        if (node) {
          this.addNode(node);
          this._isModified = true;
        }
      });
  }

  /**
   * Append new node to the selected node children or to the root.
   *
   * @param {OpcuaNode} node          - New node
   * @memberof OpcuaComponent
   */
  addNode(node: OpcuaNode) {
    if (this.selectedNode) {
      if (node.type === 'DEVICE' && this.selectedNode.data.type === 'DEVICE') {
        this.selectedNode.parent.data.children.push(node);
      } else {
        if (!this.selectedNode.data.children) {
          this.selectedNode.data.children = [];
        }
        this.selectedNode.data.children.push(node);
      }
    } else {
      this.nodes.push(node);
    }
    this._tree.update();
    this._store.dispatch(new opcActions.SelectNode(this._tree.getActiveNode()));
    this._changeDetectionRef.markForCheck();
  }

  /**
   * Update node and then whole tree.
   *
   * @param {OpcuaNode} node        - Updated node
   * @memberof OpcuaComponent
   */
  updateNode(node: OpcuaNode) {
    this.recursiveSearchAndUpdate(this.selectedNode.path, this.nodes, node);
    this._tree.update();
    this._store.dispatch(new opcActions.SelectNode(this._tree.getActiveNode()));
    this._isModified = true;
    this._changeDetectionRef.markForCheck();
  }

  /**
   * Find and update node.
   *
   * @param {string[]} ids          - Array of node identifiers in path
   * @param {OpcuaNode[]} nodes     - Nodes list to search through
   * @param {OpcuaNode} newNode     - Updated node
   * @memberof OpcuaComponent
   */
  recursiveSearchAndUpdate(
    ids: string[],
    nodes: OpcuaNode[],
    newNode: OpcuaNode
  ) {
    const id = ids.shift();
    const index = nodes.findIndex(item => item.id === id);
    if (id !== newNode.id && nodes[index].children) {
      this.recursiveSearchAndUpdate(ids, nodes[index].children, newNode);
    } else {
      nodes[index] = newNode;
    }
  }

  /**
   * Find and remove selected node from nodes array.
   *
   * @param {string[]} ids        - Array of node identifiers in path
   * @param {OpcuaNode[]} nodes   - Nodes list to search through
   * @memberof OpcuaComponent
   */
  recursiveSearchAndDelete(ids: string[], nodes: OpcuaNode[]) {
    const id = ids.shift();
    const index = nodes.findIndex(item => item.id === id);
    if (ids.length !== 0) {
      this.recursiveSearchAndDelete(ids, nodes[index].children);
    } else {
      nodes.splice(index, 1);
    }
  }

  /**
   * Convert node id to string from number.
   *
   * @param {OpcuaNode[]} nodes     - Opcua nodes array
   * @returns                       - Transformed Opcua nodes array
   * @memberof OpcuaComponent
   */
  recursiveIdCleanup(nodes: OpcuaNode[]) {
    const cleanedNodes = [];
    nodes.forEach(node => {
      cleanedNodes.push({
        ...node,
        id: node.id.toString(),
        children: this.recursiveIdCleanup(node.children || []),
      });
    });
    return cleanedNodes;
  }

  /**
   * Calculate displayed columns based on selected node data fields.
   *
   * @readonly
   * @memberof OpcuaComponent
   */
  get displayColumns() {
    return this.selectedNode ? Object.keys(this.selectedNode.data) : [];
  }
}
