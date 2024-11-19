import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { RoomsModule } from 'src/rooms/rooms.module';
import { Room, RoomsSchema } from 'src/rooms/rooms.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomsSchema }]),
    RoomsModule,
  ],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
