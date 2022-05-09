import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, mongo } from "mongoose";
import { Author } from "./authors.schema";

@Schema()
export class Stories extends Document {

    @Prop({ required: true })
    title: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Author" })
    authorId: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }] })
    fans: string[]
}
export const StoriesSchema = SchemaFactory.createForClass(Stories)