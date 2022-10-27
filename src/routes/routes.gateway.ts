import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class RoutesGateway implements OnModuleInit {
  private kafkaProducer: Producer;

  @WebSocketServer()
  server: Server;

  constructor(
    @Inject('KAFKA_SERVICE')
    private kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaProducer = await this.kafkaClient.connect();
  }

  @SubscribeMessage('new-direction')
  handleMessage(@MessageBody() data: string) {
    // this.kafkaProducer.send({
    //   topic: 'route.new.direction',
    //   messages: [
    //     {
    //       key: 'route.new.direction',
    //       value: payload,
    //     },
    //   ],
    // });
    console.log(data || 'nothing');
  }
}
