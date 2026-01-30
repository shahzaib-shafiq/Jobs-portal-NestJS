import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Create notification
  async create(createNotificationDto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        message: createNotificationDto.message,
        userId: createNotificationDto.userId,
      },
    });
  }

  // ✅ Get all notifications (not deleted)
  async findAll() {
    return this.prisma.notification.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true, // optional
      },
    });
  }

  // ✅ Get single notification
  async findOne(id: string) {
    const notification = await this.prisma.notification.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        user: true, // optional
      },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return notification;
  }

  // ✅ Update notification (mark as read, edit message, etc.)
  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.prisma.notification.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return this.prisma.notification.update({
      where: { id },
      data: {
        ...updateNotificationDto,
      },
    });
  }

  // ✅ Soft delete notification
  async remove(id: string) {
    const notification = await this.prisma.notification.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return this.prisma.notification.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }

  async getCounts(userId: string) {
    const [unreadCount, readCount] = await this.prisma.$transaction([
      this.prisma.notification.count({
        where: {
          userId,
          isRead: false,
        },
      }),
      this.prisma.notification.count({
        where: {
          userId,
          isRead: true,
        },
      }),
    ]);

    return {
      unread: unreadCount,
      read: readCount,
      total: unreadCount + readCount,
    };
  }
}
