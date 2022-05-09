import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateStoryDto } from "../../modules/stories/dto/create-story.dto";
import { Stories } from "../stories.schema";

@Injectable()
export class StoriesRepository {
    constructor(@InjectModel(Stories.name) private storiesModel: Model<Stories>) { }

    async create(storyItem: CreateStoryDto): Promise<Stories> {
        const newStory = new this.storiesModel(storyItem)
        return await newStory.save()
    }

    async getById(id: string): Promise<Stories> {
        return await this.storiesModel.findOne({ _id: id })
            .populate('authorId')
            .populate('fans')
            .exec()
    }

    async getAll(): Promise<Stories[]> {
        return await this.storiesModel.find().populate('authorId').exec()
    }

    async delete(id: string): Promise<Stories[]> {
        const deleted = await this.storiesModel.deleteOne({ _id: id })
        return await this.getAll()
    }

    async addFan(id: string, fanId: string): Promise<Stories> {
        const updated = await this.storiesModel.updateOne({ _id: id }, { $push: { fans: fanId } })
        return await this.getById(id)
    }
}