import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Item {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  domestic: boolean;
  price: number;
  quantity: number;
  available: number;
  totalTax: number;
  

  // tslint:disable-next-line: max-line-length
  constructor(name: string, description: string, category: string, imageUrl: string, domestic: boolean, price: number, quantity: number, available?: number, totalTax?: number) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.imageUrl = imageUrl;
    this.domestic = domestic;
    this.price = price;
    this.quantity = quantity;
    this.available = available;
    this.totalTax = totalTax;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  items: Item[] = [];
  tax: number;

  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getItemsFromServer(): Observable<Item[]> {
    const url = this.apiUrl + '/inventory';
    return this.http.get<Item[]>(url);
  }

  getItemByIdFromServer(id: number): Observable<Item> {
    const url = `${this.apiUrl}/inventory/${id}`;
    return this.http.get<Item>(url);
  }

  // tslint:disable-next-line: max-line-length
  createNewItemOnServer(name: string, description: string, category: string, imageUrl: string, domestic: boolean, price: number, quantity: number): Observable<Item> {
    const newItem = new Item(name, description, category, imageUrl, domestic, price, quantity);
    const url = this.apiUrl + '/inventory';

    return this.http.post<Item>(url, newItem);
  }

  deleteItemByIdFromServer(id: number): Observable<Item> {
    const url = `${this.apiUrl}/inventory/${id}`;
    return this.http.delete<Item>(url);
  }

  // tslint:disable-next-line: max-line-length
  updateItemOnServer(id: number, name: string, description: string, category: string, imageUrl: string, domestic: boolean, price: number, quantity: number): Observable<Item> {
    const newItem = new Item(name, description, category, imageUrl, domestic, price, quantity);
    const url = `${this.apiUrl}/inventory/${id}`;

    return this.http.put<Item>(url, newItem);
  }

  getTotalTaxFromServer(id: number): Observable<number> {
    const url = `${this.apiUrl}/tax/${id}`;
    const totalTax = this.http.get<number>(url);
    return totalTax;
  }
}
