import { Component } from '@angular/core';
import { udpplugin } from 'udp-plugin';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}


  async udp() {
    // const dataToSend = {data:"Hello"};
    const serverIp = "192.168.3.14"; // Ganti dengan alamat IP yang sesuai
    const serverPort = 1502;
    const dataToSend = {
      data: { read: true, write: false },
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

}
