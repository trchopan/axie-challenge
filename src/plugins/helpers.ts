import {isEmpty} from 'lodash';
import {Plugin} from 'vue';

const helpers = {
  isEmpty,
  copyToClipboard(data: string) {
    const tempInput = document.createElement('input');
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(tempInput);
    tempInput.setAttribute('value', data);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    body.removeChild(tempInput);
  },
  thousandComma(s: string | number) {
    return String(s).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  formatAmount(p: number, precisionLen: number = 5) {
    const str = p.toString();
    const [whole, decimal] = str.split('.');
    if (!decimal || whole.length >= precisionLen)
      return this.thousandComma(whole);
    if (whole === '0') {
      let startDecimalCount = false;
      let decimalCount = 0;
      let decimalSliceIndex = 0;
      for (const c of decimal) {
        decimalSliceIndex++;
        if (c !== '0') startDecimalCount = true;
        if (startDecimalCount) decimalCount++;
        if (decimalCount >= precisionLen) break;
      }
      return `0.${decimal.slice(0, decimalSliceIndex)}`;
    }
    const decimalLen = precisionLen - whole.length;
    return `${this.thousandComma(whole)}.${decimal.slice(0, decimalLen)}`;
  },
};

const plugin: Plugin = {
  install: (app, options) => {
    app.config.globalProperties.$h = helpers;
  },
};

export default plugin;
