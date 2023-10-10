import {
  DynamicModule,
  ForwardReference,
  InjectionToken,
  OptionalFactoryDependency,
  Provider,
  Type,
} from '@nestjs/common';

export interface DatabaseOptions {
  isGlobal: boolean;
  url: string;
  verbose?: boolean;
}

export interface DatabaseAsyncOptions {
  isGlobal: boolean;
  imports: Array<
      Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
  useFactory?: (
      ...args: any[]
  ) =>
      | Promise<Omit<DatabaseOptions, 'isGlobal'>>
      | Omit<DatabaseOptions, 'isGlobal'>;
  inject?: Array<InjectionToken | OptionalFactoryDependency>;
  providers?: Provider[];
}
