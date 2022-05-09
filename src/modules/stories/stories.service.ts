import { Injectable, NotFoundException } from "@nestjs/common";
import { AuthorsRepository } from "src/database/repositories/authors.repository";
import { Stories } from "../../database/stories.schema";
import { StoriesRepository } from "../../database/repositories/stories.repository";
import { CreateStoryDto } from "./dto/create-story.dto";

@Injectable()
export class StoriesService {
    constructor(private storiesRepository: StoriesRepository, private authorsRepository: AuthorsRepository) { }

    async createStory(storyItem: CreateStoryDto): Promise<Stories> {
        console.log('storyItem id: ', storyItem.authorId)
        //  Check if the author with the given id exists:
        const matchedAuthor = await this.authorsRepository.getById(storyItem.authorId)
        if (matchedAuthor) {
            console.log('id:', matchedAuthor._id)
            const newStory = await this.storiesRepository.create(storyItem)
            await newStory.save()
            //Add the story id to authors collection:
            await this.authorsRepository.updateStories(matchedAuthor.id, newStory.id)
            return newStory
        } else {
            throw new NotFoundException('Author with the given id not found!')
        }
    }

    async getStoryById(id: string): Promise<Stories> {
        const match = await this.storiesRepository.getById(id)
        if (match) {
            return match
        } else {
            throw new NotFoundException('Story with given id not found!')
        }
    }

    async getAllStories(): Promise<Stories[]> {
        return await this.storiesRepository.getAll()
    }

    async deleteStory(id: string): Promise<Stories[]> {
        const match = await this.storiesRepository.getById(id)
        if (match) {
            return await this.storiesRepository.delete(id)
        } else {
            throw new NotFoundException('Story not found!')
        }
    }

    async addFan(id: string, fanId: string): Promise<Stories> {
        //Check if the story exists:
        const storyExists = await this.storiesRepository.getById(id)
        if (storyExists) {
            //Check if an author with fanId exists:
            const fanExists = await this.authorsRepository.getById(fanId)
            if (fanExists) {
                return await this.storiesRepository.addFan(id, fanId)
            } else {
                throw new NotFoundException('Could not find an author with this id')
            }
        } else {
            throw new NotFoundException('The story you\'re trying to update does not exist!')
        }
    }
}