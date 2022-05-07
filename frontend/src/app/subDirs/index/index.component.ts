import { Component, OnInit } from '@angular/core';
import {AlcoholService} from "../../engine/services/alcohol.service";
import {ApiService} from "../../engine/services/api.service";
import {Alcohol} from "../../engine/interfaces/alcohol";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  alcoholData : Alcohol[] = [];

  constructor(private apiService: ApiService,
              private alcoholService: AlcoholService) {
    this.alcoholService.getAlcoholData().then(value =>{
      this.alcoholData = value;
    });
  }

  ngOnInit(): void {
  }
}
