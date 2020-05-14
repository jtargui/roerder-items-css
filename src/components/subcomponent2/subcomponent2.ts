import { Component } from '@angular/core';
import {SharedVariablesService} from "../../service/shared-variable-service";

/**
 * Generated class for the Subcomponent2Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'subcomponent2',
  templateUrl: 'subcomponent2.html'
})
export class Subcomponent2Component {

  text: string;
  orderButton: boolean;

  constructor(public sharedVariableService: SharedVariablesService) {
    console.log('Hello Subcomponent2Component Component');
    this.text = 'Hello World';
    this.orderButton = !this.sharedVariableService.getIsOrderActive();
  }

  toogleOrder(b: boolean) {
    this.orderButton = !b;
    this.sharedVariableService.setOrderActive(b);
  }

  getValueCheck() {
    return this.sharedVariableService.getIsOrderActive();
  }
}
