import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import SearchEngine from 'src/app/model/SearchEngine.model';

@Component({
  selector: 'app-engine-button',
  templateUrl: './engine-button.component.html',
  styleUrls: ['./engine-button.component.css']
})
export class EngineButtonComponent implements OnInit {

  @Output() engineEmitter:EventEmitter<SearchEngine> = new EventEmitter<SearchEngine>();

  @ViewChild('img1') img1!:ElementRef;
  @ViewChild('mainImg') mainImg!:ElementRef;
  @ViewChild('img2') img2!:ElementRef;


  engines:SearchEngine[] = [
    new SearchEngine('google','https://google.com/search','q','https://www.google.com/favicon.ico'),
    new SearchEngine('you','https://you.com/search','q','https://you.com/_next/image?url=%2Fimages%2Fydc-logo-lightdarkmode.svg&w=256&q=75'),
    new SearchEngine('youtube','https://www.youtube.com/results','search_query','https://cdn-icons-png.flaticon.com/512/1384/1384060.png')
  ]

  ghostEngine1:number = this.engines.length-1;
  selectedEngine:number = 0;
  ghostEngine2:number = this.selectedEngine+1 >= this.engines.length-1 ? 0 : this.selectedEngine+1;

  constructor() { }

  ngOnInit(): void {
  }

  changeEngine(event:WheelEvent) {
    if (event.deltaY < 0) {
      this.selectedEngine = this.selectedEngine >= this.engines.length-1 ? 0 : this.selectedEngine+1;
      this.ghostEngine1 = this.ghostEngine1 >= this.engines.length-1 ? 0 : this.ghostEngine1+1;
      this.ghostEngine2 = this.ghostEngine2 >= this.engines.length-1 ? 0 : this.ghostEngine2+1;
    }

    if (event.deltaY > 0) {
      this.selectedEngine = this.selectedEngine <= 0 ? this.engines.length-1 : this.selectedEngine-1;
      this.ghostEngine1 = this.ghostEngine1 <= 0 ? this.engines.length-1 : this.ghostEngine1-1;
      this.ghostEngine2 = this.ghostEngine2 <= 0 ? this.engines.length-1 : this.ghostEngine2-1;
    }

    this.engineEmitter.emit(this.engines[this.selectedEngine]);
  }

  onHover() {
    const img1 = (<HTMLImageElement>this.img1.nativeElement);
    const img2 = (<HTMLImageElement>this.img2.nativeElement);
    const mainImg = (<HTMLImageElement>this.mainImg.nativeElement);

    
    img1.style.position = 'absolute';
    img1.style.height = mainImg.offsetHeight + 'px';
    img1.style.width = mainImg.offsetWidth + 'px';
    img1.style.left = mainImg.offsetLeft + 'px';
    img1.style.top = mainImg.offsetTop - (mainImg.offsetHeight + (mainImg.offsetHeight/4)) + 'px';
    img1.style.display = 'block';

    img2.style.position = 'absolute';
    img2.style.height = mainImg.offsetHeight + 'px';
    img2.style.width = mainImg.offsetWidth + 'px';
    img2.style.left = mainImg.offsetLeft + 'px';
    img2.style.top = mainImg.offsetTop + (mainImg.offsetHeight + (mainImg.offsetHeight/4)) + 'px';
    img2.style.display = 'block';
    
    // if (ul.clientWidth + ul.offsetLeft > window.innerWidth) {
    //   ul.style.left = (window.innerWidth - (ul.clientWidth + 10)) + 'px';
    //  }

  }

  onBlur() {
    const img1 = (<HTMLImageElement>this.img1.nativeElement);
    const img2 = (<HTMLImageElement>this.img2.nativeElement);
    const mainImg = (<HTMLImageElement>this.mainImg.nativeElement);

    img1.style.display = 'none';
    img2.style.display = 'none';
  }

  cancelClick(event:MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  dragStart(event:DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    return false;
  }

}
