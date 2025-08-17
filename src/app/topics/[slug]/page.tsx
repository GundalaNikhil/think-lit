import React from "react";
import TopicContent from "../../../components/Contents/TopicContent";

interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  return <TopicContent slug={slug} />;
}
