import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "./env.variables";

@Injectable()
export class DatabaseConfig { 
  constructor(private readonly config: ConfigService<EnvironmentVariables>) {}

  getUrl(): string {
    return this.config.get<string>('DATABASE_URL');
  }

  getIsDbVerbose(): boolean {
    return this.config.get<boolean>('DATABASE_VERBOSE');
  }
}