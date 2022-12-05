/**
 * ArticleDto
 */
export interface ArticleDto {
  content?:      null | string;
  creationTime?: Date;
  id?:           number;
  modifiedTime?: Date | null;
  summary?:      null | string;
  title?:        null | string;
}

