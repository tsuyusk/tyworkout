import { Injectable, HttpException } from '@nestjs/common';
import { Hash } from 'src/hash/hash';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hash: Hash,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hash.crypt(createUserDto.password);

    const sameEmailuser = await this.prismaService.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (sameEmailuser) {
      throw new HttpException('E-mail already taken', 400);
    }

    const data = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
    };

    const user = await this.prismaService.user.create({
      data,
    });

    delete user.password;

    return { user };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
