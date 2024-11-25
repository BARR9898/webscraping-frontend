import { Component, ElementRef, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Chart, registerables } from 'chart.js'; // Importa Chart.js

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private chart: Chart | undefined;

  title = 'web-scraping-frontend';
  url:string = ''
  products:any [] = []
  charts_data:any
  data_name:string = ''

  constructor(private datService:DataService,private elementRef: ElementRef){

  }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.getData()
    this.getDataToCharts()
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


  getDataToCharts(){
    this.datService.getDataToCharts()
    .subscribe({
      next: (res:any) => {
        console.log('getDataToCharts next res',res);
        this.charts_data = res
        this.createChartGroupedByScore()
        this.createChartGroupedBySallers()
        
      },
      error: (error:any) => {
        console.log('getDataToCharts error error',error);
        
      }
    })
  }


  search(){

    const data = {
      url : this.url
    }

    this.datService.startCrawler(data)
      .subscribe({
        next: (res:any) => {
          console.log('startCrawler next res',res);
          this.getData()
          
        },
        error: (error:any) => {
          console.log('startCrawler error error',error);

        }
      })
  }


  public chartData:any = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  public chartOptions:any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };


  private createChartGroupedByScore(): void {
    // Obtiene la referencia al canvas en el HTML
    const ctx = (this.elementRef.nativeElement.querySelector('#chartGroupedByScore') as HTMLCanvasElement).getContext('2d');

    // Crea un gráfico de tipo 'bar'
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar', // Puedes cambiarlo por 'line', 'pie', etc.
        data: {
          labels: ['ITEMS POR POPULARIDAD'],
          datasets: this.charts_data.dataGroupedByScore
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    }
  }


  private createChartGroupedBySallers(): void {
    // Obtiene la referencia al canvas en el HTML
    const ctx = (this.elementRef.nativeElement.querySelector('#chartGroupedBySallers') as HTMLCanvasElement).getContext('2d');

    // Crea un gráfico de tipo 'bar'
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar', // Puedes cambiarlo por 'line', 'pie', etc.
        data: {
          labels: ['PRODUCTOS POR VENDEDOR'],
          datasets: this.charts_data.dataGroupeDataBySeller
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    }
  }


  editItem(data:any){
    this.datService.updateData(data)
      .subscribe({
        next: (res:any) => {
          console.log('updateData next res',res);
          
        },
        error: (error:any) => {
          console.log('updateData error error',error);

        }
      })
  }


  redirect(url:string){
    window.open(url, "_blank");
  }
}
