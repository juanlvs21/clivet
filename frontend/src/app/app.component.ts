import { Component } from '@angular/core';
import { ClivetService } from './services/clivet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private clivet:ClivetService){ }

}