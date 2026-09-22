# UI kit — Riverside weboldal

The guesthouse's public site. This is the only product surface the brief defines
(no app, no admin tool, no printed collateral was provided — see the caveat in the
root `readme.md`).

Open `index.html`. It is a click-through: header nav and every CTA route between
five screens held in React state.

| File | Screen | Notes |
| --- | --- | --- |
| `Shell.jsx` | Header, Footer, Section | Sticky translucent header, anthracite footer, section rhythm helper |
| `Home.jsx` | Főoldal | 21:9 hero with scrim, booking bar overlapping the hero, intro, room teasers, quote, area strip, CTA band |
| `Rooms.jsx` | Szobák és árak | Filterable horizontal room rows with price rail + "jó tudni" grid |
| `RoomDetail.jsx` | Szobalap | Gallery, tabbed content, sticky price/booking card |
| `Area.jsx` | Környék + kapcsolat | Full-bleed band, activity cards, contact form, map slot |
| `Booking.jsx` | Foglalás | Three steps (Időpont → Adatok → Áttekintés) + confirmation dialog |

All primitives come from the compiled bundle via `window.RVDS`; nothing is
re-implemented locally. Every image is a `<Photo>` placeholder — real photography
is the one missing asset class.
