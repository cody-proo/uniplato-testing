import { PrismaClient } from "@prisma/client";

export class BaseController {
    protected repo = new PrismaClient()
}