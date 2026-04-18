import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getGallery } from "@/lib/getGallery";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import icon from "../../public/divider.svg";

interface GalleryItem {
  id?: string;
  content: string;
  category: "video" | "image";
  title?: string;
  description?: string;
}

// ─── Skeleton ────────────────────────────────────────────────────────────────
const GallerySkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="aspect-[4/3] w-full rounded-xl bg-gray-100 animate-pulse"
        style={{ animationDelay: `${i * 60}ms` }}
      />
    ))}
  </div>
);

// ─── YouTube thumbnail helper ─────────────────────────────────────────────────
function getYouTubeId(url: string) {
  return url.match(/(?:embed\/|v=|vi=|youtu\.be\/)([^&\n?#]+)/)?.[1] ?? null;
}

const VideoThumbnail = ({ src, title }: { src: string; title?: string }) => {
  const id = getYouTubeId(src);
  const thumb = id
    ? `https://img.youtube.com/vi/${id}/mqdefault.jpg`
    : "/placeholder-video.jpg";

  return (
    <div className="relative w-full h-full group">
      <Image
        src={thumb}
        alt={title ?? "Video thumbnail"}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 280px"
      />
      {/* overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
      {/* play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-11 h-11 bg-red-600 rounded-full flex items-center justify-center
                        shadow-lg scale-90 group-hover:scale-100 transition-transform duration-200">
          <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// ─── Gallery grid ─────────────────────────────────────────────────────────────
async function GalleryList({ query }: { query: string }) {
  let data: GalleryItem[] = [];

  try {
    const raw = await getGallery(query);
    data = raw.map((item: any) => ({
      ...item,
      category: item.category === "video" ? "video" : "image",
    }));
  } catch {
    return (
      <p className="text-center py-8 text-red-500 text-sm">
        গ্যালারী লোড করতে সমস্যা হয়েছে।
      </p>
    );
  }

  if (!data.length) {
    return (
      <p className="text-center py-8 text-gray-500 text-sm">
        কোনো গ্যালারী আইটেম পাওয়া যায়নি।
      </p>
    );
  }

  const visible = data.slice(0, 8);

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"
      role="list"
      aria-label="গ্যালারী"
    >
      {visible.map((item, index) => {
        const key = item.id ?? `gi-${index}`;
        const isVideo = item.category === "video";
        const label = item.title ?? (isVideo ? "ভিডিও" : "ছবি");

        return (
          <Dialog key={key}>
            <DialogTrigger asChild>
              {/* Card */}
              <button
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl
                           ring-1 ring-black/5 shadow-sm
                           hover:shadow-md hover:ring-color-main/40
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-color-main
                           transition-all duration-300"
                aria-label={`${label} দেখুন`}
                role="listitem"
              >
                {isVideo ? (
                  <VideoThumbnail src={item.content} title={item.title} />
                ) : (
                  <>
                    <Image
                      src={item.content}
                      alt={label}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 280px"
                      loading={index < 4 ? "eager" : "lazy"}
                      priority={index < 2}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rsa4ST7Y5mINxTY2zyDL4BpN7IfS1OUw=="
                    />
                    {/* subtle dark gradient on hover for label readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </>
                )}

                {/* index badge */}
                <span className="absolute top-2 left-2 text-[10px] font-semibold
                                 bg-white/80 backdrop-blur-sm text-gray-700
                                 px-1.5 py-0.5 rounded-full leading-none
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {index + 1}
                </span>
              </button>
            </DialogTrigger>

            <DialogContent
              className="max-w-4xl w-full p-3 sm:p-4 bg-white/95 backdrop-blur-md rounded-2xl"
              aria-label={label}
            >
              {isVideo ? (
                <div className="w-full aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    className="rounded-xl"
                    src={item.content}
                    title={item.title ?? "YouTube video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              ) : (
                <Image
                  src={item.content}
                  alt={label}
                  width={1200}
                  height={900}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                  sizes="(max-width: 768px) 95vw, 80vw"
                  priority
                />
              )}
              {item.title && (
                <p className="mt-2 text-center text-sm text-gray-600 font-medium">{item.title}</p>
              )}
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default async function HomeGallery({ query }: { query: string }) {
  return (
    <section
      id="gallery"
      className="bg-[#FCFCFD] py-10 md:py-14"
      aria-labelledby="gallery-heading"
    >
      <div className="px-4 md:px-20 max-w-screen-xl mx-auto">
        {/* heading */}
        <header className="text-center mb-6">
          <h2
            id="gallery-heading"
            className="text-2xl md:text-4xl font-semibold text-color-main"
          >
            গ্যালারী
          </h2>
          <div className="flex justify-center mt-3" aria-hidden="true">
            <Image src={icon} alt="" width={100} height={20} className="w-auto h-auto" />
          </div>
        </header>

        {/* grid */}
        <Suspense fallback={<GallerySkeleton />}>
          <GalleryList query={query} />
        </Suspense>

        {/* CTA */}
        <div className="flex justify-center mt-6">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-gray-900 text-gray-900
                       hover:bg-color-sub hover:border-color-sub hover:text-white
                       transition-all duration-300 rounded-full px-8"
            asChild
          >
            <Link href="/gallery" prefetch={false} aria-label="সম্পূর্ণ গ্যালারী দেখুন">
              আরো দেখুন
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}