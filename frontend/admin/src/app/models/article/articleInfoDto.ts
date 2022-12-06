/**
 * ArticleInfoDto
 */
export interface ArticleInfoDto {
  id: number;
  title: string;
  summary?: string;
  creationTime: Date;
  modifiedTime?: Date;
}

