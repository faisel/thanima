"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LazyImage } from "@/components/ui/LazyImage";
import Link from "next/link"; // Assuming products might link somewhere

interface Product {
  image: string;
  alt: string;
  data_ai_hint?: string;
  name: string;
  caption: string;
}

interface ProductShowcaseProps {
  products: Product[];
}

export function ProductShowcase({ products }: ProductShowcaseProps) {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container-max-width">
        {/* Optional: Add a section title here if needed based on design */}
        {/* <h2 className="text-3xl font-headline font-semibold text-center mb-10 headline-text">
          Unsere Highlights
        </h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" 
             style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {products.map((product, index) => (
            <Card key={index} className="group overflow-hidden shadow-subtle rounded-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
              <CardContent className="p-0 aspect-[3/4] relative"> {/* Changed aspect ratio to 3:4 as specified in partner cards, seems more appropriate for fashion */}
                <LazyImage
                  src={product.image}
                  alt={product.alt || product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transform transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={product.data_ai_hint}
                />
              </CardContent>
              <CardHeader className="p-4 flex-grow">
                <CardTitle className="text-lg font-semibold headline-text">{product.name}</CardTitle>
              </CardHeader>
              <CardFooter className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">{product.caption}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
