import Tag from "./Tag.model"

export default class Link {

    id:number
    name:string
    url:string
    imageUrl:string
    tags:Tag[]
    creationDate:Date

    constructor(id:number, name:string, url:string, imageUrl:string, tags:Tag[], creationDate:Date = new Date()) { 
        this.id = id;
        this.name = name;
        this.url = url;
        this.imageUrl = imageUrl;
        this.tags = tags;
        this.creationDate = creationDate;
    }

}