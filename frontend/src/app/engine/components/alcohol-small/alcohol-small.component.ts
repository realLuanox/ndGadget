import {Component, Input, OnInit} from '@angular/core';
import {Alcohol} from "../../interfaces/alcohol";

@Component({
  selector: 'app-alcohol-small',
  templateUrl: './alcohol-small.component.html',
  styleUrls: ['./alcohol-small.component.scss']
})
export class AlcoholSmallComponent implements OnInit {
  @Input() alcohol: Alcohol | null = null;
  isMobile : boolean = window.innerWidth > 768;

  constructor() {
  }

  ngOnInit(): void {
  }
}
