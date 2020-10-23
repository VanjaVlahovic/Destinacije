import { Component, OnInit } from '@angular/core';
import {User} from '../../auth/user.model';
import {AuthService} from '../../auth/auth.service';
import {ModalController} from '@ionic/angular';
import {EditProfileModalComponent} from './edit-profile-modal/edit-profile-modal.component';

@Component({
  selector: 'app-moj-profil',
  templateUrl: './moj-profil.page.html',
  styleUrls: ['./moj-profil.page.scss'],
})
export class MojProfilPage implements OnInit {
  user: User;

  constructor(private authService: AuthService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }

  openModal() {
    this.modalCtrl.create({
      component: EditProfileModalComponent,
      componentProps: {
        ime: this.user.displayName,
        email: this.user.email,
        photoUrl: this.user.photoUrl
      }
    }).then((modal) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      if (resultData.role === 'confirm') {
        console.log(resultData);
        this.user.displayName = resultData.data.UserData.displayName;
        this.user.photoUrl = resultData.data.UserData.photoUrl;
        let token;
        this.authService.token.subscribe((res) => {
          token = res;
        });
        this.authService.updateUser2(this.user, token).subscribe(res => {});
        console.log(this.user);
      }
    });
  }
}
