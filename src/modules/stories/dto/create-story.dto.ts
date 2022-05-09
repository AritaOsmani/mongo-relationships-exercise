import { Author } from "src/database/authors.schema"
import { CreateAuthorDto } from "../../authors/dto/create-author.dto"

export class CreateStoryDto {
    readonly title: string
    readonly authorId: string
    readonly fans?: Author[]
}