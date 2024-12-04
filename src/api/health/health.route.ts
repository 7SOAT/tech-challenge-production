import { Controller, Get } from "@nestjs/common";

@Controller('health')
export class HealthRoute {
  constructor(){}

  @Get()
  async getHealthStatus() {
    return { success: true };
  }
}