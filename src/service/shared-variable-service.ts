import {Observable, Observer} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class SharedVariablesService {

  // Tenemos activa la ordenación
  private isOrderActive : boolean;

  constructor() {
   }

  // Activamos/desactivamos la ordenación
  public setOrderActive(val: boolean) {
    this.isOrderActive = val;
  }

  // Ver estado de la ordenacion
  public getIsOrderActive() {
    return this.isOrderActive;
  }

}
