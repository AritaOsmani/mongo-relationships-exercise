import { Body, ConflictException, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Author } from "../../database/authors.schema";
import { AuthorService } from "./authors.service";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";

@Controller('authors')
export class AuthorController {
    constructor(private authorService: AuthorService) { }

    @Post()
    async create(@Body() createAuthor: CreateAuthorDto) {
        const match = this.authorService.getAuthorByEmail(createAuthor.email)
        if (match) {
            return await this.authorService.createAuthor(createAuthor)
        } else {
            throw new ConflictException('This email is already being used')
        }

    }
    @Get()
    async findAll(): Promise<Author[]> {
        return await this.authorService.getAll()
    }

    @Get(':id')
    async getAuthorById(@Param('id') id: string): Promise<Author> {
        return await this.authorService.getAuthorById(id)
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Author[]> {
        return this.authorService.deleteAuthor(id)
    }

    @Patch(':id')
    async updateAuthor(@Param('id') id: string, @Body() updateItem: UpdateAuthorDto): Promise<Author> {
        return await this.authorService.updateAuthor(id, updateItem)
    }
}