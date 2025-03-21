import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'http';

interface NewOrderData {
  // Defina os campos que o seu pedido (order) terá
  productId: string;
  quantity: number;
  userId: string;
  // adicione outros campos conforme necessário
}

@WebSocketGateway({
  cors: {
    origin: '*', // Permite acesso de qualquer origem (ajuste conforme necessário)
  },
})
export class OrdersGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newOrder')
  handleNewOrder(@MessageBody() data: NewOrderData): void {
    this.server.emit('orderCreated', data); // Agora 'data' está tipada
  }
}
