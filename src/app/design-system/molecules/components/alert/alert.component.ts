import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  isVisible = true;
  srcClose = 'assets/images/close-line.png';
  @Input() srcImage = 'assets/images/Icon-success.png';  
  @Input() lineColor: string = '#00B998';
  @Input() textColor: string = 'green'; 

  @Input() message!: string;

  ngOnInit() {
    setTimeout(() => {
      this.closeAlert();
    }, 4000);
  }

  closeAlert() {
    this.isVisible = false;
  }
}
