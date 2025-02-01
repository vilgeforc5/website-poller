import { ScheduleJobType } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class CreateScheduledJobDto {
    @IsEnum(ScheduleJobType)
    type: ScheduleJobType;

    @IsString()
    cronStr: string;
}
