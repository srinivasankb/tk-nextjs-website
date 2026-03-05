"use client";

import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const sliderImages = [
    { src: "/images/build-day-one/group-photo.webp", alt: "Community Group Photo" },
    { src: "/images/build-day-one/idea-disucssion.webp", alt: "Idea Discussion" },
    { src: "/images/build-day-one/presentaion-time.webp", alt: "Presentation Time" },
    { src: "/images/build-day-one/feedback-giving.webp", alt: "Feedback Session" },
    { src: "/images/build-day-one/lunch-time.webp", alt: "Lunch Time" },
    { src: "/images/build-day-one/serious-builders.webp", alt: "Serious Builders" },
];

export const BuildDaySlider = () => {
    return (
        <div className="my-16 flex justify-center">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-3xl"
            >
                <CarouselContent>
                    {sliderImages.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg border border-border/50">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md p-4 text-white text-center text-sm font-medium">
                                    {image.alt}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12" />
                <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>
        </div>
    );
};
