import { Component } from '@angular/core';

import { LocationsPage } from '../locations/locations';
import { HomePage } from '../home/home';
import {ClimbingPage} from "../climbing/climbing";
import {StatsPage} from "../stats/stats";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  rootHome = HomePage;
  rootLocations = LocationsPage;
  rootClimb = ClimbingPage;
  rootStats = StatsPage;

  constructor() {

  }
}
