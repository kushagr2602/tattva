import type { Metadata } from "next";
import { getSiteImages } from "@/lib/catalogue";
import { site, about } from "@/lib/site";
import Photo from "../components/Photo";

export const metadata: Metadata = {
  title: "About | Tattva",
  description: "Tattva is run by Manisha, an artist and chef who makes silver gifts.",
};

export default function AboutPage() {
  const { aboutPhoto } = getSiteImages();
  return (
    <>
      <section className="page-head on-dark">
        <div className="wrap">
          <p className="eyebrow">Meet Manisha</p>
          <h1>{about.heading}</h1>
        </div>
      </section>

      <section className="wrap about reveal">
        <div className="about-portrait engraved" aria-hidden>
          <Photo src={aboutPhoto} alt={site.owner} fill
            fallback={<span className="portrait-monogram">M</span>} />
        </div>
        <div className="about-copy">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="about-para">{p}</p>
          ))}
          {about.chefStudio.url && (
            <a href={about.chefStudio.url} target="_blank" rel="noopener" className="about-link">
              Visit {about.chefStudio.name} →
            </a>
          )}
          <div className="story-card">
            <span className="story-card-mark">Every package</span>
            <p>
              Comes with a handwritten note from Manisha: a few lines on the piece and why she
              picked it for the occasion.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
