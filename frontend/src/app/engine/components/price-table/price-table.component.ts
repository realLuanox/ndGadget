import {Component, Input, OnInit} from '@angular/core';
import {StorePrice} from "../../interfaces/alcohol";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-price-table',
  templateUrl: './price-table.component.html',
  styleUrls: ['./price-table.component.scss']
})

export class PriceTableComponent implements OnInit {
  @Input() price = [] as StorePrice[];
  priceSource = new MatTableDataSource<StorePrice>(this.price)
  priceColumns: string[] = ['amount', 'price', 'price per 100ml'];
  displayedColumns: string[] = ['store-name', 'price', 'buy-date'];

  constructor() {
  }

  ngOnInit(): void {
    this.priceSource.data = this.price;
  }

  formatDate(of: string): string {
    const timestamp = Date.parse(of);
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  formatDateString(of: string): string
  {
    const timestamp = Date.parse(of);
    const date = new Date(timestamp);
    return isNaN(date.getDate()) ? "" : this.dateToString(date);
  }

  dateToString(date: Date): string
  {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

}
