 
import { GlobalSummary } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit, Input } from '@angular/core';
 
 @Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  google:any;
   totalConfirmed =0;
  totalDeath =0;
  totalRecoverd =0;
  totalActive =0;
  loading = true;
  dataValue:number ;   
 globalData :GlobalSummary[];
     
  constructor( private dataService: DataServiceService) { };

  initChart(caseType : string){
    let datatable=[];
 datatable.push(["country" , "cases"]);
    this.globalData.forEach(
      cs=>{
       if(caseType == 'c')
        if(cs.confirmed > 2000 )
         this.dataValue = cs.confirmed
         if(caseType == 'd')
        if(cs.death > 1000)
        this.dataValue = cs.death
        if(caseType == 'a')
        if(cs.active > 2000)
        this.dataValue = cs.active
        if(caseType == 'r')
        if(cs.recovered > 2000)
         this.dataValue = cs.recovered;
        datatable.push([
           cs.country , this.dataValue])
     }
    );
    
//google- columnchart
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
   function drawChart() {
  var data = google.visualization.arrayToDataTable(datatable);
  var options = { height:500 };
  var chart = new google.visualization.ColumnChart(document.getElementById('curve_chart'));
  chart.draw(data, options);
    }
    //google-pieChart
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart1);

    function drawChart1() {
 var data = google.visualization.arrayToDataTable(datatable);
 var options = {  height:500  };
  var chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
  chart.draw(data, options);
   } }

   ngOnInit(): void {
 this.loading;
 this.dataService.getGlobalData().subscribe(
 {  next : (result)=>{
     this.globalData =result;
          result.forEach( cs=>{
             if(!Number.isNaN(cs.confirmed )){
               this.totalConfirmed += cs.confirmed,
               this.totalActive += cs.active,
               this.totalDeath += cs.death,
               this.totalRecoverd += cs.recovered
             }
        this.initChart('d');
          } 
           ) },
        complete : ()=>{
          this.loading = false;
        } } ) }

  updateChart(input :HTMLInputElement ){
    this.initChart(input.value );
  } }
 