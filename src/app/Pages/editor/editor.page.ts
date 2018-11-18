import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

  Json: string = this.navParams.get('Json');
  Pipe: any;

  constructor(private _Modal: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.Cambio();
  }

  Cambio(){
    try{
      this.Pipe = JSON.parse(this.Json);
    }catch(e){}
  }

}
