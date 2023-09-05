import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewMessageComponent } from '../../../../../shared/components/new-message/new-message.component';

@Component({
  standalone: true,
  imports: [CommonModule, NewMessageComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {}
