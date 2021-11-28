import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinksController } from './links/links.controller';
import { LinksService } from './links/links.service';
import { SessionModule } from 'nestjs-session';

// import { RedisService } from './redis/redis.service';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';
import { PgService } from './pg/pg.service';

let cookie = {}
if(  process.env.NODE_ENV && process.env.NODE_ENV === 'production'){
  cookie = {
    sameSite: 'none', 
    secure: true  
  }
}
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    SessionModule.forRoot({
      session: { secret: 'keyboard cat', cookie},
    }),
  ],
  controllers: [AppController, LinksController],
  providers: [AppService, LinksService, PgService, PgService],
})
export class AppModule {}
