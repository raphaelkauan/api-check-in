import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { PrismaService } from "src/libs/prisma.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Events")
@Controller("events")
export class EventController {
    constructor(
        private readonly eventService: EventService,
        private readonly prisma: PrismaService,
    ) {}

    @Post()
    async create(@Body() event: CreateEventDto) {
        return this.eventService.create(event);
    }

    @Get(":eventId")
    async getEvent(@Param("eventId") eventId: string) {
        return this.eventService.getEvent(eventId);
    }

    @Delete("delete/:eventId")
    async deleteEvent(@Param("eventId") eventId: string) {
        return this.eventService.deleteEvent(eventId);
    }
}
