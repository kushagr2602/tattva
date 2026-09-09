import type { Metadata } from "next";
import { getSiteImages } from "@/lib/catalogue";
import { site, about } from "@/lib/site";
import Photo from "../components/Photo";

export const metadata: Metadata = {
  title: "About — Tattva",
  description: "Tattva is Stories by Manisha — an artist and chef curating silver gifting.",
};

export default function AboutPage() {
  const { aboutPhoto } = getSiteImages();
  return (
    <>
      <section className="page-head on-dark">
        <div className="wrap">
          <p className="eyebrow">{site.owner}</p>
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
              Comes with a handwritten story card from Manisha — a few lines on the piece and
              why it&apos;s the right gift. It&apos;s the part that makes it yours.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
