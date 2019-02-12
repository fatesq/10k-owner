import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  activeTab = window.location.hash.indexOf('orderlist') > 0 ? 'orderlist' : 'overlist';
  index = 0;
  index2 = 0;
  indexTab = window.location.hash.indexOf('orderlist') > 0 ? 0 : 1;
  constructor(
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit() {}


  onPress(e) {
    this.activeTab = e.key;
    this.router.navigateByUrl(`/home/${e.key}/0`);
  }

  onChange(e) {
    this.router.navigateByUrl(`/home/${this.activeTab}/${e.index}`);
  }

}
