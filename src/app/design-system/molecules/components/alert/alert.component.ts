import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  isVisible = true;
  srcClose = 'assets/images/close-line.png';
  lineColor = "";
  textColor = "";

  @Input() srcImage = 'assets/images/Icon-success.png';  
  @Input() status: string = 'success';
  @Input() message!: string;

  ngOnInit() {
    this.setLineAndTextColor(); 
    setTimeout(() => {
      this.closeAlert();
    }, 4000);
  }

  closeAlert() {
    this.isVisible = false;
  }

  setLineAndTextColor() {
    switch (this.status) {
      case 'warning':
        this.lineColor = "line-warn";
        this.textColor = "text-warn";
        break;
      case 'error':
        this.lineColor = "line-error";
        this.textColor = "text-error";
        break;
      default:
        this.lineColor = "line-sucess";
        this.textColor = "text-sucess";
        break;
    }
  }
}
