import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const api = 'https://api.qinhemili.com';

@Injectable()
export class ApiService {
    constructor(
        private httpClient: HttpClient,
        // private header: HttpHeaders
    ) {}

    setToken(token) {
        // this.header.set('token', token)
    }

    dologin(param) {
        return this.httpClient.post(`${api}/saleCms/login`, param);
    }

    reserveList(param) {
        return this.httpClient.post(`${api}/saleCms/reserveList`, param);
    }

}
