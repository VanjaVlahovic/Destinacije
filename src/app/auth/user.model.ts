export class User {
    constructor(public id: string,
                public email: string,
                public  name: string,
                public surname: string,
                private _token: string,
                private tokenExpirationDate: Date,
                public displayName: string,
                public photoUrl: string) {
    }

    get token() {
        if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
            return null;
        }
        return this._token;
    }
}
