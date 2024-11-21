import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL:string = 'http://localhost:5000'

  constructor(
    private httpClient:HttpClient
  ) { }

  getData(){
   return this.httpClient.get(`${this.URL}/api/data`) 
  }

  removeData(id:string){
    return this.httpClient.delete(`${this.URL}/api/data/${id}`) 
   }

   updateData(){
    return this.httpClient.get('') 
   }
}
