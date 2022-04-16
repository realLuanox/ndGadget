import {Component, OnInit} from '@angular/core';
import {Alcohol, StorePrice, AlcoholStructure} from "../../engine/interfaces/alcohol";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../engine/services/api.service";
import {AlcoholService} from "../../engine/services/alcohol.service";
import {elementAt} from "rxjs";

@Component({
  selector: 'app-add-alcohol-price',
  templateUrl: './add-alcohol-price.component.html',
  styleUrls: ['./add-alcohol-price.component.scss']
})
export class AddAlcoholPriceComponent implements OnInit {
  output = AlcoholStructure;
  alcohol: Alcohol[] = [];
  isLinear = false;
  amountControl = new FormControl('', [Validators.required]);
  priceControl = new FormControl('', [Validators.required]);


  firstFormGroup: FormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder,
              private apiService: ApiService,
              private alcoholService: AlcoholService) {
  }

  ngOnInit() {
  }

  search(keyword: string): void {
    this.alcohol = this.alcoholService.alcoholData.filter(value => value.englishName === keyword);
  }


}
