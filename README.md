# Sriram & MuthuGayathriDevi — Wedding Invitation

A mobile-first React wedding invitation website built with Vite, Framer Motion and Lucide icons. It can be hosted free on GitHub Pages.

## 1. Install and run locally

Install Node.js (LTS) from https://nodejs.org, then open this project folder in a terminal:

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).

## 2. Personalise the invitation

Open `src/main.jsx` and edit the `wedding` object near the top:

- `date`: wedding date/time in ISO format, including `+05:30` for India.
- `dateLabel`: the date shown to visitors.
- `muhurtham`: ceremony time.
- `venue`, `address`, `mapUrl`: venue details and Google Maps link.
- `reception`: reception details.
- `phone`: optional WhatsApp number with country code, digits only.
- `photos`: replace the sample image URLs with your own publicly accessible photo URLs.

You can also change the Tamil and English invitation wording in the JSX below.

### Optional background music

Add a music file that you own or are licensed to use at `public/wedding-music.mp3`.
The music toggle plays and pauses the file after the visitor taps it. Browsers generally block autoplay, so music will not start automatically. Use only music you own or are licensed to use; do not use copyrighted songs without permission.

## 3. Publish using GitHub Pages

1. Create a new repository on GitHub, for example `wedding-invitation`.
2. Upload the contents of this project folder to the repository (the files inside the folder, not the outer folder).
3. On your computer, install Git and Node.js if you have not already.
4. Clone the repository and open a terminal in it:

```bash
git clone https://github.com/YOUR-USERNAME/wedding-invitation.git
cd wedding-invitation
npm install
```

5. Deploy:

```bash
npm run deploy
```

6. In GitHub, open **Repository → Settings → Pages**.
7. Under **Build and deployment**, select **Deploy from a branch**.
8. Select branch **gh-pages** and folder **/(root)**, then Save.
9. Wait a few minutes. Your site will be available at:

`https://YOUR-USERNAME.github.io/wedding-invitation/`

For future updates, edit the files, then run `npm run deploy` again.

## Alternative: GitHub Actions

You can also use GitHub Actions to build and deploy on every push. The simpler `gh-pages` method above is sufficient for this starter project.

## Notes

- The project uses relative asset paths (`base: './'`) so it works under a GitHub Pages project URL.
- The gallery currently uses sample Unsplash photos. Replace them with your own images before sharing.
- Test the published link on an actual phone before sending it to guests.
