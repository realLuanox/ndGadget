import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent implements OnInit {
  @Output() floaterClick = new EventEmitter<any>();
  @Input() type: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  emit(): void {
    const event = new CustomEvent('floater-click');
    document.dispatchEvent(event);
  }

}
