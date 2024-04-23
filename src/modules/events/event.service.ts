import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { generateSlug } from "src/utils/functions/generateSlug";

@Injectable()
export class EventService {
    constructor(private prisma: PrismaService) {}

    getHello(): string {
        return "Rota de eventos!";
    }

    async create(event: CreateEventDto) {
        const title = event.title;
        const slug = generateSlug(event.slug);

        const validationTitle = await this.prisma.event.findFirst({
            where: { title },
        });

        const validationSlug = await this.prisma.event.findUnique({
            where: { slug },
        });

        if (validationTitle) {
            throw new HttpException("Esse title já existe!", HttpStatus.CONFLICT);
        } else if (validationSlug) {
            throw new HttpException("Esse slug já existe!", HttpStatus.CONFLICT);
        }

        const data = {
            title: event.title,
            details: event.details,
            maximumAttendees: event.maximumAttendees,
            slug: slug,
        };

        const createdEvent = await this.prisma.event.create({ data });
        return { id: createdEvent.id };
    }

    async getEvent(eventId: string) {
        const eventSearch = await this.prisma.event.findFirst({
            select: {
                id: true,
                title: true,
                details: true,
                slug: true,
                maximumAttendees: true,
                _count: {
                    select: {
                        attendees: true,
                    },
                },
            },
            where: {
                id: eventId,
            },
        });

        if (eventSearch === null) {
            throw new HttpException("Esse id não existe!", HttpStatus.BAD_REQUEST);
        }

        const data = {
            id: eventSearch.id,
            title: eventSearch.title,
            details: eventSearch.details,
            slug: eventSearch.slug,
            maximumAttendees: eventSearch.maximumAttendees,
            count: eventSearch._count,
        };

        return { data };
    }
}
