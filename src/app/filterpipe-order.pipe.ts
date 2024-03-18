
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipeorder',standalone:true
})
export class FilterpipeOrderPipe  implements PipeTransform {
  transform(orders: any[], searchText: string): any[] {
    if (!orders || !searchText) {
      return orders;
    }
    searchText = searchText.toLowerCase();
    return orders.filter(order => order.CustomerName?.toLowerCase().includes(searchText));
  }
}
