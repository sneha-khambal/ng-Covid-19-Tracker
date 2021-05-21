import { logging } from 'protractor';
import { GlobalSummary } from './../models/global-data';
import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import{map} from 'rxjs/operators'
import { DateWiseData } from '../models/date-wise-data';
 
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
 
  private    GlobalDataUrl= 'https://raw.githubusercontent.com/bumbeishvili/covid19-daily-data/master/misc/18-april.1.csv';
private  dateWiseDataUrl ='https://raw.githubusercontent.com/bumbeishvili/covid19-daily-data/master/time_series_19-covid-Confirmed.csv';
constructor( private http:HttpClient ) { }
 
getDataWiseData(){
return this.http.get(this.dateWiseDataUrl,{responseType:'text'}).pipe(
  map(result=>{
    let rows =result.split('\n');
  let mainData={};
    let header = rows[0];
    let dates = header.split(/,/);
    dates.splice(0 ,4);
    rows.splice(0 ,1);
    rows.forEach(row=>{
      let cols= row.split(/,/)
      let con =cols[1]
      cols.splice(0 , 4);
      mainData[con] = [];
      cols.forEach((value , index)=>{
      let dw :DateWiseData={
          cases : +value,
          country: con,
          date :new Date(Date.parse(dates[index])) 
        }
        mainData[con].push(dw)
       })
     })
 return mainData;
  })
)} 

getGlobalData(){
return this.http.get(this.GlobalDataUrl, {responseType : 'text'}).pipe(
  map((result)=>{
  const row =result.split('\n');
  let raw ={};
  row.splice(0,1)
   row.forEach(
   row=>{
  let cols =row.split(/,/);
  let cs={
   country : cols[0],
  confirmed : +cols[1],
  death : +cols[3],
  recovered :+cols[2],
  active  : +cols[4],
 }

 let temp :GlobalSummary =raw[cs.country];
 if(temp){
   temp.confirmed = cs.confirmed,
   temp.death = cs.death,
   temp.recovered = cs.recovered,
   temp.active =cs.active
   raw[cs.country]=temp;
   }
 else{
   raw[cs.country]=cs;
 }} )
 return <GlobalSummary[]> Object.values(raw);
  })
  )}}
