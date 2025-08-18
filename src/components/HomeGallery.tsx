import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getGallery } from "@/lib/getGallery";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import icon from "../../public/divider.svg";

// Types for better type safety
interface GalleryItem {
  id?: string;
  content: string;
  category: 'video' | 'image';
  title?: string;
  description?: string;
}

// Skeleton loader for better UX
const GallerySkeleton = () => (
  <div className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-2">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="flex justify-center md:w-[280px] md:h-[200px] w-[100px] h-[80px] p-1">
        <div className="w-full h-full bg-gray-200 rounded-md animate-pulse" />
      </div>
    ))}
  </div>
);

// Video thumbnail component for better performance
const VideoThumbnail = ({ src, title }: { src: string; title?: string }) => {
  // Extract video ID from YouTube URL for thumbnail
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:embed\/|v=|vi=|youtu\.be\/)([^&\n?#]+)/);
    return match?.[1] || null;
  };

  const videoId = getYouTubeId(src);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : '/placeholder-video.jpg';

  return (
    <div className="relative w-full h-full group">
      <Image
        src={thumbnailUrl}
        alt={title || 'Video thumbnail'}
        fill
        className="object-cover rounded-md transition-opacity group-hover:opacity-80"
        sizes="(max-width: 768px) 100px, 280px"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Optimized gallery list component
async function GalleryList({ query }: { query: string }) {
  try {
    // Use caching instead of unstable_noStore for better performance
    const rawData = await getGallery(query);
    const data: GalleryItem[] = rawData.map((item: any) => ({
      ...item,
      category: item.category === "video" ? "video" : "image"
    }));

    if (!Array.isArray(data) || data.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">কোনো গ্যালারী আইটেম পাওয়া যায়নি।</p>
        </div>
      );
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": "গ্যালারী",
      "description": "আমাদের কার্যক্রমের ছবি ও ভিডিও সংগ্রহ",
      "numberOfItems": Math.min(data.length, 8),
      "image": data
        .filter(item => item.category === 'image')
        .slice(0, 3)
        .map(item => item.content)
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div
          className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-2"
          role="grid"
          aria-label="গ্যালারী আইটেম"
        >
          {data.slice(0, 8).map((item, index) => {
            const itemId = item.id || `gallery-item-${index}`;
            const isVideo = item.category === "video";

            return (
              <Dialog key={itemId}>
                <DialogTrigger
                  className="focus:outline-none focus:ring-2 focus:ring-color-main rounded-md transition-all"
                  aria-label={`${isVideo ? 'ভিডিও' : 'ছবি'} দেখুন`}
                >
                  <article
                    className="flex justify-center md:w-[280px] md:h-[200px] w-[100px] h-[80px] p-1 relative overflow-hidden rounded-md"
                    itemScope
                    itemType={isVideo ? "https://schema.org/VideoObject" : "https://schema.org/ImageObject"}
                    role="gridcell"
                  >
                    {isVideo ? (
                      <>
                        <div className="md:flex hidden w-full h-full relative">
                          <VideoThumbnail
                            src={item.content}
                            title={item.title || item.category}
                          />
                        </div>
                        <div className="md:hidden flex w-full h-full">
                          <VideoThumbnail
                            src={item.content}
                            title={item.title || item.category}
                          />
                        </div>
                        <meta itemProp="contentUrl" content={item.content} />
                        <meta itemProp="embedUrl" content={item.content} />
                      </>
                    ) : (
                      <div className="relative w-full h-full">
                        <Image
                          src={item.content}
                          alt={item.title || item.category || `গ্যালারী ছবি ${index + 1}`}
                          fill
                          className="object-cover rounded-md hover:opacity-90 transition-opacity"
                          sizes="(max-width: 768px) 100px, 280px"
                          loading={index < 4 ? "eager" : "lazy"}
                          priority={index < 2}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rsa4ST7Y5mINxTY2zyDL4BpN7IfS1OUw=="
                          itemProp="contentUrl"
                        />
                      </div>
                    )}
                    {item.title && <meta itemProp="name" content={item.title} />}
                    {item.description && <meta itemProp="description" content={item.description} />}
                  </article>
                </DialogTrigger>

                <DialogContent
                  className="max-w-4xl w-full flex justify-center items-center p-4"
                  aria-describedby={`gallery-item-${index}-description`}
                >
                  <div className="relative w-full h-full max-h-[80vh]">
                    {isVideo ? (
                      <div className="w-full h-full min-h-[400px]">
                        <iframe
                          width="100%"
                          height="100%"
                          className="rounded-lg"
                          src={item.content}
                          title={item.title || "YouTube video player"}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <Image
                        src={item.content}
                        alt={item.title || item.category || `গ্যালারী ছবি ${index + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                        sizes="(max-width: 768px) 95vw, 80vw"
                        priority={index < 2}
                      />
                    )}
                  </div>
                  <div id={`gallery-item-${index}-description`} className="sr-only">
                    {isVideo ? 'ভিডিও প্লেয়ার' : 'বড় ছবি'} - {item.title || item.category}
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading gallery:', error);
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">গ্যালারী লোড করতে সমস্যা হয়েছে।</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          পুনরায় চেষ্টা করুন
        </Button>
      </div>
    );
  }
}

// Main gallery component with better structure and SEO
async function HomeGallery({ query }: { query: string }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "name": "গ্যালারী সেকশন",
    "description": "আমাদের কার্যক্রম ও অনুষ্ঠানের ছবি এবং ভিডিও সংগ্রহ",
    "url": typeof window !== 'undefined' ? `${window.location.origin}/gallery` : '/gallery'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section
        id="gallery"
        className="bg-[#FCFCFD]"
        itemScope
        itemType="https://schema.org/WebPageElement"
        aria-labelledby="gallery-heading"
      >
        <div className="p-2 md:mx-20">
          <header className="text-center">
            <h1
              id="gallery-heading"
              className="py-2 text-2xl md:text-4xl font-semibold text-center text-color-main"
              itemProp="headline"
            >
              গ্যালারী
            </h1>
            <div className="flex flex-col items-center justify-center gap-2 py-3" role="presentation">
              <Image
                src={icon}
                alt=""
                width={100}
                height={20}
                className="w-auto h-auto"
                role="presentation"
                aria-hidden="true"
              />
            </div>
          </header>

          <main className="flex flex-col gap-3">
            <div className="rounded-md md:p-1">
              <Suspense fallback={<GallerySkeleton />}>
                <GalleryList query={query} />
              </Suspense>

              <footer className="flex justify-center py-4">
                <Button
                  size="lg"
                  className="text-black bg-white border-2 border-black hover:border-color-sub hover:bg-color-sub hover:text-white transition-all duration-300"
                  asChild
                >
                  <Link
                    href="/gallery"
                    aria-label="সম্পূর্ণ গ্যালারী দেখুন"
                  >
                    আরো দেখুন
                  </Link>
                </Button>
              </footer>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default HomeGallery;