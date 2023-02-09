import dynamic from "next/dynamic";
const AppliedJobPage = dynamic(()=>import("../../components/AppliedJobPage"),{ssr:false});


const Index = () => {
 return <AppliedJobPage/>
};

export default Index;
