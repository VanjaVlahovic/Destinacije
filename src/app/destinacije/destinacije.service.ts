import { Injectable } from '@angular/core';
import {Destinacija} from './destinacija.model';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';

interface DestinationData {
  naziv: string;
  opis: string;
  imageUrl: string;
  tip: string;
  userId: string;
}

interface SavedDestination{
    destination: Destinacija;
    fetchedUserId: string;
    ocena: string;
}

@Injectable({
  providedIn: 'root'
})
export class DestinacijeService {

    private _destinacije = new BehaviorSubject<Destinacija[]>([]);
    private _sacuvaneDestinacije = new BehaviorSubject<Destinacija[]>([]);

    constructor(private http: HttpClient, private authService: AuthService) {
    }

    get destinacije() {
        return this._destinacije.asObservable();
    }

    get sacuvaneDestinacije() {
        return this._sacuvaneDestinacije.asObservable();
    }

    getDestinations() {
        return this.authService.token.pipe(
            take(1),
            switchMap((token) => {
                return this.http
                    .get<{ [key: string]: DestinationData }>(
                        `https://putovanja-2d53a.firebaseio.com/destinations.json?auth=${token}`
                    );
            }),
            map((destinationData) => {
                console.log(destinationData);
                const destinations: Destinacija[] = [];
                for (const key in destinationData) {
                    if (destinationData.hasOwnProperty(key)) {
                        destinations.push(
                            new Destinacija(
                                key,
                                destinationData[key].naziv,
                                destinationData[key].opis,
                                destinationData[key].imageUrl,
                                destinationData[key].tip,
                                null,
                                destinationData[key].userId,
                                null,
                                null
                            ));
                    }
                }
                return destinations;
            }),
            tap(destinations => {
                this._destinacije.next(destinations);
            })
        );
    }

    getDestination(id: string) {
        return this.authService.token.pipe(
            take(1),
            switchMap((token) => {
                return this.http
                    .get<DestinationData>(`https://putovanja-2d53a.firebaseio.com/destinations/${id}.json?auth=${token}`);
            }),
            map((resData) => {
                console.log(resData.naziv);
                return new Destinacija(
                    id,
                    resData.naziv,
                    resData.opis,
                    resData.imageUrl,
                    resData.tip,
                    null,
                    resData.userId,
                    null,
                    null
                );
            })
        );
    }

    addDestination(naziv: string, opis: string, imageUrl: string, tip: string) {
        let generatedId;
        let novaDestinacija: Destinacija;
        let fetchedUserId: string;

        return this.authService.userId.pipe(
            take(1),
            switchMap(userId => {
                fetchedUserId = userId;
                return this.authService.token;
            }),
            take(1),
            switchMap((token) => {
                novaDestinacija = new Destinacija(
                    null,
                    naziv,
                    opis,
                    imageUrl,
                    tip,
                    null,
                    fetchedUserId,
                    null,
                    null
                );

                return this.http
                    .post<{ name: string }>(
                        `https://putovanja-2d53a.firebaseio.com/destinations.json?auth=${token}`,
                        novaDestinacija
                    );
            }),
            switchMap((resData) => {
                generatedId = resData.name;
                return this.destinacije;
            }),
            take(1),
            tap((destinacije) => {
                novaDestinacija.id = generatedId;
                this._destinacije.next(
                    destinacije.concat(novaDestinacija)
                );
                console.log(this._destinacije);
            })
        );
    }

    deleteDestination(id: string) {
        return this.authService.token.pipe(
            take(1),
            switchMap((token) => {
                return this.http
                    .delete(`https://putovanja-2d53a.firebaseio.com/destinations/${id}.json?auth=${token}`);
            }),
            switchMap(() => {
                return this.destinacije;
            }),
            take(1),
            tap((destinacije) => {
                this._destinacije.next(destinacije.filter((d) => d.id !== id));
            })
        );
    }

    editDestination(id: string, naziv: string, opis: string, imageUrl: string, tip: string, userId: string) {

        return this.authService.token.pipe(
            take(1),
            switchMap((token) => {
                return this.http
                    .put(`https://putovanja-2d53a.firebaseio.com/destinations/${id}.json?auth=${token}`, {
                        naziv,
                        opis,
                        imageUrl,
                        tip,
                        ocena: null,
                        userId,
                        sacuvanaId: null,
                        korisnik: null
                    });
            }),
            switchMap(() => this.destinacije),
            take(1),
            tap((destinacije) => {
                const updatedDestinationIndex = destinacije.findIndex((d) => d.id === id);
                const updatedDestinations = [...destinacije];
                updatedDestinations[updatedDestinationIndex] = new Destinacija(
                    id,
                    naziv,
                    opis,
                    imageUrl,
                    tip,
                    null,
                    userId,
                    null,
                    null
                );
                this._destinacije.next(updatedDestinations);
            })
        );
    }

    saveDestination(destination: Destinacija) {
        let generatedId;
        let fetchedUserId: string;

        return this.authService.userId.pipe(
            take(1),
            switchMap(userId => {
                fetchedUserId = userId;
                return this.authService.token;
            }),
            take(1),
            switchMap((token) => {
                return this.http
                    .post<{ name: string }>(
                        `https://putovanja-2d53a.firebaseio.com/saved.json?auth=${token}`,
                        {
                            destination,
                            fetchedUserId,
                            ocena: 5
                        }
                    );
            }),
            switchMap((resData) => {
                generatedId = resData.name;
                return this.sacuvaneDestinacije;
            }),
            take(1),
            tap((destinacije) => {
                destination.sacuvanaId = generatedId;
                destination.korisnik = fetchedUserId;
                destination.ocena = '5';
                this._sacuvaneDestinacije.next(
                    destinacije.concat(destination)
                );
                console.log(this._sacuvaneDestinacije);
            })
        );
    }

    savedDestinations() {
        let fetchedUserId: string;

        return this.authService.userId.pipe(
            take(1),
            switchMap(userId => {
                fetchedUserId = userId;
                return this.authService.token;
            }),
            take(1),
            switchMap((token) => {
                return this.http
                    .get<{ [key: string]: SavedDestination }>(
                        `https://putovanja-2d53a.firebaseio.com/saved.json?&auth=${token}`,
                    );
            }),
            map((savedDestination) => {
                console.log(savedDestination);
                const saveddestinations: Destinacija[] = [];
                for (const key in savedDestination) {
                    if (savedDestination.hasOwnProperty(key) && savedDestination[key].fetchedUserId === fetchedUserId) {
                        saveddestinations.push(
                            new Destinacija(
                                savedDestination[key].destination.id,
                                savedDestination[key].destination.naziv,
                                savedDestination[key].destination.opis,
                                savedDestination[key].destination.imageUrl,
                                savedDestination[key].destination.tip,
                                savedDestination[key].ocena,
                                savedDestination[key].destination.userId,
                                key,
                                savedDestination[key].fetchedUserId
                            ));
                    }
                }
                return saveddestinations;
            }),
            tap(saveddestinations => {
                this._sacuvaneDestinacije.next(saveddestinations);
            })
        );
    }

    daLiJeSacuvana(id: string, userId: string) {
        let sacuvane: Destinacija[];
        this.sacuvaneDestinacije.subscribe(dest => {
            sacuvane = dest as Destinacija[];
        });
        console.log(sacuvane);
        if (sacuvane.length > 0) {
            for (const key in sacuvane) {
                if (sacuvane.hasOwnProperty(key)
                    && sacuvane[key].korisnik === userId
                    && sacuvane[key].id === id) {
                    return true;
                }
            }
        }
        return false;
    }

    unSaveDestination(id: string) {
        return this.authService.token.pipe(
            take(1),
            switchMap((token) => {
                return this.http
                    .delete(`https://putovanja-2d53a.firebaseio.com/saved/${id}.json?auth=${token}`);
            }),
            switchMap(() => {
                return this.sacuvaneDestinacije;
            }),
            take(1),
            tap((destinacije) => {
                this._sacuvaneDestinacije.next(destinacije.filter((d) => d.sacuvanaId !== id));
            })
        );
    }

    starDestination(destinacijaa: Destinacija, ocena: string) {
        return this.authService.token.pipe(
            take(1),
            switchMap((token) => {
                return this.http
                    .put(`https://putovanja-2d53a.firebaseio.com/saved/${destinacijaa.sacuvanaId}.json?auth=${token}`, {
                       destination: new Destinacija(
                           destinacijaa.id,
                           destinacijaa.naziv,
                           destinacijaa.opis,
                           destinacijaa.imageUrl,
                           destinacijaa.tip,
                           null,
                           destinacijaa.userId,
                           null,
                           null
                       ),
                        fetchedUserId: destinacijaa.korisnik,
                        ocena
                    });
            }),
            switchMap(() => this.sacuvaneDestinacije),
            take(1),
            tap((destinacije) => {
                const updatedDestinationIndex = destinacije.findIndex((d) => d.id === destinacijaa.id);
                const updatedDestinations = [...destinacije];
                updatedDestinations[updatedDestinationIndex] = new Destinacija(
                    destinacijaa.id,
                    destinacijaa.naziv,
                    destinacijaa.opis,
                    destinacijaa.imageUrl,
                    destinacijaa.tip,
                    ocena,
                    destinacijaa.userId,
                    destinacijaa.sacuvanaId,
                    destinacijaa.korisnik
                );
                this._sacuvaneDestinacije.next(updatedDestinations);
                console.log(this._sacuvaneDestinacije);
            })
        );
    }
}
