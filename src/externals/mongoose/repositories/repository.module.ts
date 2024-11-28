import { DynamicModule } from '@nestjs/common';
import { ModuleConfig } from 'src/core/type/module.config';

export class RepositoryModule {
  static register(config: ModuleConfig): DynamicModule {
    return {
      module: RepositoryModule,
      imports: [...config.imports],
      providers: [...config.providers],
      controllers: [...config.controllers],
      exports: [...config.exports],
    };
  }
}