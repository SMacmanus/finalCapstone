import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsService, Item } from '../items.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-items-master',
  templateUrl: './items-master.component.html',
  styleUrls: ['./items-master.component.scss']
})
export class ItemsMasterComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  itemsSub: Subscription;
  // tslint:disable-next-line: no-inferrable-types
  filterText: string = '';


  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.getItemsFromServer();
  }

  ngOnDestroy() {
    if (this.itemsSub) {
      this.itemsSub.unsubscribe();
    }
  }

  getItemsFromServer() {
    this.itemsSub = this.itemsService.getItemsFromServer().subscribe(
      (result: Item[]) => {
        console.log('result ' + result);
        this.items = result;
      },
      error => {
        console.log(error);
      }
    );
  }

}
