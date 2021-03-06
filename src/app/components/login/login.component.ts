import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {}

  login() {
    this.commonService.loginWithGoogle();
  }
}
