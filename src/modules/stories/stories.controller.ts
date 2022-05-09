import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Stories } from "../../database/stories.schema";
import { AddFanDto } from "./dto/add-fan.dto";
import { CreateStoryDto } from "./dto/create-story.dto";
import { StoriesService } from "./stories.service";

@Controller('stories')
export class StoriesController {
    constructor(private readonly storiesService: StoriesService) { }

    @Post()
    async createStory(@Body() createStoryDto: CreateStoryDto): Promise<Stories> {
        return await this.storiesService.createStory(createStoryDto)
    }

    @Get(':id')
    async getStoryById(@Param('id') id: string): Promise<Stories> {
        return await this.storiesService.getStoryById(id)
    }

    @Get()
    async getAllStories(): Promise<Stories[]> {
        return await this.storiesService.getAllStories()
    }

    @Delete(':id')
    async deleteStory(@Param('id') id: string): Promise<Stories[]> {
        return await this.storiesService.deleteStory(id)
    }

    @Post('/fans/:id')
    async addFans(@Body() fanId: AddFanDto, @Param('id') id: string): Promise<Stories> {
        return await this.storiesService.addFan(id, fanId.fanId)
    }
}