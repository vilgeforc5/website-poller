import { IsInt } from "class-validator";

export class DeleteScheduledJobDto {
    @IsInt()
    jobId: number;
}
