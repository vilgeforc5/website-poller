import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDataSourceTableDto } from "src/layers/data-source-table/dto/create-data-source-table.dto";
import { UpdateDataSourceTableDto } from "src/layers/data-source-table/dto/update-data-source-table.dto";

@Injectable()
export class DataSourceTableRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create({ userId, ...other }: CreateDataSourceTableDto) {
        return this.prismaService.dataSourceTable.create({
            data: { ...other, users: { connect: { id: userId } } },
        });
    }

    update({ id, ...data }: UpdateDataSourceTableDto) {
        return this.prismaService.dataSourceTable.update({
            where: { id },
            data,
        });
    }

    getAll(userId: number) {
        return this.prismaService.dataSourceTable.findMany({
            where: { users: this.getCommonUserIdFilter(userId) },
        });
    }

    getById(userId: number, tableId: number) {
        return this.prismaService.dataSourceTable.findFirst({
            where: { users: this.getCommonUserIdFilter(userId), id: tableId },
        });
    }

    private getCommonUserIdFilter(id: number) {
        return { some: { id } };
    }
}
