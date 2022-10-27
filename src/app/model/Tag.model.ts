export default class Tag {

    id:number
    name:string
    selectedByDefault:boolean
    selected:boolean
    editable:boolean
    creationDate:Date


    constructor(id:number, name:string,selectedByDefault:boolean = false, selected:boolean = false,editable:boolean = false, creationDate:Date = new Date()) {
        this.id = id;
        this.name = name;
        this.selectedByDefault = selectedByDefault;
        this.selected = selected;
        this.editable = editable;
        this.creationDate = creationDate;
    }

}