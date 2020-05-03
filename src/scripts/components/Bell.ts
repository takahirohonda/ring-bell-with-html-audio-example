import { BellImage } from '../assets/Bell-Image';
import { BellSound } from '../assets/Bell-Sound';
export class Bell {

  private readonly _host: HTMLElement;

  constructor(host: HTMLElement) {
    this._host = host;
  }

  render(): void {
    this._host.insertAdjacentHTML('beforeend',
    `<div class="ring-bell-wgt-img-container">${BellImage}</div>
    <audio id="ring-bell-wgt-audio" controls style="display:none">
      <source src="data:audio/mpeg;base64,${BellSound}" type="audio/mpeg">
    </audio>
    `);
  }

  ringBell(): void {
    const audioElem = this._host.querySelector('#ring-bell-wgt-audio') as HTMLAudioElement;
    audioElem.load();
    audioElem.play();
  }
}
