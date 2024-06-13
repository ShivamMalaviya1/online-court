import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-payment-screen',
  templateUrl: './payment-screen.component.html',
  styleUrls:[ './payment-screen.component.scss']
})
export class PaymentScreenComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private authService: AuthService) { }
  ngOnInit(): void {
  }
}
