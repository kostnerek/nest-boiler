import { Transform, plainToClass } from "class-transformer";
import { IsBoolean, IsInt, IsString, validateSync } from "class-validator";

export class EnvironmentVariables {
  @IsInt()
  @Transform(({ value }) => +value)
  PORT = 3000;

  @IsString()
  DATABASE_URL = "";

  @IsBoolean()
  DATABASE_VERBOSE = false;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}