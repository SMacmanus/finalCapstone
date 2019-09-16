import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item, ItemsService } from '../items.service';
import { CartService } from '../cart.service';
import { ItemDetailComponent } from '../item-detail/item-detail.component';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  itemsInCart: Item[] = [];
  total = 0;
  infoText = 'Cart is empty.';
  apiUrl = '';
  finalTax = 0;
  totalTaxSub: Subscription;
  closeResult: string;


  // tslint:disable-next-line: max-line-length
  constructor(private cartService: CartService, private router: Router, private itemsService: ItemsService, private modalService: NgbModal) { }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return 'with: ${reason}';
    }
  }

  ngOnInit() {
    this.getItemsInCart();
    this.calculateTotal();
    this.calculateFinalTax();
  }

  onRemoveItemFromCart(index: number) {
    this.cartService.removeItemFromCart(index);
    this.getItemsInCart();
    this.calculateTotal();
  }

  getItemsInCart() {
    this.itemsInCart = this.cartService.getItemsInCart();
    console.log(this.itemsInCart);
  }

  onPurchase() {
    this.cartService.purchase(this.itemsInCart).subscribe(
      (result: any) => {
        this.cartService.emptyCart();
        this.itemsInCart = [];
        this.infoText = 'Items Purchased!  Redirecting...';

        setTimeout(() => {
          this.router.navigate(['/inventory']);
        }, 1500);
      }
    );
  }

  calculateTotal() {
    // tslint:disable-next-line: max-line-length
    this.total = this.itemsInCart.reduce((total, currVal) => total + (currVal.price * currVal.quantity) + (Math.ceil((currVal.price * currVal.quantity * currVal.totalTax) * 20)) / 20, 0);
    console.log(this.total);
  }
  calculateFinalTax() {
    // tslint:disable-next-line: max-line-length
    this.finalTax = this.itemsInCart.reduce((finalTax, currVal) => finalTax + (Math.ceil((currVal.price * currVal.quantity * currVal.totalTax) * 20)) / 20, 0);
    console.log(this.finalTax);
  }



  onDecreaseQty(item: Item) {
    if (item.quantity > 0) {
      item.quantity--;
      this.calculateTotal();
    }
  }

  onIncreaseQty(item: Item) {
    console.log('a');
    console.log(item.quantity);
    console.log(item.available);
    if (item.quantity < item.available) {
      item.quantity++;
      this.calculateTotal();
    }
  }


}
