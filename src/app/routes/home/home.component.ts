import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  activeTab = 'orderlist';
  index = 0;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onPress(e) {
    this.activeTab = e.key;
    this.router.navigateByUrl(`/home/${e.key}/0`);
  }

  onChange(e) {
    this.router.navigateByUrl(`/home/${this.activeTab}/${e.index}`);
  }

}
