import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma.service";
import { CreateAttendeeDto } from "./dto/create-attendee.dto";
import { Request } from "express";

@Injectable()
export class AttendeeService {
    constructor(private prisma: PrismaService) {}

    async getTxt() {
        const nome = "raphael";

        return nome;
    }

    async createAttendees(eventId: string, attendee: CreateAttendeeDto) {
        const data = {
            name: attendee.name,
            email: attendee.email,
            eventId: eventId,
        };

        const validationEvent = await this.prisma.event.findUnique({
            where: {
                id: data.eventId,
            },
        });

        if (validationEvent === null) {
            throw new HttpException("Esse evento não existe!", HttpStatus.BAD_REQUEST);
        }

        const validationEmail = await this.prisma.attendees.findFirst({
            where: {
                AND: [{ email: data.email, eventId: data.eventId }],
            },
        });

        if (validationEmail) {
            throw new HttpException("Esse email já está cadastrado nesse evento!", HttpStatus.CONFLICT);
        }

        // -- --
        const numberTotalEventPermission = await this.prisma.event.findUnique({
            where: {
                id: data.eventId,
            },
        });

        const countNumber = await this.prisma.attendees.count({
            where: {
                eventId: data.eventId,
            },
        });

        if (numberTotalEventPermission && countNumber >= numberTotalEventPermission.maximumAttendees) {
            throw new HttpException("Esse evento já está lotado!", HttpStatus.BAD_REQUEST);
        }
        // -- --

        const createAttendee = await this.prisma.attendees.create({ data });
        return { id: createAttendee.id };
    }

    async getAttendee(attendeeId: string, request: Request) {
        const convertId = Number(attendeeId);

        const attendeeSearch = await this.prisma.attendees.findFirst({
            select: {
                id: true,
                name: true,
                email: true,
                eventId: true,
                event: {
                    select: {
                        title: true,
                    },
                },
            },
            where: {
                id: convertId,
            },
        });

        if (attendeeSearch === null) {
            throw new HttpException("Esse id está incorreto!", HttpStatus.BAD_REQUEST);
        }

        const baseUrl = `${request.protocol}://${request.hostname}`;

        const checkUrl = new URL(`/events/attendees/check-in/${attendeeId}`, baseUrl);

        const data = {
            id: attendeeSearch.id,
            name: attendeeSearch.name,
            email: attendeeSearch.email,
            event: attendeeSearch.event.title,
            check_in_url: checkUrl.toString(),
        };

        return { data };
    }

    async getAttendees(eventId: string, name?: string, pageIndex?: string, id?: string) {
        const filtro: any = { eventId: eventId };

        if (name) {
            filtro.name = { contains: name };
        }

        if (id) {
            filtro.id = parseInt(id);
        }

        let skipValue = 0;
        if (pageIndex) {
            const convertPageIndex = Number(pageIndex);
            skipValue = convertPageIndex * 10;
        }

        const attendees = await this.prisma.attendees.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                checkin: {
                    select: {
                        createdAt: true,
                    },
                },
            },
            where: filtro,
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
            skip: skipValue,
        });

        const data = attendees.map((index) => {
            return {
                id: index.id,
                name: index.name,
                email: index.email,
                createdAt: index.createdAt,
                check: index.checkin?.createdAt || null,
            };
        });

        return { data };
    }
}
