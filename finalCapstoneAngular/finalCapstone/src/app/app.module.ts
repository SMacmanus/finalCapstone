import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { ItemsMasterComponent } from './items-master/items-master.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemCardComponent } from './items-master/item-card/item-card.component';
import { ItemSearchPipe } from './item-search.pipe';
import { CartComponent } from './cart/cart.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { RoundingPipe } from './rounding.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
    MainNavbarComponent,
    ItemsMasterComponent,
    ItemDetailComponent,
    ItemCardComponent,
    ItemSearchPipe,
    CartComponent,
    AdminComponent,
    RoundingPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
