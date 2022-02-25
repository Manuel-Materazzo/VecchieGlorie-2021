import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import {ToastService} from "../../services/toast.service";

import { AuthenticationService } from '../../services/auth.service';
import {MessageService} from "primeng/api";

import shajs from "sha.js";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  providers: [MessageService, ToastService]
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  username: string;
  password: string;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastService: ToastService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = '/';
  }

//quando clicco sul tasto login
  onSubmit() {
    this.submitted = true;
    this.loading = true;

    this.authenticationService.login( this.username, shajs('sha256').update(this.password).digest('hex'))
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.toastService.ErrorToast("Si è verificato un'errore","Username o password errati");
          this.password = "";
          this.error = true;
          this.loading = false;
        });
  }
}
