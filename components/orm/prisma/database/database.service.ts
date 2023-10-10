import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_OPTIONS_TOKEN } from './database.consts';
import { PrismaOptions } from './database.options';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    constructor(
        @Inject(PRISMA_OPTIONS_TOKEN)
        private readonly options: PrismaOptions,
    ) {
        super({
            datasourceUrl: options.url,
            log: options.verbose ? ['info', 'query', 'warn', 'error'] : undefined,
        });
    }

    async onModuleInit() {
        await this.$connect();
    }
}
