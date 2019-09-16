import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './items.service';
import { Observable } from 'rxjs';
import { QueryValueType } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemsInCart: Item[] = [];
  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  addToCart(item: Item, qty: number) {
    // tslint:disable-next-line: prefer-const
    let itemAlreadyInCart = false;
    this.itemsInCart = this.itemsInCart.map(i => {
      // tslint:disable-next-line: triple-equals
      if (i.id == item.id) {
        i.quantity += qty;
        itemAlreadyInCart = true;
      }
      return i;
    });

    if (!itemAlreadyInCart) {
      console.log(item.available);
      // tslint:disable-next-line: max-line-length
      const newItem = new Item(item.name, item.description, item.category, item.imageUrl, item.domestic, item.price, qty, item.quantity, item.totalTax);
      newItem.quantity = qty;
      newItem.id = item.id;
      this.itemsInCart.push(newItem);
    }
  }

  getItemsInCart(): Item[] {
    return this.itemsInCart;
  }

  removeItemFromCart(index: number) {
    this.itemsInCart.splice(index, 1);
  }

  emptyCart() {
    this.itemsInCart = [];
  }

  purchase(purchasedItems: Item[]): Observable<null> {
    const url = `${this.apiUrl}/purchase`;
    return this.http.post<null>(url, purchasedItems);
  }

}
