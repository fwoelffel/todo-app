import { Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

@Scalar('Date')
export class DateScalar {
  description = 'Date custom scalar type';

  parseValue(value) {
    return new Date(value);
  }

  serialize(value) {
    return value.getTime();
  }

  parseLiteral(ast) {
    return ast.kind === Kind.INT ? parseInt(ast.value, 10) : null;
  }
}