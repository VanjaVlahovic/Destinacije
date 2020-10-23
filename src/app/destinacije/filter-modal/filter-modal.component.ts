import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit {

  public form = [
    { val: 'Planina', isChecked: false },
    { val: 'More', isChecked: false },
    { val: 'Grad', isChecked: false },
    { val: 'Selo', isChecked: false }
  ];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  filtriraj() {
    let poruka: string[] = [];
    let brojac = 0;
    for ( const f of this.form.entries()){
      if (f[1].isChecked){
        poruka[brojac] = f[1].val;
        brojac++;
      }
    }
    this.modalCtrl.dismiss({string: poruka}, 'confirm');
  }
}
