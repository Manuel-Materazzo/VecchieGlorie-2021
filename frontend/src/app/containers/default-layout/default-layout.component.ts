import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import {AuthenticationService} from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  authService: AuthenticationService;

  constructor(authService: AuthenticationService) {
    this.authService = authService;
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(){
    this.authService.logout();
    console.log("ciao");
  }
}
