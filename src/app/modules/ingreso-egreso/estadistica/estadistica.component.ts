import { IngresoEgreso } from 'src/app/core/models/ingreso-egreso.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.reducer';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  public ingresos: number = 0;
  public totalIngresos: number = 0;

  public egresos: number = 0;
  public totalEgresos: number = 0;

  public balance: number = 0;
  
  public doughnutChartLabels: string[] = [ 'Egresos', 'Ingresos'  ];
  public doughnutChartData: MultiDataSet = [ [ 0, 0 ] ];
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: any, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: any, active: {}[] }): void {
    console.log(event, active);
  }

  
  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('financy')
      .subscribe( ({ items }) => this.generateStatistics(items) );
  }

  generateStatistics(items: IngresoEgreso[]): number {
    this.ingresos = 0;
    this.totalIngresos = 0;
    this.egresos = 0;
    this.totalEgresos = 0;
    this.balance = 0;
    items.forEach( item => {
      if ( item.type === 'ingreso' ) {
        this.ingresos += item.amount;
        this.totalIngresos++;
      } else {
        this.egresos += item.amount;
        this.totalEgresos++;
      }
    });

    this.balance = this.ingresos - this.egresos;
    this.doughnutChartData = [ [ this.egresos, this.ingresos ] ];
    return 0;
  }
}
