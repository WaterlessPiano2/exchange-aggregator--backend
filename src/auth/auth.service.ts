import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private JwtService: JwtService,
  ) {}
  async register(dto: AuthDto) {
    const saltedHashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = new this.userModel({
      email: dto.email,
      password: saltedHashedPassword,
    });
    const user = await newUser.save();
    return this.createToken(user.email);
  }

  async login(dto: AuthDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('Wrong email or password.');
    const isPasswordCorrect = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordCorrect)
      throw new UnauthorizedException('Wrong email or password.');

    return this.createToken(user.email);
  }

  createToken(email: string) {
    return this.JwtService.sign({ email });
  }
}
