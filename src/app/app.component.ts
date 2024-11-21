import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'web-scraping-frontend';
  url:string = ''
  products:any [] = []

  constructor(private datService:DataService){

  }

  ngOnInit(): void {
    this.getData()
  }

  deleteItem(id:string){
    console.log('id',id);
    this.datService.removeData(id)
      .subscribe({
        next: (res:any) => {
          console.log('next res',res);
          this.getData()
        },
        error: (error:any) => {
          console.log('error error',error);
          
        }
      })
  }

  getData(){
    this.datService.getData()
    .subscribe({
      next: (res:any) => {
        console.log('next res',res);
        this.products = res
        
      },
      error: (error:any) => {
        console.log('error error',error);
        
      }
    })
  }


}
