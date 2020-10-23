import { Component, OnInit } from '@angular/core';
import {DestinacijeService} from '../destinacije.service';
import {MenuController, ModalController} from '@ionic/angular';
import {Destinacija} from '../destinacija.model';
import {Subscription} from 'rxjs';
import {DestModalComponent} from '../dest-modal/dest-modal.component';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-kolekcija',
  templateUrl: './kolekcija.page.html',
  styleUrls: ['./kolekcija.page.scss'],
})
export class KolekcijaPage implements OnInit {

  destinacije: Destinacija[] = [];
  sacuvane: Destinacija[] = [];
  private destSub: Subscription;
  private destSub2: Subscription;
  user: string;

  constructor(private menuCtrl: MenuController,
              private modalCtrl: ModalController,
              private destService: DestinacijeService,
              private authService: AuthService) { }

  ngOnInit() {
    this.destSub = this.destService.destinacije.subscribe((destinacije) => {
      this.destinacije = destinacije;
    });
    this.destSub2 = this.destService.sacuvaneDestinacije.subscribe((destinacije) => {
      this.sacuvane = destinacije;
    });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.destService.savedDestinations().subscribe((destinacije2) => {});
    this.destService.getDestinations().subscribe((destinacije) => {});
  }

  openModal() {
    this.modalCtrl.create({
      component: DestModalComponent,
      componentProps: {naslov: 'Dodaj destinaciju'}
    }).then((modal) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      if (resultData.role === 'confirm') {
        console.log(resultData);

        this.destService
            .addDestination(resultData.data.DestinationData.naziv,
                            resultData.data.DestinationData.opis,
                            resultData.data.DestinationData.imageUrl,
                            resultData.data.DestinationData.tip)
            .subscribe(destinacije => {});
      }
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    if (this.destSub) {
      this.destSub.unsubscribe();
    }
    if (this.destSub2) {
      this.destSub2.unsubscribe();
    }
  }
}
