import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import 'rxjs/add/observable/interval';
import {Observable} from "rxjs";
import {SpeechRecognition} from "@ionic-native/speech-recognition";
import {SharedVariablesService} from "../../service/shared-variable-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  items = [];
  sub: any;
  isSpeechRecognitionAvailable: boolean;
  textRead: string = "Pulsa listen!";
  assistantName: string;
  isOrderActive: boolean;

  constructor(public navCtrl: NavController,
              translate: TranslateService,
              public barcodeScanner: BarcodeScanner,
              public speechRecognition: SpeechRecognition,
              public sharedVariableService: SharedVariablesService) {
    translate.setDefaultLang('es');
  }

  toogleOrder(b: boolean) {
    this.sharedVariableService.setOrderActive(b);
  }

  ngOnInit(): void {
    //this.startSubroutine();
    /*
    this.speechRecognition.isRecognitionAvailable()
    .then((available: boolean) =>  {
      console.log(available);
      this.isSpeechRecognitionAvailable = true;
      //this.startListening();
     }
    );*/
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

  // Hablación

  startListening() {
    // Start the recognition process
    this.textRead = "Te eschuco...";
      this.speechRecognition.startListening({
        language: 'es-ES',
        matches: 5,
        prompt: "Dime algo",      // Android only
        showPopup: true,  // Android only
        showPartial: false
      }).subscribe(
        (matches: Array<string>) => {
          console.log(matches);
          if (matches) {
            var resultIsOk = false;
            matches.forEach( item => {
              if (!resultIsOk && item.toLowerCase().includes(this.assistantName.toLowerCase())) {
                // Eliminamos la palabra clave
                item = item.toLowerCase().replace(this.assistantName.toLowerCase(), '');

                // Quitamos los espacios en blanco
                const search = ' ';
                const searchRegExp = new RegExp(search, 'g'); // Throws SyntaxError
                const replaceWith = '';
                item = item.replace(searchRegExp, replaceWith);
                console.log(item);

                // En el caso de es-ES tratamos las palabras de separación de decimales "con", ","...
                if (item.includes('con')) {
                  item = item.replace('con', '.');
                } else {
                  item = item.replace(',', '.');
                }

                // Si el valor es un numerico válido, lo añadimos
                if (!isNaN(parseFloat(item))){
                  this.items.push({id:1, name: parseFloat(item)});
                  resultIsOk = true;
                  console.log(this.items);
                }
              }
            });

            if (!resultIsOk) {
              this.textRead = "Vocaliza mejor. Amigo, ¿Eres de Palomares?";
            } else {
              this.textRead = "Pulsa listen!";
            }
            console.log(this.textRead);
            //this.startListening();
          }
        },
        (onerror) => {
          console.log('error:', onerror);
          this.textRead = onerror;
        }
      );
  }

  reverseItems() {
    return this.items.reverse();
  }
}
