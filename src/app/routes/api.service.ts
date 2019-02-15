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

    getOrderList(param) {
        return this.httpClient.post(`${api}/saleCms/getOrderList`, param);
    }

    reserveDetail(id) {
        return this.httpClient.get(`${api}/saleCms/reserveDetail?code=${id}`);
    }

    getOrderDetail(id) {
        return this.httpClient.get(`${api}/saleCms/getOrderDetail?code=${id}`);
    }

    orderUpdate(param) {
        return this.httpClient.post(`${api}/reserve/update`, param);
    }

    getOrderUpdate(param) {
        return this.httpClient.post(`${api}/getOrder/update`, param);
    }

    out() {
        return this.httpClient.get(`${api}/saleCms/out`);
    }

    one() {
        return this.httpClient.get(`${api}/ownSaleman/one?sid=${localStorage['uid']}`);
    }

    ownSaleman() {
        return this.httpClient.get(`${api}/ownSaleman/all`);
    }
}
