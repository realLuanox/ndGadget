import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "./subDirs/index/index.component";
import {SearchComponent} from "./subDirs/search/search.component";
import {AddAlcoholComponent} from "./subDirs/add-alcohol/add-alcohol.component";
import {AddAlcoholPriceComponent} from "./subDirs/add-alcohol-price/add-alcohol-price.component";
import {CalcAlcoholPriceComponent} from "./subDirs/calc-alcohol-price/calc-alcohol-price.component";
import {SingleComponent} from "./subDirs/single/single.component";


const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'add/alcohol',
    component: AddAlcoholComponent
  },
  {
    path: 'edit/alcohol/:uid',
    component: AddAlcoholComponent
  },
  {
    path: 'add/price',
    component: AddAlcoholPriceComponent
  },
  {
    path: 'calculate',
    component: CalcAlcoholPriceComponent
  },
  {
    path: 'alcohol/:uuid',
    component: SingleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule {
}
