import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import * as data from '../data/jammer.json';
import dashboardJammer, { jammer1, jammer2 } from '../data/jammer.json';


@Component({
  selector: 'app-dashboard-jammer',
  templateUrl: './dashboard-jammer.page.html',
  styleUrls: ['./dashboard-jammer.page.scss'],
})
export class DashboardJammerPage implements OnInit {

  Datajson: any = [];
  Jammer1: any = [];
  Jammer2: any = [];

  channelJam1: number[] = [1,2,3,4,5,6];
  channelJam2: number[] = [7,8,9,10,11,12];
  selectJam1: number = 1;
  selectJam2: number = 7;


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
    this.getDataJson();
  }
// Hitung BW Freq Start
calculateBwFreqStart(jammer: any): string {
  let bwFreqStart: any = 0;
  const bw = jammer.bw / 2;

  if (bw > jammer.freq) {
    bwFreqStart = (bw - jammer.freq) / 1000000;
  } else if (bw < jammer.freq) {
    bwFreqStart = (jammer.freq - bw) / 1000000;
  }
  return `${bwFreqStart}`;
}

// Hitung BW Freq End
calculateBwFreqEnd(jammer: any): string {
  let bwFreqEnd: any = 0;
  const bw = jammer.bw / 2;

  bwFreqEnd = (bw + jammer.freq) / 1000000;
  return `${bwFreqEnd}`;
}

//Freq center
FreqCenter(jammer: any): string{
  const freq = jammer.freq / 1000000;
  return `${freq}`;
}

// Freq Span
FreqSpan(jammer: any): string {
  const freqSpan = jammer.bw / 1000000;
  return `${freqSpan}`;
}

// RFAtt
RFAtt(jammer:any): string {
  const RfAtt = jammer.att / 100;
  return `${RfAtt}`;
}

countT(jammer:any): string {
  const countT = jammer.fs / 1000000;
  return `${countT}`;
}

countV(jammer:any): string {
  const countV = jammer.voltage / 1000;

  return `${countV}`;
}

countC(jammer:any): string {
  const countC = jammer.current / 1000;
  return `${countC}`;
}




// Ambil data Json
  getDataJson(){
    this.Datajson = dashboardJammer;
    this.Jammer1 = dashboardJammer.jammer1;
    this.Jammer2 = dashboardJammer.jammer2;
    console.log(dashboardJammer.jammer1);
    for (const jam1 of this.Jammer1) {
      const bwFreqStart: any = this.calculateBwFreqStart(jam1);
      const bwFreqEnd: any = this.calculateBwFreqEnd(jam1);

      console.log(bwFreqStart);
    }
  }

// Hitung - Hitungan



//Modal Jammer
  // Select button Group Modal jammer 1
  selectChannelJam1(channelJam1: number) {
    this.selectJam1 = channelJam1;
    return this.selectJam1;
  }

  // Select button Group Modal jammer 2
  selectChannelJam2(channelJam2: number) {
    this.channelJam2Tabs.forEach(tab => (tab.isActive = tab.channel === channelJam2));
    this.selectJam2 = channelJam2;
    console.log('Selected Channel : ', channelJam2);
    console.log('Selected Channel : ', this.selectJam2);

  }

//End Modal Jammer
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
