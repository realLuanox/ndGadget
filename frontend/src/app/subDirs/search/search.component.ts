import {Component, OnDestroy, OnInit} from '@angular/core';
import {Alcohol} from "../../engine/interfaces/alcohol";
import {ApiService} from "../../engine/services/api.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

import {AlcoholService} from "../../engine/services/alcohol.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  alcohols: Alcohol[] = [];
  tabIndex = 0;

  constructor(
    private apiService: ApiService,
    private alcoholService: AlcoholService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(v => {
      if (v['category']) {
        this.tabIndex = 1;
        this.searchCategory(v['category']);
        console.log(this.alcohols);
      }
      else if (v['detailedCategory']) {
        this.tabIndex = 1;
        this.searchDetailedCategory(v['detailedCategory'])
      }
    });
  }

  searchCategory(keyword: string): void {
    this.alcohols = this.alcoholService.alcoholData.filter(value => value.category[0] === keyword);
  }

  searchDetailedCategory(keyword: string): void {
    this.alcohols = this.alcoholService.alcoholData.filter(value => value.category[1] === keyword);
  }

  search(keyword: string): void {
    this.alcohols = this.alcoholService.alcoholData.filter(value => value.englishName.includes(keyword));
  }

  ngOnInit(): void {
  }
}

