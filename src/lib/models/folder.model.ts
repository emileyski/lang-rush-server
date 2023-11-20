import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from './base.model';

@ObjectType()
export class Folder extends Base {
  @Field()
  name: string;
}
