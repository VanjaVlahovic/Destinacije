import { Component, OnInit } from '@angular/core';
import {Destinacija} from '../destinacija.model';
import {Subscription} from 'rxjs';
import {MenuController, ModalController} from '@ionic/angular';
import {DestinacijeService} from '../destinacije.service';
import {FilterModalComponent} from '../filter-modal/filter-modal.component';

@Component({
  selector: 'app-sacuvano',
  templateUrl: './sacuvano.page.html',
  styleUrls: ['./sacuvano.page.scss'],
})
export class SacuvanoPage implements OnInit {

  sacuvane: Destinacija[] = [];
  private destSub: Subscription;

  constructor(private menuCtrl: MenuController,
              private modalCtrl: ModalController,
              private destService: DestinacijeService) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.destSub = this.destService.sacuvaneDestinacije.subscribe((destinacije) => {
      this.sacuvane = destinacije;
    });
    console.log(this.sacuvane);
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.destService.savedDestinations().subscribe((destinacije) => {
      this.sacuvane = destinacije;
    });
  }

  openModal() {
    this.modalCtrl.create({
      component: FilterModalComponent
    }).then((modal) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      if (resultData.role === 'confirm') {
        this.destSub = this.destService.sacuvaneDestinacije.subscribe((destinacije) => {
          this.sacuvane = destinacije;
          console.log(this.sacuvane);
        });
        this.filtriranje(resultData.data);
      }
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    if (this.destSub) {
      this.destSub.unsubscribe();
    }
  }


  private filtriranje(filteri: any) {

    let f: any;
    for (const i of Object.keys(filteri)) {
      f = filteri[i];
    }
    console.log(f);
    if (f.length > 0) {
      let filtrirane: Destinacija[] = [];
      for (const fil of f) {
        filtrirane = filtrirane.concat(this.sacuvane.filter((d) => d.tip === fil));
      }
      this.sacuvane = filtrirane;
    }
  }
}
