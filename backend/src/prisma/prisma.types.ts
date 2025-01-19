import Prisma from "@prisma/client"
export {Site} from "@prisma/client"
export type {Poll} from "@prisma/client"

export type SiteWithPolls = Prisma.Site & {pollData?: Prisma.Poll[]}
