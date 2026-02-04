# Migration Plan: Static HTML to Next.js + Framer Motion

## 1. Project Initialization
- Initialize a new Next.js project using `create-next-app`.
- **Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS (recommended for styling, replacing Bootstrap where possible, or keeping Bootstrap if preferred).
- **Dependencies**: `framer-motion`, `sass` (if needed for existing CSS), `react-use` (for utilities).

## 2. Asset Migration
- Move `images/`, `fonts/`, `leduong.mp3` to `public/` directory.
- Convert `css/` files to global CSS or CSS Modules.
    - *Optimization*: Replace `bootstrap.min.css` with Tailwind CSS classes where easy, or import it in `layout.tsx` for quick migration.
- **Images**: Replace `<img>` tags with `next/image` components for automatic optimization (lazy loading, resizing).

## 3. Component Architecture
Break down the monolithic `index.html` into reusable React components:

- **Layout**:
  - `app/layout.tsx`: Includes Meta tags, Google Fonts (`next/font`), Global Styles.
- **Components** (`components/`):
  - `OpeningCard.tsx`: The envelope/opening animation (Critical for "wow" factor).
  - `Hero.tsx`: Main banner with "Save our date".
  - `Couple.tsx`: Groom & Bride introduction.
  - `Family.tsx`: Parents' info.
  - `Events.tsx`: Wedding ceremony details (Time/Location).
  - `Gallery.tsx`: Photo grid (Replace jQuery Masonry with a React alternative or CSS Grid).
  - `GuestBook.tsx`: Wishes/Comments form.
  - `GiftRegistry.tsx` (BankInfo): QR Code modals.
  - `RSVP.tsx`: Attendance form.
  - `MusicPlayer.tsx`: Floating music control.

## 4. Animation Strategy (Framer Motion)
Replace `wow.js` and `animate.css` with `framer-motion`.

- **Scroll Animations**: Use `<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>`.
- **Opening Effect**: Recreate the "Opening Sides" animation using Framer Motion's `layoutId` or variants for a smoother, JavaScript-controlled sequence.
- **Interactivity**: Add hover effects to buttons and images.

## 5. Logic Modernization
- **Countdown**: Convert `countdown.js` to a React Hook (`useCountdown`).
- **Music Player**: Implement persistent audio state using `useRef` and `useEffect`.
- **Forms**:
  - Convert `guest-personalizer.js` to logic inside `page.tsx` (reading search params).
  - Rewrite RSVP and Comment forms to use `useState` and `fetch` for submissions (replacing `google-sheets-form.js`).

## 6. Optimization & SEO
- **SEO**: Define `metadata` object in `page.tsx` for Open Graph tags.
- **Performance**:
  - Remove jQuery and heavy plugins (`wow.js`, `masonry.pkgd.min.js`).
  - Lazy load heavy components (like the Gallery).

## 7. Execution Timeline
1.  **Setup**: Init project & copy assets.
2.  **Structure**: Create basic components (static).
3.  **Logic**: Wire up Countdown, Music, Forms.
4.  **Styling**: Port CSS, ensure responsiveness.
5.  **Animation**: Apply Framer Motion.
6.  **Refine**: Test & Optimize.
