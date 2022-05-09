import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Author, AuthorSchema } from "src/database/authors.schema";
import { AuthorsRepository } from "src/database/repositories/authors.repository";
import { AuthorController } from "./authors.controller";
import { AuthorService } from "./authors.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }])],
    controllers: [AuthorController],
    providers: [AuthorService, AuthorsRepository],
    exports: [AuthorsRepository]
})
export class AuthorModule { }