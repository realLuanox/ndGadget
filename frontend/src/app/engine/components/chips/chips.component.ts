import {Component, Input, OnInit} from '@angular/core';
import {Alcohol} from "../../interfaces/alcohol";

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {
  @Input() alcohol: Alcohol | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }
}
