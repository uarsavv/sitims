import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AlphabetService } from './alphabet.service';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({ cors: true })
@Injectable()
export class AlphabetUpdateGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly alphabetService: AlphabetService) {}

  @SubscribeMessage('getAlphabetById')
  async handleGetAlphabetById(@MessageBody() alphabetId: number) {
    const alphabet = await this.alphabetService.findOneById(alphabetId);
    return { event: 'alphabetUpdated', data: alphabet };
  }

  // @SubscribeMessage('updateAlphabet')
  // async handleUpdateAlphabet(
  //   @MessageBody() { id, newAlphabet }: { id: number; newAlphabet: string },
  // ) {
  //   await this.alphabetService.update(id, )
  //   this.sendAlphabetUpdate(newAlphabet);
  // }

  sendAlphabetUpdate(alphabet: any) {
    this.server.emit('alphabetUpdated', alphabet);
  }
}
