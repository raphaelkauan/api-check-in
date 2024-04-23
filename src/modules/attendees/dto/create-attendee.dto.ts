import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAttendeeDto {
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}
