export class Destinacija {
    constructor(
        public id: string,
        public naziv: string,
        public opis: string,
        public imageUrl: string,
        public tip: string,
        public ocena: string,
        public userId: string,
        public sacuvanaId: string,
        public korisnik: string) {
    }
}
