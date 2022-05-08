import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Alcohol} from "../../interfaces/alcohol";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ApiService} from "../../services/api.service";
import {AlcoholService} from "../../services/alcohol.service";

@Component({
  selector: 'app-searchbar-category',
  templateUrl: './searchbar-category.component.html',
  styleUrls: ['./searchbar-category.component.scss']
})
export class SearchbarCategoryComponent implements OnInit {
  @Output() searched = new EventEmitter<string>();
  public searchList: Alcohol[] = [];
  public filteredArray: Alcohol[] = [];
  distinctCategory: String[] = [];
  categoryTree: {
    category: string;
    detailedCategory: string[];
  }[] = [];

  myControl = new FormControl();
  filteredOptions: Observable<Alcohol[]>;
  filteredCategory: Observable<Alcohol[]>;


  constructor(private readonly apiService: ApiService,
              private readonly alcoholService: AlcoholService) {
    if (this.alcoholService.alcoholData) {
      this.searchList = this.alcoholService.alcoholData;
    } else {
      this.alcoholService.getAlcoholData().then(value => {
        this.searchList = value;
      })
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    this.filteredCategory = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter_category(value)),
    );
  }

  ngOnInit(): void {
  }

  private _filter(value: string): Alcohol[] {
    const filterValue = value.toLowerCase();
    return this.searchList.filter((value) => {
      return value.category[0].includes(filterValue) || value.category[1].includes(filterValue);
    });
  }

  private _filter_category(value: string): Alcohol[] {
    const filterValue = value.toLowerCase();
    this.filteredArray = [];
    this.searchList.forEach((alcohol, index, filterValue) => {
      if (filterValue.map(alcohol => alcohol.category[0]).indexOf(alcohol.category[0]) === index)
        this.filteredArray.push(alcohol);
    })
    return this.filteredArray.filter((v: Alcohol) => {
        return v.category[0].includes(filterValue) || v.category[1].includes(filterValue);
    });
  }

  search(value: string): void {
    console.log(this.searched);
    this.searched.emit(value);
  }
}
