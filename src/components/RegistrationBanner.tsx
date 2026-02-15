"use client";

import { useState, useEffect } from "react";
import { X, Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";

const RegistrationBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    const dismissBanner = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;
    {
        return (
            <div className="bg-primary text-primary-foreground py-2 px-4 relative z-[60]">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-sm">
                    <span className="font-semibold text-center md:text-left">
                        Applications open for techKoodaram Build Day!
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm">
                        <span className="flex items-center gap-1">
                            <Calendar size={14} className="text-accent" />
                            Feb 28, 2026
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-accent" />
                            Vaazhai incubation centre, SVCET, Puliyangudi
                        </span>
                    </div>
                    <Link
                        href="https://www.theticket9.com/event/techkoodaram-build-day"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="animate-attention-pulse text-white px-4 py-1.5 rounded-full font-bold transition-all whitespace-nowrap shadow-sm hover:scale-105 active:scale-95"
                    >
                        Apply to Attend
                    </Link>
                    <button
                        onClick={dismissBanner}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Dismiss banner"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>

        );
    }
    return null;
};

export default RegistrationBanner;
