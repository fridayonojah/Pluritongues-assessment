# Pluritongues Backend Assessment Submission

This repository contains my solution for the **Pluritongues backend assessment**, implementing a **NestJS API** with **TypeORM (PostgreSQL)**. The project includes database schema design, and basic API implementation.

## Database Choice

### PostgreSQL

PostgreSQL was selected as the database for this project due to the following reasons:

- **Data Relationships**: The interfaces suggest complex relationships (Levels to Lessons and Lessons to Activities). PostgreSQL excels in managing relational data with foreign keys, which help maintain referential integrity.
- **Query Patterns**: Given the need to fetch lessons by levels and activities by lessons, PostgreSQL's capabilities in performing complex queries efficiently through joins will be beneficial.
- **Scalability**: PostgreSQL has strong scalability features and can handle large datasets with proper indexing and partitioning.
- **Data Integrity**: ACID compliance provides reliability, ensuring that transactions, like modifying lesson statuses, remain consistent.

## Schema Implementation with TypeORM

We implemented TypeORM entities that define database structure with relationships, indexing, and constraints.

- Level Entity

```typescript
@Entity()
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Lesson, (lesson) => lesson.level)
  lessons: Lesson[];
}
```

- Lesson Entity

```typescript
@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Level, (level) => level.lessons, { onDelete: 'CASCADE' })
  level: Level;
}-
```

- UserLessonProgress Entity

```typescript @Entity()
export class UserLessonProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @ManyToOne(() => Lesson)
  lesson: Lesson;

  @Column({ default: 0 })
  progress: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdated: Date;

  @VersionColumn()
  version: number; // Prevents overwrites from concurrent updates
}
```

### Some Optimizations I considered:

- Indexes on userId, lessonId for faster lookups.
- @VersionColumn() to prevent overwrites in concurrent updates.
- Cascade deletion for automatic cleanup when a level is removed.

## Data Model Improvements

Some Potential Issues in the Original Interfaces:

- I noticed inconsistency in Language Representation
  The language property in the Level interface is limited to 'Igbo' | 'Yoruba'. if we plan to add more languages in the future we will have to come back to the code base to edit the union type to fit in

- Redundant id Properties
  In the given interface they are some propertices that are common accross other interfaces. we can seperate this common propertices into seperate base interface and allow other interfaces that needs them to just extend to it.

- Enum for activityType
  The activityType property appears to have a limited set of values. Where appropriate, using an enum for these could increase type safety and readability:

- I created a suggested Revised Interfaces inside the src/docs directory to better explain some changes I would make to the provided interfaces.

#### Scalability Concerns:

- Solution: Index frequently used columns (userId, lessonId) for faster queries.
- Solution: Use caching for read-heavy queries (e.g., Redis for quick lesson lookups).

## Handling Large Datasets

If we're expecting millions of users, we can consider the some optimizations steps:

- **Monitoring & Profiling**: Regularly analyze query performance and adjust indexing based on the queries that are frequently used.
- **Caching**: Implement caching for frequently accessed data using Redis or similar to reduce database load.
- **Partitioning**: Use table partitioning based on levels or lesson completion status for faster access to subsets of data.
- Load Balancing: Implement read replicas to distribute read load.

### Is PostgreSQL still optimal?

Yes, PostgreSQL can still handle such scalability with proper optimizations. If absolute horizontal scalability is necessary, consider sharding or exploring cloud solutions with Postgres options.

## Migration Strategy

If the project was intially built with MongoDB. Migrating from it to PostgreSQL will have challenges, such as:

- **Data Model Differences**: Due to the schema-less nature of MongoDB there would be a need to move from the MongoDB's schema-less nature to a PostgreSQL's rigid structure.
- **Query Rewrite**: Queries written for MongoDB will need to be restructured for SQL.

### Step-by-Step Migration Strategy:

- **Data Mapping**: Map MongoDB data structure to PostgreSQL schema.
- **Export Data**: Write scripts to export data from MongoDB in a format compatible with PostgreSQL (e.g., JSON or CSV).
- **Transform Data**: Use a transformation layer to convert the data model.
- **Import Data**: Load the transformed data into PostgreSQL using Bulk Import.
- **Test**: Verify data integrity and application functionality post-migration.
- **Update Application Logic**: Update API calls and data access logic to query the new PostgreSQL database.

## API Structure with NestJS

To expose project data efficiently using NestJS, we can structure our API services as follows:

- **DTOs(Data Transfer Objects)**: We implement DTOs to define the shape of the data that is transferred between the client and the server. This helps protect against unwanted data from being processed and ensures that only the necessary fields are sent in the requests and responses.

```typescript
Example;
import { IsString, IsEnum, IsOptional, IsInt } from 'class-validator';

export class CreateLevelDto {
  @IsString()
  icon: string;

  @IsString()
  image: string;

  @IsString()
  level: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(['Igbo', 'Yoruba'])
  language: 'Igbo' | 'Yoruba';

  @IsInt()
  @IsOptional()
  completedLessons?: number;

  @IsInt()
  totalLessons: number;
}

export class UpdateLevelDto {
  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
```

- **Service Layer**: We maintain the service layer to encapsulate the business logic and facilitate interaction with the database through models managed by TypeORM.
- **Controller Layer**: Controllers manage incoming requests and responses, utilizing the DTOs to validate and transform data before interacting with the service layer.

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { LevelService } from './level.service';
import { CreateLevelDto, UpdateLevelDto } from './dto/level.dto';
import { Level } from './level.entity';

@Controller('levels')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}
  // Create a new level
  @Post()
  async create(@Body() createLevelDto: CreateLevelDto): Promise<Level> {
    return this.levelService.create(createLevelDto);
  }

  // Update an existing level
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLevelDto: UpdateLevelDto,
  ): Promise<Level> {
    return this.levelService.update(id, updateLevelDto);
  }
}
```

### Handling Concurrent Updates (Multiple Users on the Same Lesson)

When multiple users (or sessions) update lesson progress simultaneously, we need to prevent conflicts and ensure data consistency.
A common issue is race conditions, where one update overwrites another's changes.

To handle this, I would implement Optimistic Concurrency Control (OCC) using a versioning system:

- **Versioning Mechanism**: Each UserLessonProgress record includes a version field (version or updatedAt timestamp) that tracks modifications.
- **Update Process: User fetches progress**: When a user retrieves their lesson progress, the API also sends the current version number.
- **User modifies progress**: The user makes changes and submits an update request.

### Version Check Before Update:

The API checks if the stored version number in the database matches the version number the user initially retrieved.
If they match, the update proceeds, and the version number is incremented.
If they don’t match, another update has occurred in the meantime, causing a conflict. The API rejects the update and asks the user to refresh their data.
