export default class Utils {
  static checkUrl(uri: string) {
    let domain: string;
    let path: string[];

    let [url, ...parameters] = uri.split('?').filter(str => str !== '');

    if (url.startsWith('http')) {
      let pathStart: number = url.indexOf('/', 8);
      domain = url.substring(0, pathStart);
      path = url.substring(pathStart).split('/').filter(str => str !== '');
    }
    else {
      domain = window.location.origin;
      path = url.split('/').filter(str => str !== '');
    }

    return domain + (path.length? '/' + path.join('/') : '') + (parameters.length? '?' + parameters.join('?') : '');
  }
}
