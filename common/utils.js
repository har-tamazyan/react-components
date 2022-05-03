
import toaster from 'src/web/ats/components/atoms/toaster';

export function copyToClipboard(textToCopy) {
  if (navigator) {
    navigator.clipboard.writeText(textToCopy);
  } else {
    const body = document.getElementsByTagName('body')[0];
    const tempInput = document.createElement('INPUT');
    body.appendChild(tempInput);
    tempInput.setAttribute('value', textToCopy);
    tempInput.select();
    document.execCommand('copy');
    body.removeChild(tempInput);
  }
  toaster({
    type: 'success',
    msg: 'Copied to clipboard!',
    autoClose: 2000,
  });
}
