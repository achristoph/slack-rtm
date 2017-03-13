import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../services/slack.service';

@Pipe({ name: 'messagePipe' })
export class MessagePipe implements PipeTransform {
  transform(messages: Message[], reviewed: string) {
    if (!reviewed) return messages;    
    return messages.filter(m => String(m.reviewed) === reviewed);
  };
}
