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
  nameFilter: Observable<string[]>;
  englishNameFilter: Observable<string[]>;
  categories = [] as string[];
  categoryFilter: Observable<string[]>
  detailedCategoryFilter: Observable<string[]>
  detailedCategories = [] as string[];
  searchedName = [] as string[];
  searchedEnglishName = [] as string[];
  nameSet: {
    korean: string;
    english: string;
  }[] = [];

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

  firstFormGroup: FormGroup = this.formBuilder.group({
    'nameControl': new FormControl('', [Validators.required]),
    'englishNameControl': new FormControl('', [Validators.required])
  });

  secondFormGroup: FormGroup = this.formBuilder.group({
    'ageControl': new FormControl(0),
    'degreeControl': new FormControl(0, [Validators.required]),
    'categoryControl': new FormControl('', [Validators.required]),
    'detailedCategoryControl': new FormControl('', [Validators.required])
  });

  thirdFormGroup: FormGroup = this.formBuilder.group({
    'imageUrlControl': new FormControl('', [Validators.required]),
    'descriptionControl': new FormControl('', [Validators.required])
  })

  constructor(
    private alcoholService: AlcoholService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.alcoholService.getAlcoholName().then(v => {
      this.nameSet = v;
    });
    if (this.alcoholService.alcoholName) {
      this.searchedName = this.alcoholService.alcoholName;
    } else {
      this.alcoholService.getAlcoholName().then(value => {
        this.searchedName = value.map(v => v.korean);
        this.searchedEnglishName = value.map(v => v.english)
      })
    }
    if (this.alcoholService.alcoholEnglishName) {
      this.searchedEnglishName = this.alcoholService.alcoholEnglishName;
    } else {

    }
    if (this.alcoholService.categories) {
      this.categories = this.alcoholService.categories;
    } else {
      this.alcoholService.getCategories().then(value => {
        this.categories = value;
      });
    }
    if (this.alcoholService.detailedCategories) {
      this.categories = this.alcoholService.detailedCategories;
    } else {
      this.alcoholService.getDetailedCategories().then(value => {
        this.categories = value;
      })
    }
    this.thirdFormGroup.valueChanges.subscribe(value => {
      this.output.imageUrl = value.imageUrlControl;
      this.output.description = value.descriptionControl;
    })
    this.englishNameFilter = this.firstFormGroup.get('englishNameControl')!.valueChanges.pipe(startWith(''), map(value => this._filter_english_name(value)));
    this.nameFilter = this.firstFormGroup.get('nameControl')!.valueChanges.pipe(startWith(''), map(value => this._filter_name(value)));
    this.categoryFilter = this.secondFormGroup.get('categoryControl')!.valueChanges.pipe(startWith(''), map(value => this._filter_category(value)));
    this.detailedCategoryFilter = this.secondFormGroup.get('detailedCategoryControl')!.valueChanges.pipe(startWith(''), map(value => this._filter_detailed_category(value)));

    if(window.location.pathname.split('/').includes('edit')) {
      const uid = window.location.pathname.split('/').pop();
      this.apiService.getAsync<Alcohol>(`/api/alcohol/${uid}`).then(value => {
        this.output = value;
        this.firstFormGroup.controls['nameControl'].setValue(this.output.name);
        this.firstFormGroup.controls['englishNameControl'].setValue(this.output.englishName);
        this.secondFormGroup.controls['ageControl'].setValue(this.output.age);
        this.secondFormGroup.controls['degreeControl'].setValue(this.output.degree);
        this.secondFormGroup.controls['categoryControl'].setValue(this.output.category[0]);
        this.secondFormGroup.controls['detailedCategoryControl'].setValue(this.output.category[1]);
        this.thirdFormGroup.controls['imageUrlControl'].setValue(this.output.imageUrl);
        this.thirdFormGroup.controls['descriptionControl'].setValue(this.output.description);
      })
    }
  }

  ngOnInit(): void {
  }

  onUpdateFirstGroup(event: Event) {
    this.output.name = this.firstFormGroup.get('nameControl')!.value.trim();
    this.output.englishName = this.firstFormGroup.get('englishNameControl')!.value.trim();
  }

  onUpdateSecondGroup(event: Event) {
    this.output.category[0] = this.secondFormGroup.get('categoryControl')!.value.trim();
    this.output.category[1] = this.secondFormGroup.get('detailedCategoryControl')!.value.trim();
    this.output.age = this.secondFormGroup.get('ageControl')!.value;
    this.output.degree = this.secondFormGroup.get('degreeControl')!.value;
  }

  onUpdateThirdGroup(event: Event) {
    this.output.description = this.thirdFormGroup.get('descriptionControl')!.value.trim();
    this.output.imageUrl = this.thirdFormGroup.get('imageUrlControl')!.value.trim();
  }

  selectKoreanName(value: string) {
    const result = this.nameSet.find(v => v.korean === value);
    if (result) {
      this.firstFormGroup.controls['englishNameControl'].setValue(result.english);
      this.snackbar.open('alcohol already is in', '이동하기')
    }
  }

  selectEnglishName(value: string) {
    const result = this.nameSet.find(v => v.english === value);
    if (result) {
      this.firstFormGroup.controls['nameControl'].setValue(result.korean);
      this.snackbar.open('alcohol already is in', '이동하기')
    }
  }

  _filter_name(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.searchedName.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  _filter_english_name(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.searchedEnglishName.filter(option => option.indexOf(filterValue) === 0)
  }

  _filter_category(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  _filter_detailed_category(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.detailedCategories.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  addAlcohol(event: KeyboardEvent): void {
    event.preventDefault();
  }

  submit(): void {
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
