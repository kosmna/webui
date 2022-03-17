import { Pipe, PipeTransform } from '@angular/core';
/*
* Pipe for Searching optional param to excluded object properties in a search
*  Ex: searchFilter: search.value : ['image', 'id']
*/
@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], criteria: any, exclude?: string[]): any {
    if (items) {
      return items.filter(item => {
        let keysArrr = [];
        if (exclude) {
          keysArrr = Object.keys(item).filter(key => !exclude.includes(key));
        } else {
          keysArrr = Object.keys(item);
        }
        for (let i = 0; i < keysArrr.length; i++) {
          const key = keysArrr[i];
          if (('' + item[key]).toLowerCase().includes(criteria.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
    } else {
      return items;
    }
  }
}
