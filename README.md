# Scribble Lists ✿

A tiny, doodly list app for groceries, wishlists, to-dos and anything else. It's minimal, cute and hand-drawn, a bit like a notebook page.

**Live:** https://scribble-lists.vercel.app

<p align="center">
  <img src="screenshots/0-desktop.png" alt="Scribble Lists home screen in a phone frame on desktop" width="760">
</p>

## Screenshots

<table>
  <tr>
    <td align="center"><img src="screenshots/1-welcome.png" alt="Welcome screen" width="220"><br><sub>Welcome</sub></td>
    <td align="center"><img src="screenshots/2-name.png" alt="Name step" width="220"><br><sub>What's your name?</sub></td>
    <td align="center"><img src="screenshots/3-kind.png" alt="Choosing a list type" width="220"><br><sub>Pick a list type</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/4-home.png" alt="Home screen with lists grouped by type" width="220"><br><sub>Lists, grouped by type</sub></td>
    <td align="center"><img src="screenshots/5-list.png" alt="A grocery list with groups, scribbled-out items and stickers" width="220"><br><sub>Groups, scribbles &amp; stickers</sub></td>
    <td align="center"><img src="screenshots/6-done.png" alt="Finishing a list with sparkles and a mascot toast" width="220"><br><sub>All done celebration</sub></td>
  </tr>
</table>

## Features

- **Lists by type:** Groceries, Wishlist, To-do or Anything. The home screen groups your lists by type, and you can filter them.
- **Groups inside a list:** for example "Dairy" and "Produce" in a grocery list, or "Birthday" and "Someday" in a wishlist. Tap a name to rename it.
- **Setup steps:** your name, the list's name and its type, then "you're ready".
- **Hand-drawn feel:** wobbly ink doodles with gentle idle animations, handwritten fonts (Gochi Hand and Patrick Hand), and cards taped on like paper scraps.
- **A mochi mascot:** it blinks and sways, hops when you add something, and says something nice when you tap it.
- **Repeating items:** tap the loop icon to repeat an item every day, week, 2 weeks or month, or only on certain days (like Mon · Thu). It unticks itself when it's due again. Only to-do and "anything" lists repeat.
- **Cute sounds:** a paper-scratch when you tick something off, pops, a boing when you poke the mochi and a little chime when a list is done. All made in the browser, and you can mute them from the home screen.
- **An easter egg:** try typing a certain song name 🎵
- **Satisfying tick-offs:** a crayon scribble crosses each item out, with small sparkles. Finishing a list gets a bigger burst and a note from the mascot.
- **Auto stickers:** small line icons appear on items like eggs, meat, ramen, soap, coffee and gifts, and on everyday stuff like workouts, naps, chores, pets, plants, bills… and poop 💩.
- **Reduced motion:** turns the animations off when your device asks for less motion.

- **Installable:** it's a PWA, so you can add it to your home screen and it opens full-screen like a normal app, even offline.

Lists are saved on your device (localStorage), so each device keeps its own lists.

## Install on your phone

- **iPhone (Safari):** open the site, tap **Share**, then **Add to Home Screen**.
- **Android (Chrome):** open the site, tap the **⋮** menu, then **Install app** (or **Add to Home screen**).
- **Desktop (Chrome / Edge):** click the install icon in the address bar.

## Tech

Plain HTML, CSS and JavaScript, with no framework and no build step.

| File | What's in it |
| --- | --- |
| `index.html` | Page shell, fonts and the wobbly-line SVG filter |
| `style.css` | Look, layout and animations |
| `app.js` | Doodles, mascot, screens and saving |
| `manifest.webmanifest`, `sw.js`, `icons/` | Home-screen install and offline support |

## Run locally

Open `index.html` in a browser, or serve the folder with any static server:

```
npx serve .
```

## Deploy

The repo is connected to Vercel, so every push to `main` deploys to https://scribble-lists.vercel.app. Pushes to other branches get their own preview links.
