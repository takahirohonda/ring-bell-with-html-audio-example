export class DomHelpers {

  static setHeightForBellContainer(): void {
    const bellContainer = document.body.querySelector('.ring-bell-wgt-main-container') as HTMLElement;
    bellContainer.style.height = window.innerHeight + 'px';
  }

  static toggleClass(element: HTMLElement, className: string): void {
    const hasActive = element.classList.contains(className);
    if (hasActive) {
      element.classList.remove(className);
    } else if (!hasActive) {
      element.classList.add(className);
    }
  }

  static toggleAnimate(element: HTMLElement, animationName: string, animateClass: string): void {
    DomHelpers.toggleClass(element, animationName);
    DomHelpers.toggleClass(element, animateClass);
  }

  static addAnimate(element: HTMLElement, animationName: string, animateClass: string): void {
    this.addClass(element, animationName);
    this.addClass(element, animateClass);
  }

  static removeAnimate(element: HTMLElement, animationName: string, animateClass: string): void {
    this.removeClass(element, animationName);
    this.removeClass(element, animateClass);
  }

  static addClass(element: HTMLElement, className: string): void {
    if (!this.hasClass(element, className)) {
      element.classList.add(className);
    }
  }

  static removeClass(element: HTMLElement, className: string): void {
    if (this.hasClass(element, className)) {
      element.classList.remove(className);
    }
  }

  static hasClass(element: HTMLElement, className: string): boolean {
    return element.classList.contains(className);
  }
}
