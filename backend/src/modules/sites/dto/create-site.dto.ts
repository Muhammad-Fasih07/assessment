import { IsMongoId, IsString, Matches, MinLength } from 'class-validator';

export class CreateSiteDto {
  @IsString()
  @Matches(/^[a-z0-9][a-z0-9-]*\.[a-z0-9]{2,}$/i, {
    message: 'address should look like my-page.zz',
  })
  address!: string;

  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  @MinLength(1)
  html!: string;

  @IsMongoId()
  authorId!: string;
}
