import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe',standalone:true
})
export class FilterpipePipe implements PipeTransform {
  transform(products: any[], searchText: string): any[] {
    if (!products || !searchText) {
      return products;
    }
    searchText = searchText.toLowerCase();
    return products.filter(product => product.ProductName?.toLowerCase().includes(searchText));
  }
}
