import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardJammerPageRoutingModule } from './dashboard-jammer-routing.module';

import { DashboardJammerPage } from './dashboard-jammer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardJammerPageRoutingModule
  ],
  declarations: [DashboardJammerPage]
})
export class DashboardJammerPageModule {}
