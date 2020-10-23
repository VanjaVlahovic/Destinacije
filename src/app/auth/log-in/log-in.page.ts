import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.page.html',
    styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

    constructor(private authService: AuthService, private router: Router, private alertCtrl: AlertController) { }

    ngOnInit() {
    }

    onLogIn(form: NgForm) {
        console.log(form);
        if (form.valid) {
            this.authService.logIn(form.value).subscribe((resData) => {
                    console.log('Prijava uspesna');
                    console.log(resData.displayName);
                    this.router.navigateByUrl('/destinacije');
                },
                errRes => {
                    console.log(errRes);
                    const message = 'Netačan email ili šifra';
                    this.alertCtrl.create(
                        {
                            header: 'Nauspešna autentifikacija',
                            message,
                            buttons: ['OK']
                        }
                    ).then((alert) => {
                        alert.present();
                    });

                    form.reset();
                });
        }
    }
}
