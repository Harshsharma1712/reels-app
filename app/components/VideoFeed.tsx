import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  return (
    <div className="p-4">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {videos.map((video) => (
          <VideoComponent key={video._id?.toString()} video={video} />
        ))}
      </div>

      {videos.length === 0 && (
        <div className="flex items-center justify-center text-center py-16">
          <p className="text-muted-foreground text-base">
            No videos found. Try uploading one!
          </p>
        </div>
      )}
    </div>
  );
}
