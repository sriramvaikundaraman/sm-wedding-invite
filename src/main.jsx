import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Heart,
  Music2,
  VolumeX,
  Volume2,
  Clock3,
  ChevronDown,
  Images,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import "./style.css";

/*
  PERSONALISE THESE DETAILS BEFORE PUBLISHING.
  Replace the sample date, venue, map link, phone and photo URLs.
*/
const wedding = {
  date: "2026-12-13T08:30:00+05:30", // Change to your wedding date and local time
  dateLabel: "13 December 2026", // Change this display date too
  muhurtham: "8:35 AM – 9:35 AM",
  venue: "Shri Thiru Ilanji Kumarar Kovil",
  address: "Coutrallam road, Ilanji, Tenkasi, Tamil Nadu",
  mapUrl: "https://maps.app.goo.gl/MjYhgMj1WBVTHBEcA",
  hallVenue: "GA Dreams Hall",
  hallAddress: "Kollam - Tenkasi Rd, Piranoor Border, Shekottai, Tamil Nadu",
  hallMapUrl: "https://maps.app.goo.gl/DiGJnuMJjmwW86Nb6",
  reception:
    "Formalities and reception at the wedding hall after the Muhurtham",
  phone: "", // Optional: add phone number with country code, e.g. 919876543210
  photos: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=85",
  ],
};

function Countdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const distance = Math.max(0, new Date(wedding.date).getTime() - now);
  const values = [
    ["Days", Math.floor(distance / 86400000)],
    ["Hours", Math.floor((distance / 3600000) % 24)],
    ["Minutes", Math.floor((distance / 60000) % 60)],
    ["Seconds", Math.floor((distance / 1000) % 60)],
  ];
  return (
    <div className="countdown">
      {values.map(([label, value]) => (
        <div className="count-box" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  const toggleMusic = async () => {
    const audio = document.getElementById("wedding-audio");
    if (!audio) return;
    if (musicOn) {
      audio.pause();
      setMusicOn(false);
    } else {
      try {
        await audio.play();
        setMusicOn(true);
      } catch {
        setMusicOn(false);
        alert(
          "Add your music file as public/wedding-music.mp3, then try again.",
        );
      }
    }
  };

  const calendarUrl = useMemo(() => {
    const start = new Date(wedding.date);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const fmt = (d) =>
      d
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "");
    const title = encodeURIComponent("Wedding of Sriram & MuthuGayathriDevi");
    const details = encodeURIComponent(
      `Muhurtham: ${wedding.muhurtham}. Venue: ${wedding.venue}, ${wedding.address}. Formalities: ${wedding.hallVenue}, ${wedding.hallAddress}`,
    );
    const location = encodeURIComponent(`${wedding.venue}, ${wedding.address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(start)}/${fmt(end)}&details=${details}&location=${location}`;
  }, []);

  return (
    <main>
      <div className="topbar">
        <span className="brand-mark">
          S <i>&</i> M
        </span>
        <span className="topbar-note">A celebration of love</span>
        <button
          className="music-toggle"
          onClick={toggleMusic}
          aria-label="Toggle music"
        >
          {musicOn ? <Volume2 size={17} /> : <VolumeX size={17} />}{" "}
          <span>{musicOn ? "Music on" : "Music off"}</span>
        </button>
      </div>

      <section className="hero" id="home">
        <div className="hero-pattern"></div>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="ornament">✦ &nbsp; ✧ &nbsp; ✦</div>
          <p className="eyebrow">WITH THE BLESSINGS OF OUR FAMILIES</p>
          <p className="tamil-line">அன்பும் ஆசியும் நிறைந்த நன்னாளில்</p>
          <h1>
            Sriram <span>&</span>
            <br />
            MuthuGayathriDevi
          </h1>
          <div className="flourish">
            <span></span>
            <Heart size={16} fill="currentColor" />
            <span></span>
          </div>
          <p className="hero-copy">
            Together with our families, we joyfully invite you
            <br className="desktop-break" /> to be part of our new beginning.
          </p>
          <div className="hero-date">{wedding.dateLabel}</div>
          <button
            className="open-invite"
            onClick={() => {
              setOpened(true);
              document
                .getElementById("invitation")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore the invitation <ChevronDown size={17} />
          </button>
        </motion.div>
        <div className="hero-bottom">
          SCROLL TO DISCOVER <span>↓</span>
        </div>
      </section>

      <AnimatePresence>
        {opened && (
          <motion.div
            className="welcome-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            We can't wait to celebrate with you{" "}
            <Heart size={14} fill="currentColor" />
          </motion.div>
        )}
      </AnimatePresence>

      <section className="invitation section-pad" id="invitation">
        <div className="section-kicker">THE WEDDING INVITATION</div>
        <div className="lotus">❧</div>
        <h2>
          Two hearts, one beautiful
          <br />
          <em>journey.</em>
        </h2>
        <p className="invitation-text">
          With the love and blessings of our parents and elders, we request the
          pleasure of your gracious presence as we begin our life together.
        </p>
        <p className="tamil-quote">
          உங்கள் வருகையும் வாழ்த்துகளும் எங்கள் வாழ்வின் மகிழ்ச்சியை மேலும்
          சிறப்பிக்கும்.
        </p>
        <div className="signature">
          Sriram <span>&</span> MuthuGayathriDevi
        </div>
      </section>

      <section className="date-section section-pad">
        <div className="section-kicker">SAVE THE DATE</div>
        <h2>A day to remember</h2>
        <p className="date-big">{wedding.dateLabel}</p>
        <div className="date-rule"></div>
        <div className="muhurtham">
          <Clock3 size={17} />
          <span>Muhurtham</span>
          <strong>{wedding.muhurtham}</strong>
        </div>
        <Countdown />
        <a
          className="outline-button"
          href={calendarUrl}
          target="_blank"
          rel="noreferrer"
        >
          <CalendarDays size={17} /> Add to calendar
        </a>
      </section>

      <section className="events section-pad">
        <div className="section-kicker">JOIN US</div>
        <h2>Celebration details</h2>
        <div className="event-card">
          <div className="event-icon">
            <Sparkles size={22} />
          </div>
          <p className="event-label">MUHURTHAM</p>
          <h3>Muhurtham</h3>
          <p className="event-date">{wedding.dateLabel}</p>
          <p className="event-time">{wedding.muhurtham}</p>
          <div className="event-divider"></div>
          <h4>{wedding.venue}</h4>
          <p className="event-address">{wedding.address}</p>
          <a
            className="map-link"
            href={wedding.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={16} /> Temple directions <ExternalLink size={13} />
          </a>
        </div>
        <div className="event-card">
          <div className="event-icon">
            <Sparkles size={22} />
          </div>
          <p className="event-label">FORMALITIES</p>
          <h3>Wedding hall</h3>
          <p className="event-date">{wedding.dateLabel}</p>
          <p className="event-time">Following the Muhurtham ceremony</p>
          <div className="event-divider"></div>
          <h4>{wedding.hallVenue}</h4>
          <p className="event-address">{wedding.hallAddress}</p>
          <a
            className="map-link"
            href={wedding.hallMapUrl}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={16} /> Hall directions <ExternalLink size={13} />
          </a>
        </div>
        <p className="event-note">{wedding.reception}</p>
      </section>

      {/* <section className="gallery section-pad">
        <div className="section-kicker">A FEW MOMENTS</div>
        <h2>Our memories</h2>
        <p className="gallery-intro">
          A little glimpse into our journey. Replace these sample photos with
          your favourite moments.
        </p>
        <div className="photo-grid">
          {wedding.photos.map((src, i) => (
            <motion.button
              className={`photo photo-${i + 1}`}
              key={src}
              whileHover={{ scale: 1.025 }}
              onClick={() => setActivePhoto(src)}
              aria-label={`Open photo ${i + 1}`}
            >
              <img
                src={src}
                alt={`Wedding gallery sample ${i + 1}`}
                loading="lazy"
              />
              <span>
                <Images size={16} />
              </span>
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              className="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
            >
              <button aria-label="Close photo">×</button>
              <img src={activePhoto} alt="Selected gallery image" />
            </motion.div>
          )}
        </AnimatePresence>
      </section> */}

      <section className="closing section-pad">
        <div className="closing-ornament">✧</div>
        <h2>
          Your presence is
          <br />
          <em>our present.</em>
        </h2>
        <p>
          We look forward to celebrating this special day with you and your
          family.
        </p>
        <div className="closing-names">
          Sriram <span>&</span> MuthuGayathriDevi
        </div>
        {wedding.phone && (
          <a
            className="outline-button"
            href={`https://wa.me/${wedding.phone}?text=${encodeURIComponent("Congratulations! Looking forward to your wedding.")}`}
          >
            Contact the family
          </a>
        )}
        <div className="blessing">
          அன்புடன் அழைக்கும்
          <br />
          மணமக்கள் மற்றும் குடும்பத்தினர்
        </div>
      </section>
      <footer>
        MADE WITH LOVE <Heart size={12} fill="currentColor" /> S & M
      </footer>
      {/* Optional music: add your licensed instrumental file as public/wedding-music.mp3.
        Browser autoplay is restricted; a visible user gesture is required. */}
      <audio
        id="wedding-audio"
        loop
        src={`${import.meta.env.BASE_URL}wedding-music.mp3`}
      />
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
