import { Component, OnInit } from '@angular/core';
import { GeolocationPosition } from '@capacitor/geolocation';
import { Geolocation } from '@capacitor/geolocation';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  map!: mapboxgl.Map;
  currentLocation: any = [];

  constructor() { }

  ngOnInit() {
    this.getCurrentLocationAndInitMap();
  }

  async getCurrentLocationAndInitMap() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.currentLocation = [coordinates.coords.longitude, coordinates.coords.latitude];
      this.initMap();
      console.log(coordinates);
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  }

  initMap() {
    console.log(this.currentLocation);
    const map = new mapboxgl.Map({
      container: 'map', // ID elemen tempat peta akan ditampilkan
      style: 'mapbox://styles/mapbox/streets-v11', // Ganti dengan style yang diinginkan
      center: this.currentLocation, // Ganti dengan koordinat yang diinginkan
      zoom: 16, // Ganti dengan level zoom yang diinginkan
      accessToken: 'pk.eyJ1Ijoid2FoeXVzYW5qYXlhIiwiYSI6ImNsajJwYXVyaTBwNHMzcHM2dm5rcmEyNzYifQ.GpprqvduyqHWm9wielxwdw' // Token akses Mapbox Anda
    });

    new mapboxgl.Marker()
      .setLngLat(this.currentLocation)
      .addTo(map);
  }



  scan() {
    const elmnt = document.querySelector('.btn-start-scan');
    const elmnt2 = document.querySelector('.btn-stop-scan');
    const startscantext = document.querySelector('.before-scan');
    const stopscantext = document.querySelector('.proses-scan');

    if(elmnt !== null) {
      if(!elmnt.classList.contains('btn-stop-scan')){
        elmnt.classList.add('btn-stop-scan')
        elmnt.classList.remove('btn-start-scan')

        if(startscantext !== null) {
          if(!startscantext.classList.contains('proses-scan')){
            startscantext.classList.add('proses-scan')
            startscantext.classList.remove('before-scan')
          }
        }
      }
    }else if (elmnt2 !== null) {
      if(!elmnt2.classList.contains('btn-start-scan')) {
        elmnt2.classList.add('btn-start-scan')
        elmnt2.classList.remove('btn-stop-scan')

        if(stopscantext !== null) {
          if(!stopscantext.classList.contains('before-scan')){
            stopscantext.classList.add('before-scan')
            stopscantext.classList.remove('proses-scan')
          }
        }
      }
    }
  }

  vhf(){
    const elvhf = document.querySelector('.border-qj-vhf');
     // Check if the element has the 'active' class
     if( elvhf !== null){
      if (!elvhf.classList.contains('active')) {
        // Add the 'active' class if not present
        elvhf.classList.add('active');
      } else {
        // Remove the 'active' class if already present
        elvhf.classList.remove('active');
      }
    }
  }

  cell(){
    const elcell = document.querySelector('.border-qj-cell');
    if( elcell !== null){
      if (!elcell.classList.contains('active')) {
        // Add the 'active' class if not present
        elcell.classList.add('active');
      } else {
        // Remove the 'active' class if already present
        elcell.classList.remove('active');
      }
    }
  }

  wifi(){
    const elwifi = document.querySelector('.border-qj-wifi');
    if( elwifi !== null){
      if (!elwifi.classList.contains('active')) {
        // Add the 'active' class if not present
        elwifi.classList.add('active');
      } else {
        // Remove the 'active' class if already present
        elwifi.classList.remove('active');
      }
    }
  }

  all(){
    const elmntall = document.querySelector('.border-qj-all');
    if( elmntall !== null){
      if (!elmntall.classList.contains('active')) {
        // Add the 'active' class if not present
        elmntall.classList.add('active');
      } else {
        // Remove the 'active' class if already present
        elmntall.classList.remove('active');
      }
    }
  }


}
