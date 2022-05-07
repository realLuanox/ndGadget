import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../engine/services/api.service";
import {Alcohol, AlcoholStructure} from "../../engine/interfaces/alcohol";
import {Router} from "@angular/router";

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  alcohol: Alcohol = AlcoholStructure;
  uid = window.location.pathname.split('/' ).pop();


  constructor(private router: Router, private apiService: ApiService) {
    if(history.state.hasOwnProperty('name'))  {
      this.alcohol = history.state as Alcohol;
      document.title = this.alcohol.name;
    } else {
      this.apiService.getAsync<Alcohol>(`/api/alcohol/${this.uid}`).then(value => {
        this.alcohol = value;
        document.title = this.alcohol.name;
      });
    }
  }

  ngOnInit(): void {
  }



}
