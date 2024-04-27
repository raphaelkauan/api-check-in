import { Body, Controller, Get, Param, Post, Query, Req } from "@nestjs/common";
import { CreateAttendeeDto } from "./dto/create-attendee.dto";
import { AttendeeService } from "./attendee.service";
import { Request } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Attendees")
@Controller("events/attendees")
export class AttendeeController {
    constructor(private readonly attendeeService: AttendeeService) {}

    @Post(":eventId")
    async createAttendees(@Param("eventId") eventId: string, @Body() attendee: CreateAttendeeDto) {
        return this.attendeeService.createAttendees(eventId, attendee);
    }

    @Get(":attendeeId")
    async getAttendee(@Param("attendeeId") attendeeId: string, @Req() request: Request) {
        return this.attendeeService.getAttendee(attendeeId, request);
    }

    @Get("all/:eventId")
    async getAttendees(
        @Param("eventId") eventId: string,
        @Query("name") name?: string,
        @Query("pageIndex") pageIndex?: string,
        @Query("id") id?: string,
    ) {
        return this.attendeeService.getAttendees(eventId, name, pageIndex, id);
    }
}
