import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
})
export class EditProfileModalComponent implements OnInit {
  @ViewChild('f', {static: true}) form: NgForm;
  @Input() ime: string;
  @Input() email: string;
  @Input() photoUrl: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  editProfile() {
    if (!this.form.valid) {
      return;
    }

    this.modalCtrl.dismiss({
      UserData:
          {
            displayName: this.form.value.ime,
            email: this.form.value.email,
            photoUrl: this.form.value.photoUrl,
          }
    }, 'confirm');
  }

  avatar(event) {
    this.form.value.photoUrl = event.target.value;
  }
}
