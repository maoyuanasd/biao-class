import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly appKey='5ef193f0134e780440fbd6059bd62f754f52baa61ca54c65d435420fc4b065be';
  timestamp=Date.now();
  constructor(private http:HttpClient) { }
  send(url,data=null){
    return this.http.post(`https://mock.biaoyansu.com/api/1/${url}`,data,{
      headers: new HttpHeaders({
        'BIAO-MOCK-APP-KEY': this.appKey,
        'BIAO-MOCK-TIMESTAMP': this.timestamp.toString(),
        'BIAO-MOCK-SIGNATURE': this.sign(),
      })
    })
  }
  private sign(){
    return btoa(this.appKey+this.timestamp);
  }
}
