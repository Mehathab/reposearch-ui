export interface RepoItem {
  name: string;
  id: string;
  url: string;
  full_name: string;
  stargazers_count: string;
  language: string;
  created_at: string;
  description: string;
}
export const getAutoCompleteOptions = (
  items: RepoItem[],
  sizeRestrict = 10
) => {
  const itemsLength = items?.length;
  return (
    items?.slice(0, sizeRestrict >= itemsLength ? itemsLength : sizeRestrict) ||
    []
  );
};
