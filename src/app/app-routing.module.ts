import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './add-products/add-products.component.js';
import { FilterListOfProductsComponent } from './filter-list-of-products/filter-list-of-products.component.js';
import { ListOfProductsComponent } from './list-of-products/list-of-products.component.js';
import { FuzzySearchComponent } from './fuzzy-search/fuzzy-search.component.js';
import { OrderFormComponent } from './order-form/order-form.component.js';
import { CartComponent } from './cart/cart.component.js';
const routes: Routes = [
  { path: 'list-of-products', component: ListOfProductsComponent },
  { path: 'filter-list-of-products', component: FilterListOfProductsComponent },
  { path: 'add-products', component: AddProductsComponent },
  {path: 'fuzzy-search-list-of-products', component: FuzzySearchComponent },
  { path: 'order-form', component:OrderFormComponent},
  {path:'cart',component:CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
