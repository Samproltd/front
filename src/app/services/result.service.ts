import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }


  public addResult(result: any) {
    return this.http.post(`${baseUrl}/result/`, result);
  }

  public sendEmailResult(email: any) {
    return this.http.post(`${baseUrl}/sendingEmail/`, email);
  }




}
