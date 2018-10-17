import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) readonly repository: Repository<Todo>) {}

  createOne(t: DeepPartial<Todo>): Promise<Todo> {
    return this.repository.save(this.repository.create(t));
  }

  getOne(id: number): Promise<Todo> {
    return this.repository.findOne(id);
  }

  async updateOne(id: number, t: DeepPartial<Todo>): Promise<Todo> {
    return this.repository.save(
      this.repository.merge(await this.getOne(id), t),
    );
  }

  async deleteOne(id: number): Promise<Todo> {
    return this.repository.remove(await this.getOne(id));
  }
}
