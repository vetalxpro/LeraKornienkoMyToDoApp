import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ThinghsBoard';
  private previousMobileScreenValue: boolean | undefined;
  isMobileView: boolean | undefined;

  constructor() {}

  ngOnInit(): void {
    this.isWindowMobile(window);
  }

  /**
   * @param event global variable window
   * method defined window.width and assign isMobileView: boolean
   */

  isWindowMobile(event: Window): void {
    this.isMobileView = event.innerWidth <= 750;
    if (this.previousMobileScreenValue !== this.isMobileView) {
      this.previousMobileScreenValue = this.isMobileView;
      console.log(this.isMobileView)
    }
  }

  @HostListener('window: resize', ['$event.target'])
  onResize(event: Window): void {
    this.isWindowMobile(event);
  }

  ngOnDestroy(): void {
  }
}
