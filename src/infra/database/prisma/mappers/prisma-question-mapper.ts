import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';
import { Question as PrismaQuestion } from '@prisma/client';

export class PrismaQuestionMapper {
    static toDomain(raw: PrismaQuestion): Question {
        return Question.create({
          authorId: new UniqueEntityID(raw.authorId),
          content: raw.content,
          title: raw.title,
          bestAnswerId: undefined,
          createdAt: raw.createdAt,
          slug: Slug.create(raw.slug),
          updatedAt: raw.updatedAt,
        }, new UniqueEntityID(raw.id));
    }
}