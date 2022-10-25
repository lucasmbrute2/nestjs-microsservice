import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class RoutesGateway {
  private kafkaProducer: Producer;

  constructor(
    @Inject('KAFKA_SERVICE')
    private kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaProducer = await this.kafkaClient.connect();
  }

  @SubscribeMessage('new-direction')
  handleMessage(client: any, payload: any) {
    // this.kafkaProducer.send({
    //   topic: 'route.new.direction',
    //   messages: [
    //     {
    //       key: 'route.new.direction',
    //       value: payload,
    //     },
    //   ],
    // });
    console.log(payload);
  }
}
