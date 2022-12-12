/**
 * ArticleDto
 */
export interface ArticleDto {
  id: number;
  title: string;
  summary?: string;
  content?: string;
  creationTime: Date;
  modifiedTime?: Date;
}

