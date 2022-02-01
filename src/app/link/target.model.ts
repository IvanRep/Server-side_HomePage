export class Target {

    private id:number;
    private name:string;
    private user_id:number;
    private type:string;
    private number_link:number;
    private folder:number;
    private isSaved:boolean; //Usado para saber si el link ha sido guardado en la base de datos

    constructor(type:string = '', number_link:number = -1, folder:number = 0, name:string = '', user_id:number = 0, id:number = -2, isSaved:boolean = false) {
        this.id = id;
        this.name = name;
        this.user_id = user_id;
        this.type = type;
        this.number_link = number_link;
        this.folder = folder;
        this.isSaved = isSaved;
    }

    setId(id:number):void {
        this.id = id;
    }
    getId():number {
        return this.id;
    }
    setName(name:string):void {
        this.name = name;
    }
    getName():string {
        return this.name;
    }
    getUserId():number {
        return this.user_id;
    }
    setUserId(user_id:number):void {
        this.user_id = user_id;
    }
    setType(type:string):void {
        this.type = type;
    }
    getType():string {
        return this.type;
    }
    setNumberLink(number_link:number):void {
        this.number_link = number_link;
    }
    getNumberLink():number {
        return this.number_link;
    }
    setFolder(folder:number):void {
        this.folder = folder;
    }
    getFolder():number {
        return this.folder;
    }
    setIsSaved(isSaved:boolean) {
        this.isSaved = isSaved;
    }
    getIsSaved():boolean {
        return this.isSaved;
    }

}