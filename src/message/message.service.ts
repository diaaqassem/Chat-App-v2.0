import { BadRequestException, Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { MessageDto } from 'src/gateway/dtos/message.dto';
import { Room } from 'src/rooms/rooms.schema';
import { Message } from './message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Room.name) private rooms: Model<Room>,
    @InjectModel(Message.name) private messages: Model<Message>,
  ) {}

  async addMessage(data: MessageDto) {
    const room = await this.rooms.findById(data.roomID).exec();
    if (!room) throw new BadRequestException({ message: 'Room not found' });
    if (!room.users.includes(data.userID)) {
      throw new BadRequestException({ message: "User isn't in the chat" });
    }
    console.log('message send');

    const newMessage = await this.messages.create({
      user: data.userID,
      room: data.roomID,
      content: data.content,
      createdAt: new Date().toISOString(),
    });
    await newMessage.save();
    await this.rooms.updateOne(
      {
        _id: data.roomID,
      },
      { $push: { messages: newMessage._id } },
    );
    return newMessage;
  }

  async getMessagesByRoomId(
    roomId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
  ): Promise<Message[]> {
    const room = await this.rooms.findById(roomId).exec();
    if (!room) throw new BadRequestException({ message: 'Room not found' });
    if (!room.users.includes(userId)) {
      throw new BadRequestException({ message: "User isn't in the chat" });
    }
    return await this.messages.find({ room: roomId });
  }

  async clearAllMessages() {
    return await this.messages.deleteMany({});
  }
}
