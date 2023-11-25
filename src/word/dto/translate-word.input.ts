import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsAlpha, Length } from "class-validator";

@InputType()
export class TranslateWordInput {
  @Field()
  @IsAlpha()
  @Length(1, 24)
  @Transform(({ value }) => value.toLowerCase())
  word: string;
}