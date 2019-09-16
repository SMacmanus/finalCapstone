import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemsService, Item } from '../items.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  paramSub: Subscription;
  itemByIdSub: Subscription;
  @Input() item: Item;
  @Input() i: number;
  buttonText = 'Add to Cart';
  qtyToPurchase = 1;
  totalTax: number;

  constructor(private route: ActivatedRoute, private itemsService: ItemsService, private cartService: CartService) { }

  ngOnInit() {
    this.paramSub = this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        console.log('paramMap itemIndex: ' + paramMap.get('itemIndex'));
        const itemIndex = +paramMap.get('itemIndex');
        this.getItemFromServer(itemIndex);
        this.getItemTaxFromServer(itemIndex);
        console.log('Received item: ', this.item);
      }
    );

  }

  ngOnDestroy() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }

    if (this.itemByIdSub) {
      this.itemByIdSub.unsubscribe();
    }
  }

  getItemFromServer(itemId: number) {
    this.itemByIdSub = this.itemsService.getItemByIdFromServer(itemId).subscribe(
      (result: Item) => {
        console.log('result ' , result);
        this.item = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  getItemTaxFromServer(itemId: number) {
    this.itemByIdSub = this.itemsService.getTotalTaxFromServer(itemId).subscribe(
      (result: number) => {
        console.log('tax result ' , result);
        this.item.totalTax = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  onAddToCart(item: Item) {
    if (this.qtyToPurchase > 0 && this.qtyToPurchase <= item.quantity) {
      this.cartService.addToCart(item, this.qtyToPurchase);
      this.buttonText = 'Added';
      console.log(item);

      setTimeout(() => {
        this.buttonText = 'Add to Cart';
      }, 1500);
    }
  }
}
