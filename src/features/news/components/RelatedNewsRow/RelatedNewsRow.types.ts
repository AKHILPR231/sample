import type { NewsArticle } from "../../types";

export type RelatedNewsRowProps = {
  article: NewsArticle;
  onPress: (article: NewsArticle) => void;
  last?: boolean;
};
