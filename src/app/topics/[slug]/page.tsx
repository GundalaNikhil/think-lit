"use client";

import React from "react";
import TopicContent from "../../../components/Contents/TopicContent";

interface TopicPageProps {
  params: {
    slug: string;
  };
}

const TopicPage = ({ params }: TopicPageProps) => {
  return <TopicContent slug={params.slug} />;
};

export default TopicPage;
