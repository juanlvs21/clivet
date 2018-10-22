import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor( private http: HttpClient) { }
  
  ngOnInit() {
    this.loadScripts();
  }

  // ---------- Doughnut ----------
  public doughnutChartLabels:string[] = ['Perros', 'Gatos'];
  public doughnutChartData:number[] = [25, 40];
  public doughnutChartType:string = 'doughnut';
 
  // ---------- Bar ----------
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Activas', 'Realizadas', 'Totales'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;
 
  public barChartData:any[] = [
    {data: [10, 40, 156], label: 'Consultas'}
  ];

  // ---------- Events ----------
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }

  loadScripts() {
    const dynamicScripts = [
      'assets/libs/jquery/jquery.min.js',
      'assets/libs/bootstrap/js/bootstrap.bundle.min.js',
      'assets/libs/chartjs/Chart.bundle.min.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
}
