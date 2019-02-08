export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public roll?: string,
        public google?: Boolean,
        public _id?: string
    ) { }

}
