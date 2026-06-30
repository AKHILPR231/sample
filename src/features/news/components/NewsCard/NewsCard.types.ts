import type { NewsArticle } from "../../types";

export type NewsCardProps = {
  article: NewsArticle;
  onPress: (article: NewsArticle) => void;
};
