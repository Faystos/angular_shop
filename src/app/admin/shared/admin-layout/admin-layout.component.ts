import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {  
  isAuth: boolean;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {}

  logout = (evt: Event) => {
    evt.preventDefault();
    this.authService.logout();
    this.router.navigate(['/admin', 'login']);
  }

}
