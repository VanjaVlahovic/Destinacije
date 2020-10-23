import {Component, Input, OnInit} from '@angular/core';
import {Destinacija} from '../destinacija.model';
import {AlertController, LoadingController} from '@ionic/angular';
import {DestinacijeService} from '../destinacije.service';

@Component({
  selector: 'app-saved-element',
  templateUrl: './saved-element.component.html',
  styleUrls: ['./saved-element.component.scss'],
})
export class SavedElementComponent implements OnInit {

  @Input() destinacija: Destinacija;
  @Input() rating;

  constructor(private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private destService: DestinacijeService) { }

  ngOnInit() {
    if (this.destinacija.ocena !== null) {
      this.rating = this.destinacija.ocena;
    }
  }

  openAlert(event) {
    event.stopPropagation();
    event.preventDefault();

    this.alertCtrl.create({
        header: 'Čuvanje destinacije',
        message: 'Već ste sačuvali ovu destinaciju. Da li želite da je izbacite iz sačuvanih?',
        buttons: [
          {
            text: 'Da',
            handler: () => {
              this.loadingCtrl.create({message: 'Izbacivanje...'}).then(loadingEl => {
                loadingEl.present();
                this.destService.unSaveDestination(this.destinacija.sacuvanaId).subscribe(() => {
                  loadingEl.dismiss();
                });
              });
            }
          },
          {
            text: 'Ne',
            handler: () => {
              console.log('Obustavljeno!');
            }
          }
        ]
      }).then((alert) => {
        alert.present();
      });
  }
  oceni() {
    this.destService.starDestination(this.destinacija, this.rating as string).subscribe((res) => {
          this.destinacija.ocena = this.rating as string; });
    console.log(this.destService.sacuvaneDestinacije);
  }
}
