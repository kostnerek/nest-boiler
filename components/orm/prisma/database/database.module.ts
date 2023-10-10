import { DynamicModule, Module } from '@nestjs/common';
import { DATABASE_OPTIONS_TOKEN } from './database.consts';
import { DatabaseAsyncOptions, DatabaseOptions } from './database.options';
import { DatabaseService } from './database.service';


@Module({
  providers:[DatabaseService],
  exports:[DatabaseService],
})
export class DatabaseModule {
  static forRoot(options: DatabaseOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: DatabaseModule,
      providers: [
        { provide: DATABASE_OPTIONS_TOKEN, useValue: options },
        DatabaseService,
      ],
      exports: [DatabaseService],
    };
  }

  static forRootAsync(options: DatabaseAsyncOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: DatabaseModule,
      providers: [
        {
          provide: DATABASE_OPTIONS_TOKEN,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        DatabaseService,
      ],
      imports: options.imports,
      exports: [DatabaseService],
    };
  }
}