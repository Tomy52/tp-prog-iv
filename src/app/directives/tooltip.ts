import {Directive, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  host: {
    '(mouseover)':'hoverHandler($event)',
    '(mouseout)':'outHandler($event)'

  }
})
export class Tooltip {

  tooltipElement: any;
  pElement: any ;

  constructor(private renderer: Renderer2) {}

  @Input() appTooltip:string = '';

  hoverHandler(event: any) {

    this.tooltipElement = this.renderer.createElement('span');
    this.pElement = this.renderer.createElement('p');

    this.renderer.addClass(this.tooltipElement, 'tool-tip');
    this.renderer.addClass(this.pElement, 'tool-tip-text');

    const tooltipText = this.renderer.createText(this.appTooltip);
    this.renderer.appendChild(this.pElement, tooltipText);

    this.renderer.insertBefore(event.target.parentNode, this.tooltipElement, event.target.next);
    this.renderer.insertBefore(this.tooltipElement, this.pElement, event.target.next);
  }

  outHandler(event: any) {
    this.renderer.removeChild(event.target.parentNode, this.tooltipElement);
  }
}
