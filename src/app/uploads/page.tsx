import UploadImages from "@/src/components/upload-images";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UploadsPage() {
  return (
    <div className="max-w-[1440px] w-full p-0 pt-5 sm:p-10 flex  flex-col ">
      <div className="flex w-full flex-col max-w-2xl pb-5! gap-2">
        <Link
          href={"/"}
          className="text-primary-02! gap-1 text-sm flex items-center underline! w-fit p-0! group"
        >
          <ArrowLeft
            size={14}
            className="text-secondary! transition-all group-hover:-translate-x-1 ease-in-out"
          />
          Go back to the classifier
        </Link>
      </div>
      <UploadImages />
    </div>
  );
}
