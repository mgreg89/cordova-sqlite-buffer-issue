import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { Category } from '../entity/Category';
import { Post } from '../entity/Post';
import { Author } from '../entity/Author';
import { createConnection } from 'typeorm';
import { Utilities } from '../utilities/Utilities';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform, private http: HttpClient) {
    platform.ready().then(() => {
      console.log("platformready");

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.onDeviceReady();
    });
  }

 async onDeviceReady() {
    console.log("ondeviceready");

    createConnection({
      type: "cordova",
      name: "test",
      database: "test.db",
      location: "default",
      entities: [
        Post
      ],
      logging: ['error', 'query', 'schema'],
      logger: "simple-console",
      synchronize: true
    }).then(async connection => {
      const post = new Post();
      var img = await this.getImage("https://picsum.photos/200/300");
      console.log("image: ");
      console.log(img);
      post.title = "Control flow based type analysis";
      post.image = new Buffer(img);

      await connection.manager.save(post);

      console.log("Post has been saved");
      document.writeln("Post has been saved");

      const savedPost = await connection.manager.findByIds(Post, [post.id]);

      console.log("Post has been loaded: ", savedPost);
      console.log("Post has been loaded: ", JSON.stringify(savedPost));
      document.writeln("Post has been loaded: " + JSON.stringify(savedPost));

    }).catch(error => {
      console.log("Error: ", error);
      document.writeln("Error: " + JSON.stringify(error));
    });
  }

  async getImage(url: string): Promise<Buffer> {
    if (url) {
      return new Buffer(await this.http.get(url, { responseType: 'arraybuffer' }).toPromise());
    } else {
      console.log("no url");
      return new Buffer(0);
    }
  }

}
