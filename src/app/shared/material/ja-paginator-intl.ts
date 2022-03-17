/**
 *  Japanese translations for Material Paginator
 *
 */
import { MatPaginatorIntl } from '@angular/material';

const japanesesRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) { return `0 の ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} の ${length}`;
};


export function JapanesePaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'ページあたりのアイテム数';
  paginatorIntl.nextPageLabel = '次のページ';
  paginatorIntl.previousPageLabel = '前のページ';
  paginatorIntl.getRangeLabel = japanesesRangeLabel;

  return paginatorIntl;
}
