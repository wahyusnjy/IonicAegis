import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-history',
  templateUrl: './log-history.page.html',
  styleUrls: ['./log-history.page.scss'],
})
export class LogHistoryPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectToDashboard() {
    this.router.navigateByUrl('dashboard-jammer');
  }
}
