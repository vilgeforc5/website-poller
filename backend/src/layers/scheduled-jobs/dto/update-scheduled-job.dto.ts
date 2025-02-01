import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { ScheduleJobStatus } from "@prisma/client";

export class UpdateScheduledJobDto {
    @IsInt()
    jobId: number;

    @IsOptional()
    @IsString()
    cronStr: string;

    @IsOptional()
    @IsEnum(ScheduleJobStatus)
    status: ScheduleJobStatus;
}
