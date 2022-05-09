import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Author } from "src/database/authors.schema";
import { AuthorsRepository } from "../../database/repositories/authors.repository";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";

@Injectable()
export class AuthorService {
    constructor(private authorRepository: AuthorsRepository) { }

    async getAll() {
        return await this.authorRepository.allAuthors()
    }

    async getAuthorByEmail(email: string): Promise<Author> {
        const match = await this.authorRepository.getByEmail(email)
        if (!match) {
            return match
        } else {
            throw new ConflictException('Author already exists')
        }
    }
    async getAuthorById(id: string): Promise<Author> {
        const match = await this.authorRepository.getById(id)
        if (match) {
            return match
        } else {
            throw new NotFoundException('Author not found')
        }
    }

    async createAuthor(authorItem: CreateAuthorDto): Promise<Author> {
        const newAuthor = this.authorRepository.createNewAuthor(authorItem)
        return await newAuthor
    }
    async deleteAuthor(id: string): Promise<Author[]> {
        const match = await this.authorRepository.getById(id)
        console.log("match: ", match)
        if (match) {
            console.log('Inside if')
            return await this.authorRepository.delete(match._id)
        } else {
            throw new NotFoundException('Author with given id not found!')
        }

    }

    async updateAuthor(id: string, updateItem: UpdateAuthorDto): Promise<Author> {
        //Check if the author you want to update exists:
        const authorExists = await this.authorRepository.getById(id)
        if (authorExists) {

            if (updateItem.email) {
                //Check if this email is currently in use:
                const match = await this.authorRepository.getByEmail(updateItem.email)
                if (match) {
                    throw new ConflictException('This email is currently being used!')
                }
            }
            if (updateItem.age) {
                if (updateItem.age < 0 || updateItem.age > 120) {
                    throw new ConflictException('Invalid age input')
                }
            }
            return await this.authorRepository.update(id, updateItem)
        } else {
            throw new NotFoundException('The author you\'re trying to update does not exist')
        }

    }
}