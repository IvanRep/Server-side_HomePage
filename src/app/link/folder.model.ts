import { Link } from "./link.model";
import { Target } from "./target.model";

export class Folder extends Target{

    private links:Link[] = [];

    constructor(type:string = '', number_link:number = -1, folder:number = 0, name:string = '', links:Link[] = [], user_id:number = 0, id:number = -2, isSaved:boolean = false) {
        super(type,number_link,folder,name,user_id,id,isSaved);
        this.links = links;
    }

    addLink(link:Link,position:number = this.links.length) {
        this.links.splice(position,0,link);
    }

    removeLink(position:number):Link {
        return this.links.splice(position,1)[0];
    }

    getLinks() {
        return this.links;
    }

    setLinks(links:Link[]) {
        this.links = links;
    }
}