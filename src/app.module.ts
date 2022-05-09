import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config/keys'
import { AuthorModule } from './modules/authors/authors.module';
import { StoriesModule } from './modules/stories/stories.module';

@Module({
  imports: [MongooseModule.forRoot(config.mongoURI), AuthorModule, StoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
