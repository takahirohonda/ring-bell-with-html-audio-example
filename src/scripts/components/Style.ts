export class Style {

  private readonly _host: HTMLElement;

  constructor(host: HTMLElement) {
    this._host = host;
  }

  render(): void {
    this._host.insertAdjacentHTML('afterbegin', this.getStyle());
  }

  private getStyle(): string {

    return `<style>
      #ring-bell-wgt {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .ring-bell-wgt-img-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .ring-bell-wgt-img-container > svg {
        width: 200px;
        height: 200px;
      }
      @keyframes swing {
        10% {
          transform: rotate3d(0, 0, 1, 15deg);
        }

        20% {
          transform: rotate3d(0, 0, 1, -10deg);
        }

        30% {
          transform: rotate3d(0, 0, 1, 8deg);
        }

        40% {
          transform: rotate3d(0, 0, 1, -8deg);
        }

        50% {
          transform: rotate3d(0, 0, 1, 6deg);
        }

        60% {
          transform: rotate3d(0, 0, 1, -6deg);
        }

        70% {
          transform: rotate3d(0, 0, 1, 5deg);
        }

        80% {
          transform: rotate3d(0, 0, 1, -5deg);
        }
        to {
          transform: rotate3d(0, 0, 1, 0deg);
        }
      }

      .ring-bell-wgt-swing {
        transform-origin: top center;
        animation-name: swing;
      }
      .ring-bell-wgt-animated {
        animation-duration: 2s;
        animation-fill-mode: both;
      }
      .ring-bell-wgt-disable {
        pointer-events: none;
      }
    </style>`;
  }
}
