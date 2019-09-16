import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsMasterComponent } from './items-master/items-master.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path: 'inventory', component: ItemsMasterComponent},
  { path: '', redirectTo: 'portal', pathMatch: 'full'},
  { path: 'inventory/:itemIndex', component: ItemDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin', component: AdminComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
