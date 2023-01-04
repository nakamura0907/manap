import fetch from "@lib/fetch";

export const removeSuggestion = async (
  projectId: number,
  suggestionId: number
) => {
  await fetch.delete(
    `/projects/${projectId}/feature-suggestions/${suggestionId}`
  );
};
