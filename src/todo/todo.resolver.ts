import { Inject } from '@nestjs/common';
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { TodoService } from './todo.service';

@Resolver('Todo')
export class TodoResolver {
  constructor(@Inject(TodoService) readonly service: TodoService) {}

  @Query('getTodo')
  getTodo(@Args('id') id: number) {
    return this.service.getOne(id);
  }

  @Query('getTodos')
  getTodos() {
    return this.service.getMany();
  }

  @Mutation('createTodo')
  createTodo(@Args('input') input: { title: string; done?: boolean }) {
    return this.service.createOne(input);
  }

  @Mutation('updateTodo')
  updateTodo(@Args('input')
  input: {
    id: number;
    title?: string;
    done?: boolean;
  }) {
    return this.service.updateOne(input.id, {
      title: input.title,
      done: input.done,
    });
  }

  @Mutation('removeTodo')
  removeTodo(@Args('input') input: { id: number }) {
    return this.service.deleteOne(input.id);
  }
}
