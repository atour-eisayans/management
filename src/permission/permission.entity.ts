import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoriesEnum, OperationsEnum } from './enums/permissions.enum';

@Entity({ name: 'permissions' })
@Index(['category', 'operation'], { unique: true })
export class PermissionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ enum: CategoriesEnum })
  category: CategoriesEnum;

  @Column({ enum: OperationsEnum })
  operation: OperationsEnum;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
