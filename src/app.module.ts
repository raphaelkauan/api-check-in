import { Module } from "@nestjs/common";
import { PrismaService } from "./libs/prisma.service";
import { EventController } from "./modules/events/event.controller";
import { EventService } from "./modules/events/event.service";
import { AttendeeService } from "./modules/attendees/attendee.service";
import { AttendeeController } from "./modules/attendees/attendee.controller";
import { CheckController } from "./modules/check-ins/check.controller";
import { CheckService } from "./modules/check-ins/check.service";

@Module({
    imports: [],
    controllers: [EventController, AttendeeController, CheckController],
    providers: [EventService, AttendeeService, PrismaService, CheckService],
})
export class AppModule {}
