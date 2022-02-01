export class User {

    private id:number;
    private name:string;
    private password:string;

    constructor(name:string = 'Usuario', password:string = 'default', id:number = 0) {
        this.id = id;
        this.name = name;
        this.password = password;
    }
    getId():number {
        return this.id;
    }
    setId(id:number) {
        this.id = id;
    }
    getName():string {
        return this.name;
    }
    setName(name:string):void {
        this.name = name;
    }
    getPassword():string {
        return this.password;
    }
    setPassword(password:string):void {
        this.password = password;
    }
    
}