import { Component, OnInit } from '@angular/core';
import {Destinacija} from '../../destinacija.model';
import {AlertController, LoadingController, ModalController, NavController} from '@ionic/angular';
import {DestinacijeService} from '../../destinacije.service';
import {ActivatedRoute} from '@angular/router';
import {DestModalComponent} from '../../dest-modal/dest-modal.component';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-dest-detalji',
  templateUrl: './dest-detalji.page.html',
  styleUrls: ['./dest-detalji.page.scss'],
})
export class DestDetaljiPage implements OnInit {
  destinacija: Destinacija;
  isLoading = false;
  disable = true;
  user = '';

  constructor(private route: ActivatedRoute,
              private navCtrl: NavController,
              private destService: DestinacijeService,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/destinacije/tabs/kolekcija');
        return;
      }

      this.isLoading = true;

      this.authService.userId.subscribe((user) => {
        this.user = user;
      });

      this.destService
          .getDestination(paramMap.get('id'))
          .subscribe((destinacija) => {
            this.destinacija = destinacija;
            this.isLoading = false;
            this.provera(this.destinacija);
          });
    });
  }

  provera(destinacija: Destinacija){
    if (this.user !== destinacija.userId){
      this.disable = true;
    }else {
      this.disable = false;
    }
  }
  onEditDest() {
      this.modalCtrl.create({
        component: DestModalComponent,
        componentProps: {
          naslov: 'Izmeni destinaciju',
          naziv: this.destinacija.naziv,
          opis: this.destinacija.opis,
          imageUrl: this.destinacija.imageUrl,
          tip: this.destinacija.tip
        }
      }).then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      }).then((resultData) => {
        if (resultData.role === 'confirm') {
          console.log(resultData);

          this.destService
              .editDestination(
                  this.destinacija.id,
                  resultData.data.DestinationData.naziv,
                  resultData.data.DestinationData.opis,
                  resultData.data.DestinationData.imageUrl,
                  resultData.data.DestinationData.tip,
                  this.destinacija.userId)
              .subscribe((res) => {
                this.destinacija.naziv = resultData.data.DestinationData.naziv,
                    this.destinacija.opis = resultData.data.DestinationData.opis,
                    this.destinacija.imageUrl = resultData.data.DestinationData.imageUrl,
                    this.destinacija.tip = resultData.data.DestinationData.tip;
              });
        }
      });
  }

  onDeleteDest() {
      this.loadingCtrl.create({message: 'Brisanje...'}).then(loadingEl => {
        loadingEl.present();
        this.destService.deleteDestination(this.destinacija.id).subscribe(() => {
          loadingEl.dismiss();
          this.navCtrl.navigateBack('/destinacije/tabs/kolekcija');
        });
      });
  }

  showErrMsg() {
    this.alertCtrl.create({
      header: 'Zabranjena akcija',
      message: 'Možete menjati i brisati samo destinacije koje ste Vi uneli...',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Primljeno k znanju!');
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

  poruka() {
    if (this.disable === true){
      this.showErrMsg();
    }
  }
}
