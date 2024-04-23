import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateEventDto {
    id?: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    details?: string;

    @IsString()
    slug: string;

    @IsInt()
    maximumAttendees: number;
}
