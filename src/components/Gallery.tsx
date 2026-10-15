import { useRef, useState } from "react";
const photos = [
  ["photo-1524504388940-b1c1722653e1", "Soft, undone beauty"],
  ["photo-1519699047748-de8e457a634e", "Own your texture"],
  ["photo-1604654894610-df63bc536371", "Polished details"],
  ["photo-1600948836101-f9ffda59d250", "Your beautiful escape"],
];
const source = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;
export function Gallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(photos[0]);
  return (
    <>
      <section id="gallery" className="section wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">Your next look starts here</span>
            <h2>
              The inspiration <em>edit.</em>
            </h2>
          </div>
          <p>
            A moodboard of textures, tones, and finishing touches. Tap a photo
            to take a closer look.
          </p>
        </div>
        <div className="gallery-grid">
          {photos.map((photo) => (
            <button
              key={photo[0]}
              className="gallery-item"
              aria-label={`Enlarge ${photo[1]}`}
              onClick={() => {
                setSelected(photo);
                dialog.current?.showModal();
              }}
            >
              <img loading="lazy" src={source(photo[0])} alt={photo[1]} />
              <span>{photo[1]}</span>
            </button>
          ))}
        </div>
        <p className="fineprint">
          Editorial inspiration imagery, not a portfolio of client results.
        </p>
      </section>
      <dialog
        ref={dialog}
        aria-label={selected[1]}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          autoFocus
          aria-label="Close photo"
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
        <img src={source(selected[0])} alt={selected[1]} />
      </dialog>
    </>
  );
}
