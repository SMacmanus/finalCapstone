import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ItemsService, Item } from '../items.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  addItemForm = this.fb.group({
    name: [''],
    description: [''],
    category: [''],
    imageUrl: [''],
    domestic: [],
    price: [],
    quantity: []
  });
  items: Item[] = [];
  itemsSub: Subscription;
  submitSub: Subscription;
  deleteSub: Subscription;
  editSub: Subscription;
  editingItemId: number;

  constructor(private fb: FormBuilder, private itemsService: ItemsService, private http: HttpClient) { }

  ngOnInit() {
    this.getItemsFromServer();
  }

  ngOnDestroy() {
    if (this.itemsSub) {
      this.itemsSub.unsubscribe();
    }

    if (this.submitSub) {
      this.submitSub.unsubscribe();
    }

    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }

    if (this.editSub) {
      this.editSub.unsubscribe();
    }
  }

  onSubmitForm() {
    const name = this.addItemForm.value.name;
    const description = this.addItemForm.value.description;
    const category = this.addItemForm.value.category;
    const imageUrl = this.addItemForm.value.imageUrl;
    const domestic = this.addItemForm.value.domestic;
    const price = this.addItemForm.value.price;
    const quantity = this.addItemForm.value.quantity;

    // adding a new item
    // tslint:disable-next-line: triple-equals
    if (this.editingItemId == undefined) {
      this.submitSub = this.itemsService.createNewItemOnServer(name, description, category, imageUrl, domestic, price, quantity).subscribe(
        (result: Item) => {
          console.log('result ' + result);
          this.getItemsFromServer();
          this.addItemForm.reset();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      // tslint:disable-next-line: max-line-length
      this.editSub = this.itemsService.updateItemOnServer(this.editingItemId, name, description, category, imageUrl, domestic, price, quantity).subscribe(
        (result: Item) => {
          console.log('result ' + result);
          this.editingItemId = undefined;
          this.addItemForm.reset();

          this.getItemsFromServer();
        },
        error => {
          console.log(error);
        }
      );
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

  onDeleteItem(item: Item) {
    this.deleteSub = this.itemsService.deleteItemByIdFromServer(item.id).subscribe(
      (result: any) => {
        this.getItemsFromServer();
      },
      error => {
        console.log(error);
      }
    );
  }

  onStartEditItem(item: Item) {
    this.editingItemId = item.id;
    this.addItemForm.patchValue(item);
  }

  onCancelEditItem() {
    this.editingItemId = undefined;
    this.addItemForm.reset();
  }
}
