import { BarLoader } from "react-spinners";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center w-[100vw] h-[100vh]">
      <BarLoader />
    </div>
  );
};

export default Loading;
