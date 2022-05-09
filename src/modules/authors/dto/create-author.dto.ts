import { CreateStoryDto } from "../../stories/dto/create-story.dto"

export class CreateAuthorDto {
    readonly name: string
    readonly email: string
    readonly age: number
    stories?: CreateStoryDto[]
}