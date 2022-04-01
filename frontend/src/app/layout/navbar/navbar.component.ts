import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() showSidebar = new EventEmitter<any>();
  @Output() favorite = new EventEmitter<any>();
  @Output() share = new EventEmitter<string>();
  @Input() title: string = '';
  @Output() titleChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
}
