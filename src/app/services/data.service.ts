import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL:string = 'http://localhost:4000'

  constructor(
    private httpClient:HttpClient
  ) { }

  getData(){
   return this.httpClient.get(`${this.URL}/api/data`) 
  }

  removeData(id:string){
    return this.httpClient.delete(`${this.URL}/api/data/${id}`) 
   }

   updateData(data:any){
    return this.httpClient.put(`${this.URL}/api/data/${data._id}`,data) 
   }

   startCrawler(data:any){
    return this.httpClient.post(`${this.URL}/api/data/save`,data) 
   }

   getDataToCharts(){
    return this.httpClient.get(`${this.URL}/api/data/charts`) 
   }
}
