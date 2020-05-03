import * as components from './components';
import { DomHelpers } from './helpers/DomHelpers';

interface IBellWidgetNamespace {
  components: typeof components;
}

// Expose the namespace on mdhbell namespace
export {
  components
};

declare global {
  // global namespace containing all mdhbell publi APIs
  // the namespace is created by Rollup
  const mdhbell: IBellWidgetNamespace;
}

window.addEventListener('DOMContentLoaded', () => {
  // Setting the height for bell container
  DomHelpers.setHeightForBellContainer();

  window.addEventListener('resize', () => {
    DomHelpers.setHeightForBellContainer();
  });

  // get the host
  const host = document.querySelector('#ring-bell-wgt') as HTMLElement;

  const style = new components.Style(host);
  const bell = new components.Bell(host);
  style.render();
  bell.render();

  // Adding event listeners
  const bellContainer = host.querySelector('.ring-bell-wgt-img-container') as HTMLElement;
  bellContainer.addEventListener('click', () => {
    DomHelpers.addClass(bellContainer, 'ring-bell-wgt-disable');
    bell.ringBell();
    DomHelpers.addAnimate(bellContainer, 'ring-bell-wgt-swing', 'ring-bell-wgt-animated');
    setTimeout(() => {
      DomHelpers.removeClass(bellContainer, 'ring-bell-wgt-disable');
      DomHelpers.removeAnimate(bellContainer, 'ring-bell-wgt-swing', 'ring-bell-wgt-animated');
    }, 2100);
  });
});
