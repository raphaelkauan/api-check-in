import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma.service";

@Injectable()
export class CheckService {
    constructor(private prisma: PrismaService) {}

    async checkIn(attendeeId: string) {
        const convertAttendeeId = Number(attendeeId);

        const attendeeCheck = await this.prisma.checkin.findUnique({
            where: {
                attendeeId: convertAttendeeId,
            },
        });

        if (attendeeCheck) {
            throw new HttpException("Esse check-in já foi realizado!", HttpStatus.CONFLICT);
        }

        await this.prisma.checkin.create({
            data: {
                attendeeId: convertAttendeeId,
            },
        });

        return "Check-in realizado com sucesso!";
    }
}
