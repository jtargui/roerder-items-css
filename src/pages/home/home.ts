import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import 'rxjs/add/observable/interval';
import {Observable} from "rxjs";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  items = [];
  sub: any;
  constructor(public navCtrl: NavController, translate: TranslateService, public barcodeScanner: BarcodeScanner) {
    translate.setDefaultLang('es');
    for (let x = 0; x < 50; x++) {
      this.items.push({id:x, name: x});
    }
  }

  ngOnInit(): void {
    this.startSubroutine();
  }

  startSubroutine() {
    if (this.sub)
      return;

    this.sub = Observable.interval(1000)
      .subscribe((val) => {
        console.log('called', this.items);
        if (this.items.length>0) {
          this.items.pop();
        }
      });

  }

  stopSubRoutine() {
    this.sub.unsubscribe();
    this.sub = undefined;
  }

  reorderItems(indexes) {
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);
  }

  testAlter() {
    alert("test");
  }

  readBarCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      console.log('Error', err);
    });
  }

}
