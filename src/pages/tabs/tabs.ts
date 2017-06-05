import { Component } from '@angular/core';

import { LocationsPage } from '../locations/locations';
import { HomePage } from '../home/home';
import {ClimbPage} from "../climb/climb";
import {StatsPage} from "../stats/stats";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  rootHome = HomePage;
  rootLocations = LocationsPage;
  rootClimb = ClimbPage;
  rootStats = StatsPage;

  constructor() {

  }
}
