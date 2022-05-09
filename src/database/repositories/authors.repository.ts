import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAuthorDto } from "src/modules/authors/dto/create-author.dto";
import { UpdateAuthorDto } from "src/modules/authors/dto/update-author.dto";
import { Author } from "../authors.schema";

@Injectable()
export class AuthorsRepository {
    constructor(@InjectModel(Author.name) private authorModel: Model<Author>) { }

    async createNewAuthor(authorItem: CreateAuthorDto): Promise<Author> {
        const newAuthor = new this.authorModel(authorItem)
        return await newAuthor.save()
    }

    async getByEmail(email: string): Promise<Author> {
        const match = await this.authorModel.findOne({ email: email })
        return match
    }
    async getById(id: string): Promise<Author> {
        return await this.authorModel.findById({ _id: id }).populate('stories').exec()
    }

    async allAuthors(): Promise<Author[]> {
        return await this.authorModel.find()
    }

    async delete(id: string): Promise<Author[]> {
        const deleted = await this.authorModel.findByIdAndRemove({ _id: id })
        const allAuthors = this.allAuthors()
        return allAuthors
    }

    async updateStories(id: string, storyId: string): Promise<Author> {
        const updated = await this.authorModel.updateOne({ _id: id }, { $push: { stories: storyId } })
        return await this.getById(id)
    }

    async update(id: string, updateItem: UpdateAuthorDto): Promise<Author> {
        const updated = await this.authorModel.updateOne({ _id: id }, { $set: { name: updateItem.name, email: updateItem.email, age: updateItem.age } })
        return await this.getById(id)
    }
}