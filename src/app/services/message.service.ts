import { Injectable, EventEmitter } from '@angular/core';
import { IMessage } from '../models/viewModels';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: IMessage;
  public MessageAdded: EventEmitter<IMessage>;
  constructor() {
    this.MessageAdded = new EventEmitter();
  }
  get Message(): IMessage {
    return this.message;
  }

  set Message(value: IMessage) {
    this.message = value;
    this.MessageAdded.emit(this.message);
  }
}
