import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
/**
 *   Uses ngx-pagination directive. Use paginate pipe on loop  ex:
 *  | paginate: {  id: 'foo', currentPage: p, itemsPerPage: itemsPerPage}
 * @class LoopPaginatorComponent
 */
@Component({
  selector: 'loop-paginator',
  templateUrl: './loop-paginator.component.html',
  styleUrls: ['./loop-paginator.component.scss']
})
export class LoopPaginatorComponent implements OnInit {
  @Input() id: string;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {}
}
