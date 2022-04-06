import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Alcohol} from "../../interfaces/alcohol";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  @Output() searched = new EventEmitter<string>();
  public searchList: Alcohol[] = [];

  myControl = new FormControl();
  filteredOptions: Observable<Alcohol[]>;


  constructor(private readonly apiService: ApiService) {
    this.apiService.get<Alcohol[]>("/api/AlcList.json").subscribe(value => {
      this.searchList = value;
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  ngOnInit(): void {
  }

  private _filter(value: string): Alcohol[] {
    const filterValue = value.toLowerCase();
    return this.searchList.filter((value) => {
      return value.name.includes(filterValue) || value.englishName.toLowerCase().startsWith(filterValue);
    });
  }

  search(value: string): void {
    this.searched.emit(value);
  }
}
