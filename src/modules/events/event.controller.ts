import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { PrismaService } from "src/libs/prisma.service";

@Controller("events")
export class EventController {
    constructor(
        private readonly eventService: EventService,
        private readonly prisma: PrismaService,
    ) {}

    @Get()
    getHello(): string {
        return this.eventService.getHello();
    }

    @Post()
    async create(@Body() event: CreateEventDto) {
        return this.eventService.create(event);
    }

    @Get(":eventId")
    async getEvent(@Param("eventId") eventId: string) {
        return this.eventService.getEvent(eventId);
    }
}
