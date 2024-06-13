import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-case-status-screen',
  templateUrl: './case-status-screen.component.html',
  styleUrls: ['./case-status-screen.component.scss']
})
export class CaseStatusScreenComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private authService: AuthService) { }
  ngOnInit(): void {
  }
}
