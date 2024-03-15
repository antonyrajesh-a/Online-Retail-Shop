import { Component } from '@angular/core';
import { RouterModule ,Routes} from '@angular/router';
import { ListOfProductsComponent } from '../list-of-products/list-of-products.component';
import { AddProductsComponent } from '../add-products/add-products.component';
import { FilterListOfProductsComponent } from '../filter-list-of-products/filter-list-of-products.component';

import { FuzzySearchComponent } from '../fuzzy-search/fuzzy-search.component';
import { OrderFormComponent } from '../order-form/order-form.component';
import { ListOfOrdersComponent } from '../list-of-orders/list-of-orders.component';
import { AllProductsComponent } from '../all-products/all-products.component';

const routes: Routes = [
  { path: 'list-of-products', component: ListOfProductsComponent },
  { path: 'filter-list-of-products', component: FilterListOfProductsComponent },
  { path: 'add-products', component: AddProductsComponent },
  { path: 'fuzzy-search-list-of-products', component: FuzzySearchComponent },
  { path: 'order-form', component:OrderFormComponent},
  {path:'list-of-orders',component:ListOfOrdersComponent},
  {path:'all-products',component:AllProductsComponent}

];
@Component({
  selector: 'app-nav-bar',
  standalone:true,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  imports :[RouterModule]
})

export class NavBarComponent {

}
