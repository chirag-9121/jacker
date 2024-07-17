import { LoadingSpinner } from "./components/ui/spinner";

function Loading() {
  return (
    <div className="absolute flex h-91v w-full items-center justify-center bg-lightbackground dark:bg-darkbackground">
      <LoadingSpinner />
    </div>
  );
}

export default Loading;
