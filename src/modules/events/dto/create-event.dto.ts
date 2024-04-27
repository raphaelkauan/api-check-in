import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateEventDto {
    @ApiProperty()
    id?: string;

    @ApiProperty({
        example: "Meu evento de filmes",
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: "Eventos destinado para fãs de filmes",
    })
    @IsString()
    details?: string;

    @ApiProperty({
        example: "meu-evento-de-filmes",
    })
    @IsString()
    slug: string;

    @ApiProperty({
        example: 50,
    })
    @IsInt()
    maximumAttendees: number;
}
