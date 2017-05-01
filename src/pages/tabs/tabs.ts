import { Component } from '@angular/core';

import { LocationsPage } from '../locations/locations';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  rootHome = HomePage;
  rootLocations = LocationsPage;

  constructor() {

  }
}
