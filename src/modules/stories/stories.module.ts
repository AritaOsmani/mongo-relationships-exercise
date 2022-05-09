import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StoriesRepository } from "../../database/repositories/stories.repository";
import { Stories, StoriesSchema } from "../../database/stories.schema";
import { AuthorModule } from "../authors/authors.module";
import { StoriesController } from "./stories.controller";
import { StoriesService } from "./stories.service";


@Module({
    imports: [MongooseModule.forFeature([{ name: Stories.name, schema: StoriesSchema }]), AuthorModule],
    providers: [StoriesService, StoriesRepository],
    controllers: [StoriesController]
})
export class StoriesModule { }