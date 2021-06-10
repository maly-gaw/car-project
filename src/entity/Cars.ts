import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Cars {

  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column()
  colour!: string;

  @Column()
  engine!: string;

  @Column()
  hp!: number;

  @CreateDateColumn({ select: false })
  created_at!: string;

  @UpdateDateColumn({ select: false, type: "timestamp" })
  updated_at!: string;

}
