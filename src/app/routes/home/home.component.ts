import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  activeTab = 0;
  index = 0;
  constructor() { }

  ngOnInit() {
  }

  onPress(e) {
    this.index = 0;
    console.log(this.activeTab, this.index);
  }

}
