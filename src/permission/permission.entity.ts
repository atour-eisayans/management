import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'permissions' })
@Index(['category', 'operation'], { unique: true })
export class PermissionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  category: string;

  @Column()
  operation: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
