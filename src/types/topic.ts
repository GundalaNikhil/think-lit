export interface RichTextNode {
  type: string;
  children?: Array<{ text?: string }>;
  level?: number;
  format?: string;
}

export interface TopicImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    small?: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    medium?: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    large?: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      width: number;
      height: number;
      size: number;
      url: string;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CodeExample {
  __component: "shared.code-example";
  id: number;
  code: string;
}

export interface Quiz {
  __component: "shared.quiz";
  id: number;
  question: string;
  correct_answer: string;
  explanation?: string;
  options: string[];
}

export interface AnimationBlock {
  __component: "shared.animation-block";
  id: number;
  animation_code: string;
}

export type AdditionalContent = CodeExample | Quiz | AnimationBlock;

export interface Topic {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  slug: string;
  introduction: RichTextNode[];
  description: RichTextNode[];
  tags: string;
  difficulty_level: string;
  premium: boolean | null;
  created: string;
  updated: string;
  image: TopicImage[];
  additional_content: AdditionalContent[];
}

export interface TopicsResponse {
  data: Topic[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
