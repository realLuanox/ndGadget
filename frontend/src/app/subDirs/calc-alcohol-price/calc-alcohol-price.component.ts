import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Alcohol} from "../../engine/interfaces/alcohol";
import {AlcoholService} from "../../engine/services/alcohol.service";
import {map, Observable, of, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-calc-alcohol-price',
  templateUrl: './calc-alcohol-price.component.html',
  styleUrls: ['./calc-alcohol-price.component.scss']
})
export class CalcAlcoholPriceComponent implements OnInit {
  @Output() searched = new EventEmitter<Alcohol>();
  alcoholData: Alcohol[] = [];
  calculateControl = new FormControl();
  filteredOptions: Observable<Alcohol[]>;
  selectedAlcoholData: Alcohol[] = [];
  alcoholName: string[] = [];
  innerWidth: Number = 0;
  sum: number = 0;

  constructor(private alcoholService: AlcoholService) {
    this.alcoholService.getAlcoholName().then(value => {
      this.alcoholName = value.map(v => v.korean);
    })
    this.alcoholService.getAlcoholData().then(value => {
      this.alcoholData = value;
    })
    this.filteredOptions = this.calculateControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  searchName(keyword: string): void {
    this.alcoholService.getAlcoholName().then(value => {
      this.alcoholName = value.map(v => v.korean);
    })
  }

  private _filter(englishName: string): Alcohol[] {
    const filterValue = englishName.toLowerCase();
    return this.alcoholData.filter(alcohol => alcohol.englishName.toLowerCase().includes(filterValue) || alcohol.name.includes(filterValue));
  }

  getAddedAlcohol(event: Event): void {
    console.log(Event);
    this.alcoholData = this.alcoholService.alcoholData;
  }

  // 이거 reduce로 좀더 간단하게 짤 수는 없나
  calculate(): void {
    this.sum = 0;
    console.log(this.selectedAlcoholData);
    this.selectedAlcoholData.forEach(v => {
      this.sum += +v.storePrices[0].price;
      console.log(this.sum);
    })
  }

  print(selected: MatAutocompleteSelectedEvent) {
    const alc = selected.option.value as Alcohol;
    this.calculateControl.setValue(alc.englishName);
    if(!this.selectedAlcoholData.includes(alc))
      this.selectedAlcoholData.push(alc);
    this.alcoholData = this.alcoholService.alcoholData;
    console.log(this.alcoholData);
  }
}
