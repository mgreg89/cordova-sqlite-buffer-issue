import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import {Category} from "./Category";
import {Author} from "./Author"

@Entity("Post")
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

  @Column("varying character", {
    nullable: true,
    length: 10000,
    name: "title"
  })
    title: string;

  @Column("blob", {
    nullable: true,
    name: "text"
  })
  image: Buffer;

  
}
