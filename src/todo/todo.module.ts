import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.hasOwnProperty('POSTGRES_HOST')
        ? process.env.POSTGRES_HOST
        : '127.0.0.1',
      port: process.env.hasOwnProperty('POSTGRES_PORT')
        ? Number(process.env.POSTGRES_PORT)
        : 5432,
      username: process.env.hasOwnProperty('POSTGRES_USER')
        ? process.env.POSTGRES_USER
        : 'default_user',
      password: process.env.hasOwnProperty('POSTGRES_PASSWORD')
        ? process.env.POSTGRES_PASSWORD
        : 'default_password',
      database: process.env.hasOwnProperty('POSTGRES_DB')
        ? process.env.POSTGRES_DB
        : 'default_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Todo]),
  ],
  providers: [TodoService],
})
export class TodoModule {}
