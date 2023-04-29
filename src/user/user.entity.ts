import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserStatusEnum } from './enums/user-status.enum';
import { RoleEntity } from 'src/role/role.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true, name: 'instagram_username' })
  instagramUsername: string;

  @Column({ name: 'instagram_password' })
  instagramPassword: string;

  @Column({ nullable: true })
  phone: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ nullable: false, default: UserStatusEnum.active })
  status: UserStatusEnum;

  @Column({ nullable: true })
  image: string;

  @Column({ default: true })
  approved: boolean;

  @ManyToOne(() => RoleEntity, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: RoleEntity;
}
