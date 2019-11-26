import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService){};

  title = 'fitness';
  openSidenav="false";

  ngOnInit(){
    this.authService.initAuthListener();
  }
}
