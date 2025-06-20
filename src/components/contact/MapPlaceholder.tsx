import { LazyImage } from '@/components/ui/LazyImage';

interface MapPlaceholderProps {
  lat: number;
  lng: number;
  zoom: number;
  altText: string;
}

export function MapPlaceholder({ lat, lng, zoom, altText }: MapPlaceholderProps) {
  // In a real scenario with an API key, you might construct a static map URL:
  // const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=600x400&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=YOUR_API_KEY`;
  // For now, using placehold.co
  const placeholderMapUrl = `https://placehold.co/600x400.png`;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg shadow-subtle border">
      <LazyImage
        src={placeholderMapUrl}
        alt={altText}
        width={600}
        height={400}
        layout="responsive" // Use responsive for aspect ratio defined by parent
        objectFit="cover"
        className="w-full h-full"
        data-ai-hint="city map"
      />
    </div>
  );
}
