export default function vw(value:number) {
    const witdh = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (value*witdh) / 100;
}