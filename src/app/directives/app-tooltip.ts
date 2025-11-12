import {Directive, inject, input, Input, Renderer2} from '@angular/core';
@Directive({
  selector: '[appTooltip]',
  host: {
    '(mouseover)': 'hoverHandler($event)',
    '(mouseout)': 'outHandler($event)',
  }
})
export class TooltipDirective {
  renderer = inject(Renderer2);
  toolTipElement: any;
  // Input property to receive tooltip text
  appTooltip = input<string>();

  // When mouse leaves the element
  outHandler(event: any) {
    // Remove tooltip element from DOM
    this.renderer.removeChild(event.target.parentNode, this.toolTipElement);
  }
  // When mouse hovers over the element
  hoverHandler(event: any) {
    // Create a <span> element for the tooltip
    this.toolTipElement = this.renderer.createElement('span');
    // Set the tooltip text
    this.renderer.setProperty(this.toolTipElement, 'textContent', this.appTooltip());
    // Insert tooltip after the hovered element
    this.renderer.insertBefore(event.target.parentNode, this.toolTipElement, event.target.next);
  }
}
