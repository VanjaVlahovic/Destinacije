import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-dest-modal',
  templateUrl: './dest-modal.component.html',
  styleUrls: ['./dest-modal.component.scss'],
})
export class DestModalComponent implements OnInit {

  @ViewChild('f', {static: true}) form: NgForm;
  @Input() naslov: string;
  @Input() naziv: string;
  @Input() opis: string;
  @Input() imageUrl: string;
  @Input() tip: string;

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onAddDestination() {
    if (!this.form.valid) {
      return;
    }

    this.modalCtrl.dismiss({
      DestinationData:
          {
            naziv: this.form.value['naziv'],
            opis: this.form.value['opis'],
            imageUrl: this.form.value['imageUrl'],
            tip: this.form.value['tip'],
          }
    }, 'confirm');
  }
}
