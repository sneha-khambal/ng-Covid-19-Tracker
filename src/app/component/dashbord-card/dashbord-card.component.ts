import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashbord-card',
  templateUrl: './dashbord-card.component.html',
  styleUrls: ['./dashbord-card.component.css']
})
export class DashbordCardComponent implements OnInit {
@Input('totalDeath')
totalDeath;
@Input('totalActive')
totalActive;
@Input('totalConfirmed')
totalConfirmed;
@Input('totalRecoverd')
totalRecoverd;
 
ngOnInit(): void {
    
  }

}
