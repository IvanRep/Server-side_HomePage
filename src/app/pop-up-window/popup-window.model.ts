import { LinkService } from "../link/link.service";

export class PopUpWindow {

    options:any = {
        isTitle: true,
        isBody: true,
        isCancelButton: true,
        isOptions: false,
        title: '',
        body: [],
        options: [],
        confirmMethod: () => {},
        cancelMethod: () => {},
        confirmButtonText: 'Confirmar',
        confirmButtonBackground: '--dark-color',
        confirmButtonColor: '--main-color',
        cancelButtonText: 'Cancelar',
        
        width: [''],
        height: [''],
    }

    bodySaved = document.createElement('div');
    
    constructor(options:any) {
        this.options.isTitle = options.isTitle ?? true;
        this.options.isBody = options.isBody ?? true;
        this.options.isCancelButton = options.isCancelButton ?? true;
        this.options.isOptions = options.isOptions || false;
        this.options.title = options.title || '';
        this.options.body = options.body || [''];
        this.options.options = options.options || [];
        this.options.confirmMethod = options.confirmMethod || this.options.confirmMethod;
        this.options.cancelMethod = options.cancelMethod || this.options.cancelMethod;
        this.options.confirmButtonText = options.confirmButtonText || 'Confirmar';
        this.options.confirmButtonBackground = options.confirmButtonBackground || '--dark-color';
        this.options.confirmButtonColor = options.confirmButtonColor || '--main-color';
        this.options.cancelButtonText = options.cancelButtonText || 'Cancelar';
        this.options.width = options.width || ['20vw'];
        this.options.height = options.height || ['40vh'];
        
    }

    printWindow(top:any = undefined,left:any = undefined) {

        const html = 
        `
        <div class="pop-up">
            `+(this.options.isTitle?`<div class="title">`+this.options.title+`</div>`:``)+`
            `+(this.options.isBody?`<div class="body">`+this.options.body[0]+`</div>`:``)+`
            <button type="submit">`+this.options.confirmButtonText+`</button>
            `+(this.options.isCancelButton?`<button>`+this.options.cancelButtonText+`</button>`:``)+`
        </div>
        `;

        const popup = document.createElement('div');
        popup.classList.add('pop-up-container');
        popup.innerHTML = html;
        document.body.insertBefore(popup,null);

        if (this.options.body[0] == '' && this.options.isBody) this.newLinkBody();

        const alert = (<HTMLDivElement>document.querySelector('.pop-up'));
        alert.style.width = this.options.width[0];
        alert.style.height = this.options.height[0];
        const confirmButton = (<HTMLButtonElement>document.querySelector('.pop-up>button:first-of-type'));
        confirmButton.style.backgroundColor = 'var('+this.options.confirmButtonBackground+')';
        confirmButton.style.color = 'var('+this.options.confirmButtonColor+')';

        // this.setLabels(alert); //Si el body tiene inputs coloco con javascript sus label

        if (this.options.isOptions) {
            this.printOptions(alert);
        }

        if (top != undefined && left != undefined) {
            alert.style.margin = '0';
            
            alert.style.top = top;
            alert.style.left = left;
        }

        document.addEventListener("keydown", (event) => {this.keyListener(event)});
        popup.addEventListener("click", () => {this.cancel()}, false);
        (<HTMLDivElement>document.querySelector('div.pop-up'))
        .addEventListener("click", (event) => {event.stopPropagation()}, false);
        //onclick de los botones
        (<HTMLButtonElement>document.querySelector('div.pop-up>button:first-of-type'))
        .addEventListener("click", () => {this.options.confirmMethod(); this.cancel()}, false);

        if (this.options.isCancelButton) {
            (<HTMLButtonElement>document.querySelector('div.pop-up>button:last-of-type'))
            .addEventListener("click", () => {this.options.cancelMethod(); this.cancel()}, false);
        }
    }

    newLinkBody() {
        // <input type="text" id="name" name="name" placeholder=" " autocomplete="n"/>
        // <label for="name">Nombre</label>
        // <input type="text" id="url" name="url" placeholder=" " autocomplete="n"/>
        // <label for="url">URL</label>
        // <input type="text" id="img" name="img" placeholder=" " autocomplete="n"/>
        // <label for="img">IMAGEN</label>`
        const newLinkBody = document.createElement('div');
        newLinkBody.classList.add('newLinkBody');
        const inputName = document.createElement('input');
        inputName.type = 'text';
        inputName.id = 'name';
        inputName.placeholder = ' ';
        inputName.autocomplete='n';
        inputName.name='name';
        const labelName = document.createElement('label');
        labelName.setAttribute('for','name');
        labelName.appendChild(document.createTextNode('Nombre'));
        const inputURL = document.createElement('input');
        inputURL.type = 'text';
        inputURL.id = 'url';
        inputURL.placeholder = ' ';
        inputURL.autocomplete='n';
        inputURL.name='url';
        const labelURL = document.createElement('label');
        labelURL.setAttribute('for','url');
        labelURL.appendChild(document.createTextNode('URL'))
        const img = document.createElement('img');
        img.id = 'newLinkImg';
        const inputIMG = document.createElement('input');
        inputIMG.id = 'img';
        inputIMG.type = 'text';
        inputIMG.name = 'img';
        inputIMG.placeholder = ' ';
        inputIMG.autocomplete='n';
        const labelIMG = document.createElement('label');
        labelIMG.setAttribute('for','img');
        labelIMG.appendChild(document.createTextNode('Imagen'))

        inputURL.addEventListener('input',() => {this.setNewLinkImage(inputURL,inputIMG,img)});
        inputIMG.addEventListener('input', () => {img.src = inputIMG.value});
        // img.addEventListener('error',(event) => {
        //     event.preventDefault();
        //     event.stopImmediatePropagation();
        //     if (inputIMG.value == '') img.src = 'https://www.google.com/s2/favicons?domain='+inputURL.value;
        //     return '';
        // });
        img.addEventListener('click', () => {
            if (inputName.classList.contains('hide')) {
                inputName.classList.remove('hide');
                inputURL.classList.remove('hide');
                inputIMG.classList.remove('show');
            } else {
                inputName.classList.add('hide');
                inputURL.classList.add('hide');
                inputIMG.classList.add('show');
            }
            
        });
           

        newLinkBody.appendChild(inputName);
        newLinkBody.appendChild(labelName);
        newLinkBody.appendChild(inputURL);
        newLinkBody.appendChild(labelURL);
        newLinkBody.appendChild(img);
        newLinkBody.appendChild(inputIMG);
        newLinkBody.appendChild(labelIMG);

        const alertBody = (<HTMLDivElement>document.querySelector('.pop-up .body'));
        alertBody.appendChild(newLinkBody);
        this.bodySaved = newLinkBody;

    }

    setNewLinkImage(input:HTMLInputElement,inputIMG:HTMLInputElement, img:HTMLImageElement) {
            let textUrl:string;
            !input.value.trim().startsWith('http://') && !input.value.trim().startsWith('https://') ? textUrl = 'http://'+input.value.trim() : textUrl = input.value.trim();
            
            this.getImage(textUrl+'/favicon.ico').then( (url) => {
                img.src = <string>url;
                inputIMG.value = <string>url;
            }).catch( (url) => {
                console.log(url)
                this.getImage('https://www.google.com/s2/favicons?domain='+input.value).then( (url) => {

                    img.src = <string>url;
                    inputIMG.value = <string>url;
                }).catch( (url) => {
                    img.src = '../assets/enlace.svg';
                });
            })
    }
    getImage(url:string) {
        return new Promise(function(resolve, reject){
            const img = new Image();
            img.addEventListener('load', () => {resolve(url)});

            img.addEventListener('error', () => {reject(url)});
            
            img.src = url;
        })
    }

    printOptions(div:HTMLDivElement) {

        let options = document.createElement('div');
        options.classList.add('alert-options');
        options.setAttribute('option','0');
        for (let [index,option] of this.options.options.entries()) {
            const button = document.createElement('button');
            const name = document.createTextNode(option);
            button.appendChild(name);
            if (index == 0) button.classList.add('selected-option');
            button.addEventListener('click', () => {
                const selected = document.getElementsByClassName('selected-option');
                selected[0].classList.remove('selected-option');
                button.classList.add('selected-option');
                options.setAttribute('option',index.toString());
                const body = (<HTMLDivElement>div.querySelector('div.body'));
                body.innerHTML = ''
                this.options.body[index] == '' ? body.insertBefore(this.bodySaved,null):body.innerHTML = this.options.body[index];
                div.style.width = this.options.width[index];
                div.style.height = this.options.height[index];
            })
            
            options.appendChild(button);
        }

        div.insertAdjacentElement('afterbegin',options);
    }

    cancel() {
        const popup = (<HTMLDivElement>document.querySelector('div.pop-up-container')); 
        document.removeEventListener("keydown", (event) => {this.keyListener(event)});
        popup.parentNode?.removeChild(popup);
    }

    keyListener(event:KeyboardEvent) {
        //Si se pulsa Esc se cierra el pop up
        if (event.key == 'Escape') this.cancel();

    }

}