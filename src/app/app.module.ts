import { NgModule, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { ListOfProductsComponent } from './list-of-products/list-of-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { FilterListOfProductsComponent } from './filter-list-of-products/filter-list-of-products.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FuzzySearchComponent } from './fuzzy-search/fuzzy-search.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderFormComponent } from './order-form/order-form.component';
import { RouterModule ,Routes} from '@angular/router';
import { ListOfOrdersComponent } from './list-of-orders/list-of-orders.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { CartComponent } from './cart/cart.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FilterpipePipe } from './filterpipe.pipe';
import { FilterpipeOrderPipe } from './filterpipe-order.pipe';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'list-of-products', component: ListOfProductsComponent },
  { path: 'filter-list-of-products', component: FilterListOfProductsComponent },
  { path: 'add-products', component: AddProductsComponent },
  { path: 'fuzzy-search-list-of-products', component: FuzzySearchComponent },
  { path: 'order-form', component:OrderFormComponent},
  {path:'list-of-orders',component:ListOfOrdersComponent},
  {path:'home',component:HomeComponent}

];

@NgModule({
  declarations: [
    AppComponent,


  
  
  
  ],
  imports: [
    FilterpipeOrderPipe,
    HomeComponent,
    FilterpipePipe,
    MatProgressSpinnerModule,
    ListOfOrdersComponent,
    CartComponent,
    HeaderComponent,
    FooterComponent,
    BrowserModule,
    OrderFormComponent,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ListOfProductsComponent,
    HttpClientModule,
    AddProductsComponent,
    NavBarComponent,
    FilterListOfProductsComponent,

    FuzzySearchComponent,
  ToastModule],
  providers: [
    provideAnimationsAsync(),
    MessageService
  ],

  bootstrap: [AppComponent],

})
export class AppModule { }



