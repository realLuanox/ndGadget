import {Component, OnInit} from '@angular/core';
import {Alcohol, AlcoholStructure} from "../../engine/interfaces/alcohol";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs";
import {ApiService} from "../../engine/services/api.service";
import {Router} from "@angular/router";
import {AlcoholService} from "../../engine/services/alcohol.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-alcohol',
  templateUrl: './add-alcohol.component.html',
  styleUrls: ['./add-alcohol.component.scss']
})

export class AddAlcoholComponent implements OnInit {
  output = AlcoholStructure;
  alcohol: Alcohol | null = null;
  nameControl = new FormControl('', [Validators.required]);
  nameFilter: Observable<string[]>;
  englishNameControl = new FormControl('', [Validators.required]);
  imageUrlControl = new FormControl('', [Validators.required]);
  degreeControl = new FormControl('',[Validators.required]);
  descriptionControl = new FormControl('', [Validators.required]);
  categoryControl = new FormControl('', [Validators.required]);
  categories = [] as string[];
  categoryFilter: Observable<string[]>
  detailedCategoryControl = new FormControl('', [Validators.required]);
  detailedCategoryFilter: Observable<string[]>
  detailedCategories = [] as string[];
  searched = [] as string[];


  mustFillGroup: FormGroup = this.formBuilder.group({});
  ageControl = new FormControl();
  imageControl = new FormControl();

  alcoholCategory: string[] = [
    '위스키',
    '데킬라',
    '보드카',
    '럼',
    '리큐르',
    '사케',
    '진',
    '중국술',
    '미니어처',
    '기타',
  ];

  isLinear = false;
  firstFormGroup: FormGroup = this.formBuilder.group({
  });
  secondFormGroup = this.formBuilder.group({
  });

  constructor(
    private alcoholService: AlcoholService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    ) {
    if(this.alcoholService.Alcohol) {
      this.searched = this.alcoholService.Alcohol;
    } else {
      this.alcoholService.getAlcohol().then(value => {
        this.searched = value;
      })
    }
    if(this.alcoholService.categories) {
      this.categories = this.alcoholService.categories;
    } else {
      this.alcoholService.getCategories().then(value => {
        this.categories = value;
      });
    }
    if(this.alcoholService.detailedCategories) {
      this.categories = this.alcoholService.detailedCategories;
    } else {
      this.alcoholService.getDetailedCategories().then(value => {
        this.categories = value;
      })
    }

    this.nameFilter = this.nameControl.valueChanges.pipe(startWith(''), map(value => this._filter_name(value)));
    this.categoryFilter = this.categoryControl.valueChanges.pipe(startWith(''), map(value => this._filter_category(value)));
    this.detailedCategoryFilter = this.detailedCategoryControl.valueChanges.pipe(startWith(''), map(value => this._filter_detailed_category(value)));
  }

  ngOnInit(): void {
  }

  onUpdateFirstGroup(event: Event) {
    this.output.name = this.nameControl.value.trim();
    this.output.englishName = this.englishNameControl.value.trim();
    console.log(this.alcoholService.getAlcohol())
  }

  onUpdateSecondGroup(event: Event) {
    this.output.category[0] = this.categoryControl.value.trim();
    this.output.category[1] = this.detailedCategoryControl.value.trim();
    this.output.age = this.ageControl.value.trim();
    this.output.degree = this.degreeControl.value.trim();
    this.output.imageUrl = this.imageUrlControl.value.trim();
  }

  onUpdateLastGroup(event: Event) {
    this.output.description = this.descriptionControl.value.trim();
  }

  _filter_name(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.searched.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  _filter_category(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  _filter_detailed_category(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.detailedCategories.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  searchAlcohol(value: string): void {
    this.apiService.post<Alcohol[]>('/api/AlcList.json', {name: value}).subscribe(v => {
      this.searched = v.map(k => k.name);
    });
  }

  searchAlcoholCategory(value: Alcohol): void {
    this.apiService.get<Alcohol[]>('/api/AlcList.json').subscribe(v => {
    })
  }

  addAlcohol(event:KeyboardEvent): void {
    event.preventDefault();
  }

  submit(): void {
    this.output.name = this.nameControl.value.trim();
    this.output.englishName = this.englishNameControl.value.trim();
    this.output.degree = this.degreeControl.value;
    this.output.description = this.descriptionControl.value;
    this.output.category[0] = this.categoryControl.value.trim();
    this.output.category[1] = this.detailedCategoryControl.value.trim();
    if (window.location.pathname.split('/').includes('edit')) {
      this.apiService.postAsync<void>('/api/edit/alcohol', this.output).then(() => {
        this.router.navigate(['/']).then();
      }).catch((reason) => {
      });
    } else {
      this.apiService.postAsync<void>('/api/write/alcohol', this.output).then(() => {
        this.router.navigate(['/']).then();
      }).catch((reason) => {
      });
    }
  }
}
