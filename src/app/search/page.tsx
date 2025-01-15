import PostList from "@/components/posts/post-list";
import { fetchPostsBySearchTerm } from "@/db/queries/posts";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: Promise<{ term: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = await searchParams;

  if (!term) {
    redirect("/");
  }

  return (
    <div>
      <PostList fetchData={fetchPostsBySearchTerm.bind(null, term)} />
    </div>
  );
}
