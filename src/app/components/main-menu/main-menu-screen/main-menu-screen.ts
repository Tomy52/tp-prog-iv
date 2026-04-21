import { AfterViewInit, Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { MainMenuButton } from "../main-menu-button/main-menu-button";
import { DynamicRendererService } from '../../../services/dynamic-renderer-service';

@Component({
  selector: 'app-main-menu-screen',
  imports: [],
  templateUrl: './main-menu-screen.html',
  styleUrl: './main-menu-screen.css'
})
export class MainMenuScreen implements AfterViewInit {
  @ViewChild('menuOptions', {read: ViewContainerRef}) menuOptions!:ViewContainerRef
  dynamic_render = inject(DynamicRendererService)

  ngAfterViewInit(): void {
    const component = this.dynamic_render.selectMainMenu()

    if(component)
    {
      this.menuOptions.createComponent(component);
    }

  }
  

}
