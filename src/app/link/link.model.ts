import { Target } from "./target.model";

export class Link extends Target {
    
    private url:string;
    private visible_url:string;

    constructor(type:string = '', number_link:number = -1, url:string = '', visible_url:string = '', folder:number = 0, name:string = '', user_id:number = 0, id:number = -2, isSaved:boolean = false) {
        super(type,number_link,folder,name,user_id,id,isSaved);
        this.url = url;
        this.visible_url = visible_url;
    }

    setUrl(url:string):void {
        this.url = url;
    } 
    getUrl():string {
        return this.url;
    }
    setVisibleUrl(visible_url:string):void {
        this.visible_url = visible_url;
    }
    getVisibleUrl():string {
        return this.visible_url;
    }

}