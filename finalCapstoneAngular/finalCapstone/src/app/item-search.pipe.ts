import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './items.service';

@Pipe({
  name: 'itemSearch'
})
export class ItemSearchPipe implements PipeTransform {

  transform(value: Item[], filterText: string): Item[] {
    // tslint:disable-next-line: prefer-const
    let itemsMatching = value.filter((item: Item) => {
      if ((item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) || 
         (item.category && item.category.toLowerCase().includes(filterText.toLowerCase()))) {
          return true;
        }
      return false;
    });
    return itemsMatching;
  }

}
