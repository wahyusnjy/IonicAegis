import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-jammer',
  templateUrl: './dashboard-jammer.page.html',
  styleUrls: ['./dashboard-jammer.page.scss'],
})
export class DashboardJammerPage implements OnInit {
  channelJam1: number[] = [1,2,3,4,5,6];
  channelJam2: number[] = [7,8,9,10,11,12];
  selectJam1: number = 1;
  selectJam2: number = 7;

  channelJam1Tabs: { channel: number; isActive: boolean }[] = [
    { channel: 1, isActive: true },
    { channel: 2, isActive: false },
    { channel: 3, isActive: false },
    { channel: 4, isActive: false },
    { channel: 5, isActive: false },
    { channel: 6, isActive: false },
  ];

  channelJam2Tabs: { channel: number; isActive: boolean }[] = [
    { channel: 7, isActive: true },
    { channel: 8, isActive: false },
    { channel: 9, isActive: false },
    { channel: 10, isActive: false },
    { channel: 11, isActive: false },
    { channel: 12, isActive: false },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }


  selectChannelJam1(channelJam1: number) {
    this.channelJam1Tabs.forEach(tab => (tab.isActive = tab.channel === channelJam1));
    this.selectJam1 = channelJam1; 
    console.log('Selected Channel : ', channelJam1);
  }

  selectChannelJam2(channelJam2: number) {
    this.channelJam2Tabs.forEach(tab => (tab.isActive = tab.channel === channelJam2));
    this.selectJam2 = channelJam2;
    console.log('Selected Channel : ', channelJam2);
    console.log('Selected Channel : ', this.selectJam2);

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
