import { Controller, Post, Body } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryShortCreate, SummaryUrlShortCreate } from 'rabbit-mq-contracts';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Post('create')
  async createSummary(@Body() dto: SummaryShortCreate.Request): Promise<SummaryShortCreate.Response> {
    try {
      return await this.summaryService.createSummary(dto);
    } catch (error) {
      // Handle specific error types if needed
      console.log(error);
      if (error instanceof Error) {
        throw new Error(`Failed to create summary: ${error.message}`);
      }
      throw error;
    }
  }

  @Post('create-url')
  async createSummaryUrl(@Body() dto: SummaryUrlShortCreate.Request): Promise<SummaryUrlShortCreate.Response> {
    try {
      return await this.summaryService.createSummaryUrl(dto);
    } catch (error) {
      // Handle specific error types if needed
      console.log(error);
      if (error instanceof Error) {
        throw new Error(`Failed to create summary from url: ${error.message}`);
      }
      throw error;
    }
  }
}
