import {Component, OnInit} from '@angular/core';
import {Alcohol, AlcoholStructure, StorePriceStructure} from "../../engine/interfaces/alcohol";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../engine/services/api.service";
import {AlcoholService} from "../../engine/services/alcohol.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-alcohol-price',
  templateUrl: './add-alcohol-price.component.html',
  styleUrls: ['./add-alcohol-price.component.scss']
})
export class AddAlcoholPriceComponent implements OnInit {
  output = AlcoholStructure;
  storePriceOutput = StorePriceStructure;
  alcohol: Alcohol[] = [];
  uid = window.location.pathname.split('/' ).pop();
  isLinear = false;

  storeNameExample: string[] = [
    '석진상회',
    '형제상회',
    '안성상회',
    '광천상회',
    '하나상사',
    '아리수상사',
    '달리',
    '와인25',
    '데일리샷'
  ];


  firstFormGroup: FormGroup = this.formBuilder.group({
    'storeNameControl' : new FormControl('', [Validators.required]),
    'buyDateControl' : new FormControl ('', [Validators.required])
  });

  secondFormGroup = this.formBuilder.group({
    'priceControl' : new FormControl('', [Validators.required]),
    'amountControl' : new FormControl('', [Validators.required]),
    'buyMethodControl' : new FormControl('', [Validators.required])
  });

  thirdFormGroup = this.formBuilder.group( {
    'etcControl' : new FormControl('', [Validators.required])
  })

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private alcoholService: AlcoholService,
              private router: Router,) {
    if(history.state.hasOwnProperty('name'))  {
      this.output = history.state as Alcohol;
      this.alcohol[0] = this.output;
      document.title = this.output.name;
    } else {
      this.apiService.getAsync<Alcohol>(`/api/alcohol/${this.uid}`).then(value => {
        this.output = value;
        console.log(this.output);
        this.alcohol[0] = this.output;
        document.title = this.output.name;
      });
    }
  }

  ngOnInit() {
  }

  onUpdateFirstGroup() {
    this.output = this.alcohol[0];
    this.storePriceOutput.storeName = this.firstFormGroup.get('storeNameControl')!.value.trim();
    this.storePriceOutput.buyDate = this.firstFormGroup.get('buyDateControl')!.value;
    console.log(this.firstFormGroup.get('buyDateControl')!.value);
  }

  onUpdateSecondGroup() {
    this.storePriceOutput.price = this.secondFormGroup.get('priceControl')!.value;
    this.storePriceOutput.amount = this.secondFormGroup.get('amountControl')!.value;
    this.storePriceOutput.priceType = this.secondFormGroup.get('buyMethodControl')!.value;
  }

  public sortByDate(): void {
    console.log(this.thirdFormGroup.get('etcControl')!.value)
    this.storePriceOutput.etc = this.thirdFormGroup.get('etcControl')!.value;
    this.output.storePrices.push(this.storePriceOutput);
    console.log(this.output);
  }

  search(keyword: string): void {
    this.alcohol = this.alcoholService.alcoholData.filter(value => value.englishName === keyword);
  }

  submit(): void {
    this.apiService.postAsync('/api/edit/alcohol', this.output).then(() => {
      this.router.navigate(['/']).then();
    }).catch(() => {
    });
  }
}
