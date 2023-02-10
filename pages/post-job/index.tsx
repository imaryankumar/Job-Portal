import dynamic from "next/dynamic";
const PostJob = dynamic(()=>import("../../components/PostJob"),{ssr:false});

const Index = () => {


  return (
     <PostJob/>
  );
};

export default Index;
