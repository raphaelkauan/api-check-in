import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAttendeeDto {
    /**
     *Testando documentação com comentários
     *@example Raphael
     */
    @IsString()
    name: string;

    @ApiProperty({
        example: "raphael@gmail.com",
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
