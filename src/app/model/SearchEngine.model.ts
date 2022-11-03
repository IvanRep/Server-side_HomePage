export default class SearchEngine {

    name:string;
    url:string;
    searchParameter:string;
    image:string;

    constructor(name:string, url:string, searchParameter:string, image:string) {
        this.name = name;
        this.url = url;
        this.searchParameter = searchParameter;
        this.image = image;
    }


}