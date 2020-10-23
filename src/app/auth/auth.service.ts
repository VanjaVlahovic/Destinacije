import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.model';
import {BehaviorSubject} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    localId: string;
    expiresIn: string;
    name: string;
    surname: string;
    displayName: string;
    profilePicture: string;
    photoUrl: string;
}

export interface UserData {
    name?: string;
    surname?: string;
    email: string;
    password: string;
    displayName: string;
    photoUrl: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _isUserAuthenticated = false;
    private _user = new BehaviorSubject<User>(null);
    private _token;

    constructor(private http: HttpClient) {
    }

    get user(){
        return this._user.asObservable();
    }

    get isUserAuthenticated() {
        return this._user.asObservable().pipe(
            map((user) => {
                if (user) {
                    return !!user.token;
                } else {
                    return false;
                }
            })
        );
    }

    get userId() {
        return this._user.asObservable().pipe(
            map((user) => {
                if (user) {
                    return user.id;
                } else {
                    return null;
                }
            })
        );
    }

    get token() {
        return this._user.asObservable().pipe(
            map((user) => {
                if (user) {
                    this._token = user.token;
                    return user.token;
                } else {
                    return null;
                }
            })
        );
    }

    logIn(user: UserData) {
        this._isUserAuthenticated = true;
        return this.http.post<AuthResponseData>
        (`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firabaseApiKey}`,
            {
                email: user.email,
                password: user.password,
                returnSecureToken: true
            }).pipe(tap(userData => {
                console.log(userData);
                const expirationDate = new Date(new Date().getTime() + +userData.expiresIn * 1000);
                const newUser = new User(userData.localId,
                userData.email,
                userData.name,
                userData.surname,
                userData.idToken,
                expirationDate,
                userData.displayName,
                userData.profilePicture);
                this._user.next(newUser);
                console.log(newUser);
        }));
    }

    logOut() {
        this._user.next(null);
    }

    register(user: UserData) {
        this._isUserAuthenticated = true;
        return this.http.post<AuthResponseData>
        (`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firabaseApiKey}`, {
            email: user.email,
            password: user.password,
            name: user.name,
            surname: user.surname,
            returnSecureToken: true
        }).pipe(tap(userData => {
            const expirationDate = new Date(new Date().getTime() + +userData.expiresIn * 1000);
            const newUser = new User(userData.localId,
                userData.email,
                userData.name,
                userData.surname,
                userData.idToken,
                expirationDate,
                null,
                null);
            console.log(newUser);
            this._user.next(newUser);
        }));
    }
    updateUser(user: UserData, token: string){
        return this.http.post<AuthResponseData>
        (`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.firabaseApiKey}`, {
            idToken: token,
            displayName: user.name + ' ' + user.surname,
            photoUrl: 'https://portal.staralliance.com/imagelibrary/aux-pictures/prototype-images/avatar-default.png/@@images/image.png',
            deleteAttribute: null,
            returnSecureToken: true
        }).pipe(tap(userData2 => {
            console.log(userData2);
            const expirationDate = new Date(new Date().getTime() + +userData2.expiresIn * 1000);
            const newUser = new User(userData2.localId,
                userData2.email,
                userData2.name,
                userData2.surname,
                token,
                expirationDate,
                userData2.displayName,
                userData2.photoUrl);
            console.log(newUser);
            this._user.next(newUser);
        }));
    }

    updateUser2(user: User, token: string){
        return this.http.post<AuthResponseData>
        (`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.firabaseApiKey}`, {
            idToken: token,
            displayName: user.displayName,
            photoUrl: user.photoUrl,
            deleteAttribute: null,
            returnSecureToken: true
        }).pipe(tap(userData2 => {
            console.log(userData2);
            const expirationDate = new Date(new Date().getTime() + +userData2.expiresIn * 1000);
            const newUser = new User(userData2.localId,
                userData2.email,
                userData2.name,
                userData2.surname,
                token,
                expirationDate,
                userData2.displayName,
                userData2.photoUrl);
            console.log(newUser);
            this._user.next(newUser);
        }));
    }
}
