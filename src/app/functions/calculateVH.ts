export default function vh(value:number) {
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0 );
    return (value*height) / 100;
}

