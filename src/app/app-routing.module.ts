import { CountriesComponent } from './component/countries/countries.component';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:"/home" ,pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'countries',component:CountriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
