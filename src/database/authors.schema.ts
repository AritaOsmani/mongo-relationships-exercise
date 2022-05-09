import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Stories } from "./stories.schema";

@Schema()
export class Author extends Document {

    @Prop({ required: true })
    name: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop()
    age: number

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stories" }] })
    stories: string[]
}

export const AuthorSchema = SchemaFactory.createForClass(Author)