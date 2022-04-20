import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FooterComponent} from './layout/footer/footer.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {RouterModule} from "@angular/router";
import {RoutingModule} from "./router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from "@angular/material/button";
import {AlcoholSmallComponent} from './engine/components/alcohol-small/alcohol-small.component';
import {PriceTableComponent} from './engine/components/price-table/price-table.component';
import {SearchbarComponent} from './engine/components/searchbar/searchbar.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {IndexComponent} from './subDirs/index/index.component';
import {SearchComponent} from './subDirs/search/search.component';
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import { ChipsComponent } from './engine/components/chips/chips.component';
import { AddAlcoholComponent } from './subDirs/add-alcohol/add-alcohol.component';
import { AddAlcoholPriceComponent } from './subDirs/add-alcohol-price/add-alcohol-price.component';
import { CalcAlcoholPriceComponent } from './subDirs/calc-alcohol-price/calc-alcohol-price.component';
import {MatStepperModule} from "@angular/material/stepper";
import { FloatingButtonComponent } from './engine/components/floating-button/floating-button.component';
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import { SingleComponent } from './subDirs/single/single.component';
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    AlcoholSmallComponent,
    PriceTableComponent,
    SearchbarComponent,
    IndexComponent,
    SearchComponent,
    ChipsComponent,
    AddAlcoholComponent,
    AddAlcoholPriceComponent,
    CalcAlcoholPriceComponent,
    FloatingButtonComponent,
    SingleComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    RoutingModule,
    NgbModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    MatStepperModule,
    MatSelectModule,
    MatChipsModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
