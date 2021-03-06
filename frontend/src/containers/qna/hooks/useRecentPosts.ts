import { useCallback, useEffect, useState } from "react";
import { getRecentPosts, QnaPost } from "../../../lib/api/qna";
import useScrollPagination from "../../../lib/hooks/useScrollPagination";

export default function useRecentPosts() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData] = useState<{
    totalPage: number;
    posts: QnaPost[];
  } | null>(null);

  const onLoadMore = useCallback(async () => {
    if (loading) {
      return;
    }
    if (data?.totalPage && data.totalPage === page) {
      return;
    }
    setLoading(true);
    const { totalPage, posts } = await getRecentPosts(page + 1);
    setData((data) => {
      if (!data) {
        return {
          totalPage,
          posts,
        };
      }
      return {
        totalPage,
        posts: [...data?.posts, ...posts],
      };
    });
    setPage((page) => page + 1);
    setLoading(false);
  }, [loading, setLoading, page, setPage, setData, data]);

  /* eslint-disable react-hooks/exhaustive-deps */
  // 첫 페이지는 스크롤 이벤트 없이 onLoadMore 함수 호출
  useEffect(() => {
    onLoadMore();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const cursor = data?.posts[data?.posts.length - 1]?.id;

  useScrollPagination({
    cursor,
    onLoadMore,
  });

  return { data, loading };
}
