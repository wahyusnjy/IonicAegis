import { Component, OnInit   } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-jammer',
  templateUrl: './dashboard-jammer.page.html',
  styleUrls: ['./dashboard-jammer.page.scss'],
})
export class DashboardJammerPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectToMainDashboard() {
    this.router.navigateByUrl('dashboard');
  }

  redirectToLog() {
    this.router.navigateByUrl('log-history');
  }

  showModalJam1() {
    const modal = document.getElementById('jammer1');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  showModalJam2() {
    const modal = document.getElementById('jammer2');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  }

}
