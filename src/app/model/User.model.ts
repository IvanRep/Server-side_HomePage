export default class User {

    name:string;
    password:string;

    constructor(name:string = 'local', password:string = '') {
        this.name = name;
        this.password = password;
    }
}