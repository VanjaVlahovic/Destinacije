import {Component, Input, OnInit} from '@angular/core';
import {Destinacija} from '../destinacija.model';
import {AlertController, LoadingController} from '@ionic/angular';
import {DestinacijeService} from '../destinacije.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-dest-element',
  templateUrl: './dest-element.component.html',
  styleUrls: ['./dest-element.component.scss'],
})
export class DestElementComponent implements OnInit {

  @Input() destinacija: Destinacija;
  rating = 5;
  @Input() ikonica = 'bookmark-outline';
  user: string;
  sacuvane: Destinacija[] = [];

  constructor(private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private destService: DestinacijeService,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.userId.subscribe((user) => {
      this.user = user;

      this.destService.sacuvaneDestinacije.subscribe((destinacije) => {
        this.sacuvane = destinacije;
        const index = this.sacuvane.findIndex((d) => d.id === this.destinacija.id && d.korisnik === user);
        if (index !== -1) {
            this.ikonica = 'bookmark';
          }
      });
    });
  }

  cuvanje() {
    this.loadingCtrl.create({message: 'Čuvanje...'}).then(loadingEl => {
      loadingEl.present();
      this.destService.saveDestination(this.destinacija).subscribe(() => {
        loadingEl.dismiss();
        this.ikonica = 'bookmark';
      });
    });
  }

  openAlert(event) {
    event.stopPropagation();
    event.preventDefault();

    if (this.destService.daLiJeSacuvana(this.destinacija.id, this.user) === true) {
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
                  this.ikonica = 'bookmark-outline';
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
    } else {
      this.alertCtrl.create({
        header: 'Čuvanje destinacije',
        message: 'Da li ste sigurni da zelite da sačuvate ovu destinaciju?',
        buttons: [
          {
            text: 'Sačuvaj',
            handler: () => {
              this.cuvanje();
              console.log('Sačuvano!');
            }
          },
          {
            text: 'Odbaci',
            role: 'cancel',
            handler: () => {
              console.log('Nije sačuvano!');
            }
          }
        ]
      }).then((alert) => {
        alert.present();
      });
    }
  }
}
