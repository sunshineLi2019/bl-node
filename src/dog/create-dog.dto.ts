import { IsString, IsInt, ArrayMinSize, Min } from 'class-validator';

export class CreateDogDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @ArrayMinSize(1)
  readonly attention: string[];

  @IsInt()
  @Min(0)
  readonly recommendations: number;
}
