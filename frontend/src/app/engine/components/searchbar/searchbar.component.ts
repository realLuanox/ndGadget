import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Alcohol} from "../../interfaces/alcohol";
import {AlcoholService} from "../../services/alcohol.service";

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
    console.log(this.searched);
    this.searched.emit(value);
  }
}
