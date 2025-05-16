import { IKVideo } from "imagekitio-next";
import Link from "next/link";
import { IVideo } from "@/models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="rounded-2xl shadow-lg bg-base-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden">
      <Link href={`/videos/${video._id}`} className="block group">
        <div className="relative w-full aspect-[9/16] overflow-hidden">
          <IKVideo
            path={video.videoUrl}
            transformation={[{ height: "1920", width: "1080" }]}
            controls={video.controls}
            className="w-full h-full object-cover group-hover:brightness-95 transition"
          />
        </div>
      </Link>

      <div className="p-4 space-y-2">
        <Link href={`/videos/${video._id}`} className="block">
          <h2 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
            {video.title}
          </h2>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}
