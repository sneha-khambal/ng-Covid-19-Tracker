import { GlobalSummary } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit} from '@angular/core';
 
import { DateWiseData } from 'src/app/models/date-wise-data';
 
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})

export class CountriesComponent implements OnInit {
  google:any;
  globalData :GlobalSummary[];
  countries:string[]=[];
  totalConfirmed =0;
  totalDeath =0;
  totalRecoverd =0;
  totalActive =0;
  selectedData :DateWiseData[];
  dateWiswData ;
 
 constructor(private service:DataServiceService) { }

ngOnInit(): void {
 this.service.getDataWiseData().subscribe(
   (result)=>{
  this.dateWiswData = result;
  this.updateChart();
   } )

 this.service.getGlobalData().subscribe(
  result=>{
    this. globalData =result;
    this. globalData.forEach(cs=>{
   this.countries.push(cs.country)
    }) }  )
 }

 updateChart(){
  let datatable=[];
  datatable.push(["Cases","Date"]);
  this.selectedData.forEach( ds=>{
 datatable.push([+ds.date , +ds.cases])
});
//google-piechart
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
 var data = google.visualization.arrayToDataTable(datatable);
 var options = {
  height:500
  };
 var chart = new google.visualization.LineChart(document.getElementById('columnChart'));
 chart.draw(data, options);
}
 }

  updateData(country :string){
 
 this. globalData .forEach(
   cs=>{
  if(cs.country == country){
    this.totalActive =cs.active
    this.totalConfirmed = cs.confirmed
    this.totalDeath = cs.death
    this.totalRecoverd = cs.recovered
  } } )
   this.selectedData =this.dateWiswData[country];
   this.updateChart();
 }
 }


  