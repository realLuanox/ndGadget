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
    console.log(this.priceSource.data)
    this.priceSource.data = this.price;
  }
}
