import { Controller, Get, Param } from "@nestjs/common";
import { CheckService } from "./check.service";

@Controller("events/attendees/check-in")
export class CheckController {
    constructor(private readonly checkService: CheckService) {}

    @Get(":attendeeId")
    async checkIn(@Param("attendeeId") attendeeId: string) {
        return this.checkService.checkIn(attendeeId);
    }
}
