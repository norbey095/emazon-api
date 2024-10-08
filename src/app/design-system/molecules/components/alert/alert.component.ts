import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  isVisible = true;
  srcImage= "assets/images/Icon-success.png";
  srcClose= "assets/images/close-line.png";

  @Input() message!: string;

  closeAlert() {
    this.isVisible = false;
  }
}
