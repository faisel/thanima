"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LazyImage } from "@/components/ui/LazyImage";

interface Partner {
  image: string;
  alt: string;
  data_ai_hint?: string;
  name: string;
  role: string;
  bio: string;
}

interface PartnerCardProps {
  partner: Partner;
}

export function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <Card className="overflow-hidden shadow-subtle rounded-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="md:flex">
        <div className="md:w-1/3 relative aspect-[3/4] md:aspect-auto">
          <LazyImage
            src={partner.image}
            alt={partner.alt || partner.name}
            layout="fill"
            objectFit="cover"
            className="md:rounded-l-lg md:rounded-r-none"
            data-ai-hint={partner.data_ai_hint}
          />
        </div>
        <div className="md:w-2/3 flex flex-col">
          <CardHeader className="p-6">
            <CardTitle className="text-2xl font-headline font-semibold headline-text">{partner.name}</CardTitle>
            <p className="text-sm text-primary font-medium">{partner.role}</p>
          </CardHeader>
          <CardContent className="p-6 pt-0 flex-grow">
            <p className="text-foreground/80 leading-relaxed">{partner.bio}</p>
            {/* Placeholder for signature graphic if needed */}
            {/* <div className="mt-4 text-right">
              <span className="font-cursive text-xl text-muted-foreground">Signature</span>
            </div> */}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
