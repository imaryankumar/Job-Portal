export const increment = ({count,setCount, totalPage,router }:any) => {
    if (count < totalPage) {
      count < totalPage && setCount(count + 1);
      router.push(`/jobs-posted-by-you?page=${count + 1}`, undefined, {
        shallow: true,
      });
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };