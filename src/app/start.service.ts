import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { parse, stringify } from 'qs';
const api = 'https://api.qinhemili.com';
@Injectable({
  providedIn: 'root'
})
export class StartService {

constructor(
  private httpClient: HttpClient,
  // private header: HttpHeaders,
  // private router: Router
) { }

load(): Promise<any> {
  return new Promise((resolve, reject) => {
      this.httpClient.get(`${api}/saleCms/auto`).subscribe(res => {
        if (res['code'] != 200) {
          window.location.hash = `/login`;
          resolve();
        } else {
          localStorage['token'] = res['data'].token;
          localStorage['uid'] = res['data'].sid;
          localStorage['auth'] = res['data'].auth;
          window.location.hash = '/home';
          resolve();
        }
      });
  });
}

}
