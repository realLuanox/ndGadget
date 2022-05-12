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
  public filteredArray: string[] = [];
  distinctCategory: String[] = [];
  categoryTree: {
    category: string;
    detailedCategory: string[];
  }[] = [];
  cat0: string[] = [];
  cat1: string[] = [];
  catMerged: [string, string][] = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]> = new Observable();
  filteredCategory: Observable<string[]> = new Observable();


  constructor(private readonly apiService: ApiService,
              private readonly alcoholService: AlcoholService) {
    if (this.alcoholService.alcoholData && this.alcoholService.initialized) {
      this.searchList = this.alcoholService.alcoholData;
      this.setCategories();
    } else {
      this.alcoholService.getAlcoholData().then(value => {
        this.searchList = value;
        this.setCategories();
      })
    }
  }

  setCategories() {
    this.cat0 = [];
    this.cat1 = [];
    this.catMerged = [];
    for (const single of this.searchList) {
      if (!this.cat0.includes(single.category[1])) {
        this.cat0.push(single.category[1]);
      }
      if (!this.cat1.includes(single.category[0])) {
        this.cat1.push(single.category[0]);
      }
      this.catMerged.push([single.category[1], single.category[0]]);
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const cat = this.catMerged.filter(v => v[1].includes(filterValue) || v[0].includes(filterValue)).map(v => v[0]);
    const output: string[] = [];
    for (const single of cat) {
      if (!output.includes(single)) {
        output.push(single);
      }
    }
    return output;
  }

  private _filter_category(value: string): string[] {
    const filterValue = value.toLowerCase();
    const cat = this.catMerged.filter(v => v[0].includes(filterValue) || v[1].includes(filterValue)).map(v => v[1]);
    const output: string[] = [];
    for (const single of cat) {
      if (!output.includes(single)) {
        output.push(single);
      }
    }
    return output;
  }

  search(value: string): void {
    console.log(this.searched);
    this.searched.emit(value);
  }
}
