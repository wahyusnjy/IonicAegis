import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { udpplugin } from 'udp-plugin';
import dashboardJammer, { jammer1, jammer2 } from '../data/jammer.json';
// import * as fs from 'fs';


@Component({
  selector: 'app-dashboard-jammer',
  templateUrl: './dashboard-jammer.page.html',
  styleUrls: ['./dashboard-jammer.page.scss'],
})
export class DashboardJammerPage implements OnInit {

  Datajson: any = [];
  mergedJson: any = [];
  Jammer1: any = [];
  Jammer2: any = [];

  vhfChecked: boolean = false;
  cellularChecked: boolean = false;
  wifiChecked: boolean = false;
  allChecked: boolean = false;

  resultFilter: any = '';

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

// =================================== Hitung Hitungan =====================================
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

//============================= End Hitung Hitungan ===================================

//============================= Ambil data Json =======================================
getDataJson(){
  this.Datajson = dashboardJammer;
  this.Jammer1 = dashboardJammer.jammer1;
  this.Jammer2 = dashboardJammer.jammer2;

  this.mergedJson = [dashboardJammer.jammer1, dashboardJammer.jammer2]

  console.log(this.Datajson);
  console.log(dashboardJammer.jammer1);
  for (const jam1 of this.Jammer1) {
    const bwFreqStart: any = this.calculateBwFreqStart(jam1);
    const bwFreqEnd: any = this.calculateBwFreqEnd(jam1);

    console.log(bwFreqStart);
  }
}

//============================= End Ambil data Json =======================================


//============================= Filtering Channel =======================================

isChannelSelected(jam1: any): boolean {
  const connected = jam1.connected;

  if (connected === true) {

    if(this.vhfChecked) {
      const frequencyRangeStart = 30;
      const frequencyRangeEnd = 1700;

      const frequency = jam1.freq / 1000000;
      const result = frequency >= frequencyRangeStart && frequency <= frequencyRangeEnd;

      return result;

    }else if(this.cellularChecked){
      const frequencyRangeStart = 1700;
      const frequencyRangeEnd = 6000;

      const frequency = jam1.freq / 1000000;
      const result = frequency >= frequencyRangeStart && frequency <= frequencyRangeEnd;

      return result;
    }else if(this.wifiChecked){
      const frequencyRangeStart = 2400;
      const frequencyRangeEnd = 5850;

      const frequency = jam1.freq / 1000000;
      const result = frequency >= frequencyRangeStart && frequency <= frequencyRangeEnd;

      return result;

    }else if(this.allChecked){
      const frequencyRangeStart = 30;
      const frequencyRangeEnd = 6000;

      const frequency = jam1.freq / 1000000;
      const result = frequency >= frequencyRangeStart && frequency <= frequencyRangeEnd;

      return result;
    }
  }

  return false;
}


filtervhf() {
  console.log("Get filtervhf", this.vhfChecked);
  const frequencyRangeStart = 30;
  const frequencyRangeEnd = 1700;
  if(this.vhfChecked){
    for (const merge of this.mergedJson) {
      const filteredChannels = merge.filter((channel: any) => {
      const connected = channel.connected;
        if(connected === true){
          const frequency = channel.freq / 1000000; // Ganti dengan nama properti frekuensi di JSON Anda
          const result = frequency >= frequencyRangeStart && frequency <= frequencyRangeEnd;
          if (result) {
            const id_result = channel.id;
            const array = `${id_result}`;
            console.log(array);
          }
          return result;
        }
          return false;
      });
    }
  }
}

filtercellular() {
  console.log("Get filtercellular", this.cellularChecked);
  const frequencyRangeStart = 1700;
  const frequencyRangeEnd = 6000;
  if(this.cellularChecked){
    for (const merge of this.mergedJson) {

      const filteredChannels = merge.filter((channel: any) => {
        const connected = channel.connected;
        if(connected === true){
        const frequency = channel.freq / 1000000; // Ganti dengan nama properti frekuensi di JSON Anda
        const result = frequency >= frequencyRangeStart && frequency <= frequencyRangeEnd;
        if (result) {
          const id_result = channel.id;
          console.log(id_result);
        }
        return result;
        }
        return false;
      });
    }

  }
}

filterwifi() {
  console.log("Get filterwifi", this.wifiChecked);
  const frequencyRangeStart = 2400;
  const frequencyRangeEnd = 5850;
  if(this.wifiChecked){
    for (const merge of this.mergedJson) {
      const filteredChannels = merge.filter((channel: any) => {
        const connected = channel.connected;
        if(connected === true){
          const frequency = channel.freq / 1000000; // Ganti dengan nama properti frekuensi di JSON Anda
          const result = frequency >= frequencyRangeStart && frequency <= frequencyRangeEnd;
          if (result) {
            const id_result = channel.id;
            console.log(id_result);
          }
          return result;
        }
        return false;
      });
    }
  }
}

filterall() {
  console.log("Get filterall", this.allChecked);
  const frequencyRangeStart = 30;
  const frequencyRangeEnd = 6000;
  if(this.allChecked){
    for (const merge of this.mergedJson) {
        const filteredChannels = merge.filter((channel: any) => {
          const connected = channel.connected;
          if(connected === true){
            const frequency = channel.freq / 1000000;
            const result = frequency >= frequencyRangeStart && frequency <= frequencyRangeEnd;

            if (result) {
              const id_result = channel.id;
              console.log(id_result);
            }
          return result;
          }
          return false;
        });
    }
  }
}


//============================= End Filtering Channel =======================================



//============================= Run UDP =======================================

async runUdp(channel: any){
  const serverIp = channel.ip; // Ganti dengan alamat IP yang sesuai
  const serverPort = 1502;
  const dataToSend = {
    data: {
      freq : channel.freq,
      bw : channel.bw,
      fs : channel.fs,
      att: channel.att,
      amp_power: channel.amp_power,
      rxd_led: channel.rxd_led,
      read: false,
      write: true
    },
    serverIp: serverIp,
    serverPort: serverPort
  };

  console.log(dataToSend);
  try {
    let response = await udpplugin.sendUdpData(dataToSend);
    console.log(response);
    await this.showAlert("Return value is " + JSON.stringify(response));
  } catch (error) {
    await this.showAlert("Error: " + JSON.stringify(error));
  }
}


//============================= End Run UDP ====================================

// ============================ Alert ======================

async showAlert(message: string) {
  return new Promise<void>((resolve) => {
    alert(message);
    resolve();
  });
}

// ============================ End Alert ==================

//============================= Stop UDP =======================================
async stopUdp(channel: any){
  const serverIp = channel.ip; // Ganti dengan alamat IP yang sesuai
  const serverPort = 1502;
  const dataToSend = {
    data: {
      freq : channel.freq,
      bw : channel.bw,
      fs : channel.fs,
      att: channel.att,
      amp_power: false,
      rxd_led: channel.rxd_led,
      read: false,
      write: true
    },
    serverIp: serverIp,
    serverPort: serverPort
  };
  try {
    const response = await udpplugin.sendUdpData(dataToSend);
    alert("Return valueeee is " + JSON.stringify(response));
  } catch (error) {
    alert("Return Error is " + JSON.stringify(error));
  }
}

//============================= End Stop UDP =======================================

//============================= Modal Jammer =============================
  // Select button Group Modal jammer 1
  selectChannelJam1(channelJam1: number) {
    this.selectJam1 = channelJam1;
    return this.selectJam1;
  }

  // Select button Group Modal jammer 2
  selectChannelJam2(channelJam2: number) {
    this.selectJam2 = channelJam2;
  }

//============================= End Modal Jammer =============================


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
