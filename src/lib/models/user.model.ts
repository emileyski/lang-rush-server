import {
  Field,
  HideField,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Lang, Role } from '@prisma/client';
import { Base } from './base.model';

registerEnumType(Role, { name: 'Role' });
registerEnumType(Lang, { name: 'Lang' });

@ObjectType()
export class User extends Base {
  @Field()
  email: string;

  @Field(() => Role)
  role: Role;

  @HideField()
  password: string;

  @HideField()
  token?: string;

  @Field(() => Lang)
  nativeLang: Lang;
}
