import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardJammerPage } from './dashboard-jammer.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardJammerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardJammerPageRoutingModule {}
