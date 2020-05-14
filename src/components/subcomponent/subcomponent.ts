import {Component, OnInit} from '@angular/core';
import {SharedVariablesService} from "../../service/shared-variable-service";

/**
 * Generated class for the SubcomponentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'subcomponent',
  templateUrl: 'subcomponent.html'
})
export class SubcomponentComponent implements OnInit {

  text: string;
  isOrderActiveSub: boolean;

  constructor(public sharedVariableService: SharedVariablesService) {
    console.log('Hello SubcomponentComponent Component');
    this.text = 'Hello World';

  }

  toogleOrder(b: boolean) {
    this.sharedVariableService.setOrderActive(b);
  }

  ngOnInit(): void {
  }
}
