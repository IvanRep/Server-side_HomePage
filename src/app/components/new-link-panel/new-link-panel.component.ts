import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Link from 'src/app/model/Link.model';
import Tag from 'src/app/model/Tag.model';
import { LinksServiceService } from 'src/app/services/links-service/links-service.service';

@Component({
  selector: 'app-new-link-panel',
  templateUrl: './new-link-panel.component.html',
  styleUrls: ['./new-link-panel.component.css']
})
export class NewLinkPanelComponent implements OnInit, AfterViewInit {

  linkColor = getComputedStyle(document.documentElement).getPropertyValue('--main-background-color');
  crossColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-background-color');
  submitButtonText = 'Crear Link';

  @ViewChild("imageInput") imageInput!:ElementRef;
  @ViewChild("urlInput") urlInput!:ElementRef;

  @ViewChild("mainImg") mainImgDiv!:ElementRef;

  @ViewChild("img1") imgDiv1!:ElementRef;
  @ViewChild("img2") imgDiv2!:ElementRef;
  @ViewChild("img3") imgDiv3!:ElementRef;
  @ViewChild("img4") imgDiv4!:ElementRef;


  @Output() exitPanelEmitter:EventEmitter<string> = new EventEmitter<string>();
  @Input() link:Link = new Link(0,'','','',[]);
  @Input() edit:boolean = false;
  savedLinkTags:Tag[] = [];

  newLinkForm:FormGroup = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(private linksService:LinksServiceService) { }

  ngOnInit(): void {
    this.linksService.selectedNewLinkTags.length = 0;
    this.link.tags.forEach( (tag:Tag) => {tag.selected = true; this.linksService.selectedNewLinkTags.push(tag)})
    this.savedLinkTags = this.link.tags.slice();
    this.link.tags = this.linksService.selectedNewLinkTags;

    this.newLinkForm = new FormGroup({
      name: new FormControl(this.link.name),
      url: new FormControl(this.link.url),
      image: new FormControl(this.link.imageUrl),
    });

    this.submitButtonText = this.edit ? 'Editar Link' : 'Crear Link';

  }

  ngAfterViewInit(): void {
    this.getLinkImages();
    this.getMainImagePreview();
  }

  getLinkImages() {
    let url = (<HTMLInputElement> this.urlInput.nativeElement).value.trim();
    const imgDiv1 = (<HTMLDivElement>this.imgDiv1.nativeElement)
    const imgDiv2 = (<HTMLDivElement>this.imgDiv2.nativeElement)
    const imgDiv3 = (<HTMLDivElement>this.imgDiv3.nativeElement)

    imgDiv1.innerHTML = '';
    imgDiv2.innerHTML = '';
    imgDiv3.innerHTML = '';

    if (url.length === 0) return;

    url.startsWith('http://') || url.startsWith('https://') || url.startsWith('ftp://')
    ? url = url
    : url = 'https://'+url;

    //Image 1
    const img1 = document.createElement('img');
    img1.src = url+'/favicon.ico';
    imgDiv1.title = url+'/favicon.ico';
    img1.style.height = '100%';
    img1.style.width = '100%';
    img1.onerror = (event) => { imgDiv1.removeChild(img1); return false;};
    imgDiv1.appendChild(img1);

    //Image 2
    const img2 = document.createElement('img');
    console.log('http://'+url.split('/')[2]);
    img2.src = 'https://'+url.split('/')[2]+'/favicon.ico';
    imgDiv2.title = 'https://'+url.split('/')[2]+'/favicon.ico';
    img2.style.height = '100%';
    img2.style.width = '100%';
    img2.onerror = (event) => { imgDiv2.removeChild(img2); return false;};
    imgDiv2.appendChild(img2);

    //Image 3
    const img3 = document.createElement('img');
    img3.src = 'https://www.google.com/s2/favicons?domain='+url;
    imgDiv3.title = 'https://www.google.com/s2/favicons?domain='+url;
    img3.style.height = '100%';
    img3.style.width = '100%';
    img3.onerror = (event) => { imgDiv3.removeChild(img3); return false;};
    imgDiv3.appendChild(img3);

  }

  getMainImagePreview() {
    let url = (<HTMLInputElement> this.imageInput.nativeElement).value.trim();
    let mainImg = (<HTMLDivElement>this.mainImgDiv.nativeElement);
    mainImg.innerHTML = '';
    mainImg.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--main-background-color');

    if (url.length === 0) return;

    url.startsWith('http://') || url.startsWith('https://') || url.startsWith('ftp://') || url.startsWith('#')
    ? url = url
    : url = 'http://'+url;
    
    if (url.startsWith('#')) {
      if (url.length > 7 || (url.length>1 && !(url.charAt(url.length-1).match(/[0-9abcdefABCDEF]/)))) {
        (<HTMLInputElement> this.imageInput.nativeElement).value = url.substring(0, url.length-1);
      }
      mainImg.style.backgroundColor = url;
    } else {
      const img = document.createElement('img');
      img.src = url;
      img.style.height = '100%';
      img.style.width = '100%';
      img.onerror = (event) => { mainImg.removeChild(img); return false;};
      mainImg.appendChild(img);
    }

    return true;

  }

  setMainImg(url:string) {
    (<HTMLInputElement> this.imageInput.nativeElement).value = url.trim();
    (<HTMLInputElement> this.imageInput.nativeElement).dispatchEvent(new Event('input', {bubbles:true}));
  }

  removeTag(tag:Tag) {
    const index = this.link.tags.indexOf(tag);
    if (index !== -1) {
      tag.selected = false;
      this.link.tags.splice(index,1);
    }
  }

  onSubmit() {
    let previousLink = this.link;
    this.link.name = this.newLinkForm.value.name;
    this.link.url = this.newLinkForm.value.url;
    this.link.imageUrl = this.newLinkForm.value.image;
    this.link.tags = this.link.tags.slice();

    if (this.checkIfLinkExists(this.link, previousLink)) {
      alert("Ese link ya existe");
      return;
    }

    if (!this.edit) {
      this.linksService.links.push(this.link);
      // ADD LINK API !!!!!!!!!!

    } else {

      //UPDATE LINK API !!!!!!!!!!
    }

    this.linksService.saveLocalLinks() // SAVE LINKS lOCAL
    
    this.exitPanelEmitter.emit('links');
  }

  checkIfLinkExists(link:Link, previousLink:Link) {
    for (let value of this.linksService.links) {
      if (!(value.name === previousLink.name && value.url === previousLink.url) 
      && (link.name === value.name || link.url === value.url))
        return true;
    }
    return false;
  }

  cancel() {
    this.link.tags = this.savedLinkTags.slice();
    this.exitPanelEmitter.emit('links');
  }

}
