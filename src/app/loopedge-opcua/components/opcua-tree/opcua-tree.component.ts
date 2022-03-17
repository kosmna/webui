import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  TreeComponent,
  ITreeOptions,
  IActionMapping,
} from 'angular-tree-component';
import { ITreeNode } from 'angular-tree-component/dist/defs/api';

@Component({
  selector: 'loop-opcua-tree',
  templateUrl: './opcua-tree.component.html',
  styleUrls: ['./opcua-tree.component.scss'],
})
export class OpcuaTreeComponent implements OnInit {
  @Input()
  nodeList: Array<ITreeNode>;
  @Input()
  options: ITreeOptions;
  @Output()
  selectNode = new EventEmitter<ITreeNode>();
  @ViewChild(TreeComponent)
  private _tree: TreeComponent;
  constructor() {}

  ngOnInit() {
    const actionMapping: IActionMapping = {
      mouse: {
        contextMenu: (tree, node, $event: MouseEvent) => {
          $event.preventDefault();
        },
      },
    };
    this.options = {
      actionMapping,
      allowDrag: node => node.isLeaf,
      allowDrop: (element, { parent, index }) => {
        return parent.hasChildren;
      },
    };
  }

  nodeActivate(event) {
    this.selectNode.emit(event.node);
  }

  nodeDeactivate(event) {
    this.selectNode.emit(null);
  }

  update() {
    this._tree.treeModel.update();
  }

  getActiveNode(): ITreeNode {
    return this._tree.treeModel.getActiveNode();
  }
}
