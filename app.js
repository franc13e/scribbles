(() => {
  'use strict';

  // ---------- doodles ----------
  // class names (tw, wig, bob, beat, float, look, zap) add little idle animations, see style.css

  const S = 'fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"';
  const svg = (body, vb = '0 0 220 170') =>
    `<svg class="doodle" viewBox="${vb}" aria-hidden="true">${body}</svg>`;

  const DOODLES = {
    grocery: svg(`
      <g ${S}>
        <g class="wig">
          <path d="M18 80 Q58 166 142 108 Z"/>
          <path d="M31 90 Q64 146 128 108"/>
        </g>
        <path d="M112 56 C124 16 186 12 202 56 Z"/>
        <path d="M122 50 C136 28 178 24 192 50"/>
        <path class="float" d="M32 38 c-4 0 -6 4 -3 6 c4 2 9 -2 7 -7 c-2 -6 -11 -6 -14 1 c-3 8 4 15 12 13"/>
        <path d="M166 126 c12 4 6 22 -6 14 s2 -18 14 -8"/>
        <path class="tw" d="M84 26 l9 9 M93 26 l-9 9"/>
        <path class="tw d1" d="M66 54 l6 6 M72 54 l-6 6"/>
        <path class="tw d2" d="M188 92 l8 8 M196 92 l-8 8"/>
      </g>
      <g fill="currentColor">
        <g class="wig">
          <ellipse cx="52" cy="104" rx="3" ry="5" transform="rotate(-35 52 104)"/>
          <ellipse cx="72" cy="118" rx="3" ry="5" transform="rotate(-20 72 118)"/>
          <ellipse cx="94" cy="122" rx="3" ry="5" transform="rotate(10 94 122)"/>
          <ellipse cx="66" cy="96" rx="3" ry="5" transform="rotate(-25 66 96)"/>
          <ellipse cx="88" cy="104" rx="3" ry="5"/>
        </g>
        <circle cx="140" cy="44" r="3"/><circle cx="158" cy="38" r="3.5"/><circle cx="176" cy="44" r="3"/>
        <circle class="tw d1" cx="12" cy="120" r="4"/><circle cx="110" cy="20" r="3"/><circle class="tw" cx="150" cy="80" r="3.5"/>
        <circle cx="206" cy="128" r="3"/><circle class="tw d2" cx="44" cy="22" r="2.5"/>
      </g>`),

    wish: svg(`
      <g ${S}>
        <rect x="64" y="76" width="92" height="72" rx="6"/>
        <path d="M110 78 V148"/>
        <path class="bob" d="M110 58 C92 26 66 36 78 52 C86 62 104 60 110 58 C116 60 134 62 142 52 C154 36 128 26 110 58"/>
        <path class="tw" d="M30 34 v18 M21 43 h18"/>
        <path class="tw d1" d="M186 30 v12 M180 36 h12"/>
        <path d="M34 104 l-14 -4 M36 120 l-16 4 M40 88 l-10 -10"/>
        <path d="M186 74 l14 -6 M184 58 l10 -10"/>
        <path class="tw d2" d="M82 96 l10 10 M92 96 l-10 10"/>
        <path d="M136 118 c-3 0 -5 3 -2 5 c3 2 7 -1 5 -5 c-2 -5 -9 -5 -11 1 c-2 6 3 11 9 10"/>
      </g>
      <g fill="currentColor">
        <rect x="56" y="58" width="108" height="22" rx="5"/>
        <path class="beat" d="M182 112 c-6 -10 -21 -4 -13 8 l13 13 l13 -13 c8 -12 -7 -18 -13 -8z"/>
        <circle cx="54" cy="20" r="3"/><circle class="tw" cx="168" cy="16" r="3.5"/><circle cx="200" cy="96" r="3"/>
        <circle class="tw d1" cx="26" cy="146" r="3.5"/><circle cx="196" cy="150" r="3"/>
      </g>`),

    todo: svg(`
      <g ${S}>
        <path class="zap" d="M74 32 L36 98 L70 92 L52 150 L112 76 L76 82 L102 32 Z"/>
        <rect x="134" y="34" width="20" height="20" rx="3"/>
        <rect x="134" y="72" width="20" height="20" rx="3"/>
        <rect x="134" y="110" width="20" height="20" rx="3"/>
        <path d="M138 44 l5 6 l12 -16"/>
        <path d="M138 82 l5 6 l12 -16"/>
        <path d="M164 44 h36 M164 82 h28 M164 120 h32"/>
        <path class="tw" d="M22 70 l-12 -4 M20 90 l-14 6 M26 112 l-12 12"/>
        <path class="tw d1" d="M118 42 l12 -8"/>
      </g>
      <g fill="currentColor">
        <circle class="tw d2" cx="30" cy="34" r="3"/><circle cx="112" cy="130" r="3.5"/><circle class="tw" cx="96" cy="150" r="2.5"/>
        <circle cx="16" cy="140" r="3"/><circle class="tw d1" cx="122" cy="104" r="2.5"/>
      </g>`),

    other: svg(`
      <g ${S}>
        <g class="wig">
          <path d="M62 22 L82 42 L62 62 L42 42 Z"/>
          <circle cx="62" cy="80" r="13"/>
          <path d="M62 98 L86 146 L38 146 Z"/>
        </g>
        <circle cx="154" cy="46" r="20"/>
        <circle class="look" cx="154" cy="46" r="7"/>
        <path class="float" d="M104 96 c16 -22 34 8 50 -10 s24 18 36 -2"/>
        <path class="tw" d="M118 128 l14 -8 M150 132 l6 12 M178 120 l14 6"/>
      </g>
      <g fill="currentColor">
        <path class="tw d1" d="M100 30 l14 4 l-10 10 z"/>
        <path class="tw d2" d="M184 140 l12 -2 l-4 12 z"/>
        <path d="M22 96 l10 -6 l2 12 z"/>
        <circle cx="120" cy="60" r="3"/><circle class="tw" cx="200" cy="70" r="3.5"/><circle cx="26" cy="20" r="3"/>
        <circle cx="104" cy="150" r="3"/><circle class="tw d1" cx="194" cy="24" r="2.5"/>
      </g>`),

    welcome: svg(`
      <g fill="currentColor">
        <path d="M58 156 C30 120 36 56 86 46 C134 38 152 86 144 156 L128 156 C134 116 128 84 112 76 C98 94 80 100 72 102 C68 124 76 144 82 156 Z"/>
        <circle class="tw" cx="22" cy="40" r="3"/><circle cx="196" cy="140" r="3"/><circle class="tw d2" cx="178" cy="22" r="3.5"/>
      </g>
      <g ${S}>
        <path d="M74 100 C74 132 96 148 112 142 C128 134 132 106 124 80"/>
        <path d="M88 114 q5 4 10 0"/>
        <path d="M110 112 q5 4 10 0"/>
        <path d="M100 130 q6 3 12 0"/>
        <path class="float" d="M30 20 c-10 0 -12 14 -2 16 c-6 10 10 18 16 8 c10 6 20 -6 12 -14 c4 -10 -10 -16 -16 -8 c-2 -4 -6 -4 -10 -2"/>
        <path class="float" d="M166 104 c-8 -2 -12 10 -4 14 c-2 8 10 12 14 4 c8 2 12 -8 6 -12 c2 -8 -8 -12 -12 -6"/>
        <path class="bob" d="M150 26 h42 a10 10 0 0 1 10 10 v22 a10 10 0 0 1 -10 10 h-24 l-12 12 l2 -12 h-8 a10 10 0 0 1 -10 -10 v-22 a10 10 0 0 1 10 -10 z"/>
        <path class="tw" d="M56 22 l8 8 M64 22 l-8 8"/>
        <path class="tw d1" d="M116 22 l8 8 M124 22 l-8 8"/>
        <path class="tw" d="M20 96 l7 7 M27 96 l-7 7"/>
      </g>
      <text class="bob" x="171" y="56" text-anchor="middle" font-family="Gochi Hand, cursive" font-size="24" fill="currentColor">hi!</text>`),

    ready: svg(`
      <g ${S}>
        <g class="bob">
          <path d="M62 84 L128 72 L150 92 L150 140 L84 152 L62 132 Z"/>
          <path d="M62 84 L84 104 L150 92 M84 104 V152"/>
          <path d="M100 118 v8 M126 114 v8"/>
          <path d="M102 136 q12 6 24 -2"/>
          <path d="M94 76 c-2 -18 22 -22 26 -4"/>
        </g>
        <path class="wig" d="M150 38 c16 -14 40 0 30 24 c-8 18 -30 16 -34 4"/>
        <path d="M160 30 c-2 -10 6 -14 10 -8"/>
      </g>
      <g fill="currentColor">
        <path d="M168 44 c6 0 10 6 6 12 c-4 4 -12 2 -12 -4 z"/>
      </g>
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
        <path class="tw" d="M30 40 l10 4 M24 62 l12 -2 M40 22 l4 10 M20 92 l14 2 M30 118 l12 -6 M26 146 l10 -8"/>
        <path class="tw d1" d="M60 30 l6 8 M80 20 l2 10 M110 26 l-2 12 M130 40 l-6 8"/>
        <path class="tw d2" d="M170 104 l12 4 M168 124 l14 0 M164 146 l10 8 M196 92 l10 -4 M192 116 l14 6"/>
        <path d="M120 160 l12 2 M54 162 l-10 2 M200 150 l8 6"/>
      </g>`),

    sync: svg(`
      <g ${S}>
        <path d="M40 45 C55 43 68 44 79 44 Q88 44 88 54 C89 80 87 108 88 130 Q88 140 78 140 C64 141 52 139 40 140 Q30 140 30 130 C29 104 31 78 30 55 Q30 45 40 45 Z"/>
        <path d="M52 128 q7 1 14 0"/>
        <path d="M138 57 C156 55 172 57 186 56 Q196 56 196 66 C197 88 195 110 196 130 Q196 140 186 140 C170 141 154 139 138 140 Q128 140 128 130 C127 108 129 86 128 66 Q128 57 138 57 Z"/>
        <path d="M152 128 q10 1 20 0"/>
        <g class="bob">
          <path d="M98 70 C112 54 120 54 132 64"/>
          <path d="M124 56 l9 8 l-11 4"/>
        </g>
        <g class="bob" style="animation-delay:-1.2s">
          <path d="M132 112 C118 128 108 128 96 118"/>
          <path d="M104 126 l-9 -8 l11 -4"/>
        </g>
        <path d="M48 76 q11 -1 22 0 M48 90 q8 1 16 0 M146 84 q16 -1 32 0 M146 98 q12 1 24 0"/>
        <path class="tw" d="M100 22 l8 8 M108 22 l-8 8"/>
        <path class="tw d1" d="M196 30 v14 M189 37 h14"/>
      </g>
      <g fill="currentColor">
        <path class="beat" d="M112 92 c-4 -7 -14 -3 -9 5 l9 9 l9 -9 c5 -8 -5 -12 -9 -5z"/>
        <circle class="tw d2" cx="18" cy="30" r="3"/><circle cx="206" cy="150" r="3"/><circle cx="20" cy="156" r="2.5"/>
      </g>`),

    recipe: svg(`
      <g ${S}>
        <path d="M52 95 C90 93 130 96 168 94 C169 104 168 113 168 122 C168 140 156 150 140 150 C120 151 100 149 80 150 C64 150 52 140 52 122 C52 113 51 104 52 95 Z"/>
        <path d="M42 95 C90 92 132 96 178 93"/>
        <path d="M52 106 q-8 1 -16 0 M168 106 q8 -1 16 0"/>
        <path d="M94 82 c0 -8 32 -8 32 0"/>
        <g class="float">
          <path d="M80 70 c-8 -10 8 -16 0 -28"/>
          <path d="M110 64 c-8 -10 8 -16 0 -28"/>
          <path d="M140 70 c-8 -10 8 -16 0 -28"/>
        </g>
        <path class="tw" d="M28 44 l8 8 M36 44 l-8 8"/>
        <path class="tw d1" d="M188 40 v14 M181 47 h14"/>
        <path d="M74 122 q36 10 72 0"/>
      </g>
      <g fill="currentColor">
        <path class="beat" d="M194 128 c-5 -8 -17 -3 -10 6 l10 10 l10 -10 c7 -9 -5 -14 -10 -6z"/>
        <circle cx="22" cy="132" r="3"/><circle class="tw d2" cx="62" cy="30" r="3"/><circle cx="160" cy="24" r="2.5"/>
        <circle class="tw" cx="200" cy="80" r="3"/>
      </g>`),

    note: svg(`
      <g ${S}>
        <path d="M66 29 C94 27 122 29 148 28 Q156 28 156 37 C157 72 155 108 156 143 Q156 152 147 152 C118 153 92 151 66 152 Q58 152 58 144 C57 108 59 72 58 37 Q58 29 66 29 Z"/>
        <path d="M48 46 q9 -1 18 0 M48 68 q9 1 18 0 M48 90 q9 -1 18 0 M48 112 q9 1 18 0 M48 134 q9 -1 18 0"/>
        <path d="M80 60 q28 -2 56 0 M80 82 q24 2 48 0 M80 104 q27 -2 54 0 M80 126 q15 1 30 0"/>
        <g class="bob">
          <path d="M178 36 l16 10 l-42 72 l-16 -10 z"/>
          <path d="M136 108 l-4 22 l20 -12"/>
          <path d="M172 46 l16 10"/>
        </g>
        <path class="tw" d="M30 30 l8 8 M38 30 l-8 8"/>
        <path class="tw d1" d="M188 128 v14 M181 135 h14"/>
      </g>
      <g fill="currentColor">
        <circle class="tw d2" cx="24" cy="100" r="3"/><circle cx="200" cy="96" r="3"/><circle cx="110" cy="164" r="2.5"/>
        <circle class="tw" cx="206" cy="20" r="2.5"/>
      </g>`),

    month: svg(`
      <g ${S}>
        <path d="M56 41 C92 39 130 42 164 40 Q174 40 174 50 C175 80 173 112 174 140 Q174 150 164 150 C128 151 92 149 56 150 Q46 150 46 140 C45 110 47 80 46 50 Q46 41 56 41 Z"/>
        <path d="M46 70 C88 68 132 71 174 69 M84 28 q1 12 0 24 M136 28 q-1 12 0 24"/>
        <path class="tw" d="M22 52 l8 8 M30 52 l-8 8"/>
        <path class="tw d1" d="M194 112 v14 M187 119 h14"/>
      </g>
      <g fill="currentColor">
        <circle cx="72" cy="90" r="3.5"/><circle cx="98" cy="90" r="3.5"/><circle cx="124" cy="90" r="3.5"/><circle cx="150" cy="90" r="3.5"/>
        <circle cx="72" cy="112" r="3.5"/><circle cx="98" cy="112" r="3.5"/><circle cx="150" cy="112" r="3.5"/>
        <circle cx="72" cy="134" r="3.5"/><circle cx="98" cy="134" r="3.5"/><circle cx="124" cy="134" r="3.5"/>
        <path class="beat" d="M124 106 c-5 -8 -17 -3 -10 6 l10 10 l10 -10 c7 -9 -5 -14 -10 -6z"/>
        <circle class="tw d2" cx="200" cy="30" r="3"/><circle cx="24" cy="140" r="3"/>
      </g>`),
  };

  // little mochi buddy with a sprout; happy = ^ ^ eyes
  const mascot = (happy = false, extra = '') => `
    <svg class="mascot ${extra}" viewBox="0 0 60 54" aria-hidden="true">
      <path class="ln" d="M30 10 c0 -4 2 -7 6 -7 M30 10 c-1 -3 -4 -5 -7 -4"/>
      <path class="body" d="M7 45 C3 31 10 11 30 10 C50 9 58 28 54 44 C52 50 45 50 30 50 C16 50 9 50 7 45 Z"/>
      ${happy
        ? `<path class="ln" d="M19 30 q3 -4 6 0 M35 30 q3 -4 6 0"/><path class="ln" d="M26 35 q4 5 8 0"/>`
        : `<g class="eyes" fill="currentColor"><circle cx="22" cy="30" r="2.5"/><circle cx="38" cy="30" r="2.5"/></g>
           <path class="ln" d="M27 35 q3 3 6 0"/>`}
      <path class="ln blush" d="M13 36 l3 -3 M16 37 l3 -3 M41 36 l3 -3 M44 37 l3 -3"/>
    </svg>`;

  // tiny line stickers picked from what you type
  // order matters: the first row that matches wins, so specific/silly ones go first
  const STICKERS = [
    ['poop|poo\\b|pee\\b|bathroom|loo\\b|number two|fart',
      '<path d="M6 19h12c2 0 2.5-3 .5-3.5 1-2-.5-3.5-2.5-3.5.5-2-1-3.5-3-3.5.5-1.5-.5-3-2-3.5.5 1.5-.5 2.5-2 3-2 .5-2.5 2.5-1.5 4-2 0-3.5 1.5-2.5 3.5C4 16 4 19 6 19z M10.5 16.5q1.5 1 3 0"/><circle cx="10" cy="14.3" r=".7"/><circle cx="14" cy="14.3" r=".7"/>'],
    ['cat\\b|cats|kitty|dog|puppy|pet\\b|pets|vet\\b|litter|feed\\b',
      '<circle cx="12" cy="15.5" r="3.5"/><circle cx="6.5" cy="11" r="1.6"/><circle cx="9.8" cy="7.2" r="1.6"/><circle cx="14.2" cy="7.2" r="1.6"/><circle cx="17.5" cy="11" r="1.6"/>'],
    ['plant|garden|flower|repot|succulent|grass',
      '<path d="M7 14h10l-1.5 7h-7z M12 14V9 M12 11c-3 0-5-2-5-5 3 0 5 2 5 5z M12 10c0-3 2-5 5-5 0 3-2 5-5 5z"/>'],
    ['trash|bin\\b|bins|rubbish|garbage|recycl',
      '<path d="M5 7h14 M9.5 7V4h5v3 M7 7l1 13h8l1-13 M10.5 11v6 M13.5 11v6"/>'],
    ['workout|work out|gym|lift|weights|dumbbell|exercise|squat|push.?up|pull.?up|abs\\b|core\\b|plank|pilates|crunch|leg day',
      '<path d="M3 10v4 M6 7v10 M18 7v10 M21 10v4 M6 12h12"/>'],
    ['run\\b|running|jog|walk|steps|cardio|hike|marathon|5k|10k',
      '<path d="M3 17c0-3 1-7 3-8l3 2 4-1c2 3 6 4 8 5v2H3z M3 20h18 M10 12l1 2 M13 11.5l1 2"/>'],
    ['yoga|stretch|meditat|breathe|mindful|relax|self.?care',
      '<path d="M12 19c-4 0-8-2-9-5 3 0 6 1 9 5 3-4 6-5 9-5-1 3-5 5-9 5z M12 19c-2-3-2-7 0-11 2 4 2 8 0 11z"/>'],
    ['sleep|nap\\b|naps|bed\\b|bedtime|rest\\b|snooze|zz',
      '<path d="M14 5a7.5 7.5 0 1 0 5.5 12.5A6.5 6.5 0 0 1 14 5z M16 3h4l-4 4h4"/>'],
    ['shower|bath\\b|bathe|bubble bath',
      '<path d="M5 21V8a4 4 0 0 1 8 0 M9.5 8h7 M11 12v1 M14 12v1 M17 12v1 M12.5 15v1 M15.5 15v1 M14 18v1"/>'],
    ['meds|medicine|medication|pill|vitamin|supplement|doctor|dentist|clinic|appointment',
      '<path d="M4.5 19.5a3.5 3.5 0 0 1 0-5l10-10a3.5 3.5 0 0 1 5 5l-10 10a3.5 3.5 0 0 1-5 0z M9.5 9.5l5 5"/>'],
    ['study|homework|assignment|essay|exam|revise|revision|write|email|work\\b|lecture|class',
      '<path d="M4 20l1-4L16 5l3 3L8 19z M14 7l3 3"/>'],
    ['pay\\b|bill|rent\\b|bank|budget|money|save|tax|invoice',
      '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v10 M14.5 9.5c-1-1-5-1-5 1s5 1 5 3-4 2-5 1"/>'],
    ['dance|party|karaoke|sing\\b|singing|music|concert|playlist',
      '<path d="M9 17V6l10-2v11 M9 17a2.5 2 0 1 1-5 0 2.5 2 0 0 1 5 0z M19 15a2.5 2 0 1 1-5 0 2.5 2 0 0 1 5 0z"/>'],
    ['phone|scroll|doomscroll|tiktok|instagram|text\\b|reply',
      '<path d="M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M11 18h2"/>'],
    ['cook|bake\\b|baking|meal|dinner|lunch|breakfast|recipe',
      '<path d="M3 11h12v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z M15 12h6 M7 8c0-1.5 1.5-1.5 1.5-3 M11 8c0-1.5 1.5-1.5 1.5-3"/>'],
    ['coconut', '<circle cx="12" cy="12.5" r="8"/><circle cx="9.5" cy="10" r=".9"/><circle cx="14.5" cy="10" r=".9"/><circle cx="12" cy="13.5" r=".9"/><path d="M6.5 17l1.5-1 M17.5 17l-1.5-1"/>'],
    ['corn', '<path d="M12 3c3 0 4 4 4 9s-2 7-4 7-4-2-4-7 1-9 4-9z M10 8h4 M9.5 12h5 M10 16h4 M8 13c-3 2-4 5-3 8 3 0 5-1 7-2 M16 13c3 2 4 5 3 8-3 0-5-1-7-2"/>'],
    ['meat|chicken|beef|pork|steak|mince|bacon|ham|sausage|lamb|turkey|wing|drumstick|bbq',
      '<path d="M10 14c-3-3-2-10 4-11s9 4 7 8-8 6-11 3z M10.5 13.5l-4.5 4.5"/><circle cx="4.3" cy="17.6" r="1.9"/><circle cx="6.4" cy="19.7" r="1.9"/>'],
    ['rice|noodle|pasta|ramen|ramyeon|spaghetti|udon|cereal|oat|soup|kimchi|tteok',
      '<path d="M3 12h18c0 5-4 8-9 8s-9-3-9-8z M14 9l6-6 M16 10l6-4"/>'],
    ['soap|shampoo|conditioner|body|lotion|tooth|floss|deodorant|sunscreen|skincare|cleanser|sanitis|sanitiz|detergent|bleach|razor',
      '<path d="M5 13h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z"/><circle cx="8" cy="8" r="2"/><circle cx="14" cy="5" r="1.5"/><circle cx="17" cy="9.5" r="1.2"/>'],
    ['toilet|tissue|paper towel|napkin|wipe|diaper|nappy|pads|tampon',
      '<path d="M8 4h9c2 0 3 3 3 7s-1 7-3 7H8 M8 4c-2 0-3 3-3 7s1 7 3 7 3-3 3-7-1-7-3-7z M17 18v3h-6"/><circle cx="8" cy="11" r="1"/>'],
    ['apple|banana|fruit|berr|strawberr|orange|grape|peach|pear|lemon|lime|melon|mango|cherr|kiwi',
      '<path d="M12 7c-3-2-7 0-7 5s3 9 5 9c1 0 1.5-.5 2-.5s1 .5 2 .5c2 0 5-4 5-9s-4-7-7-5z M12 7c0-2 1-4 3-4"/>'],
    ['egg', '<path d="M12 3c-4 0-7 7-7 11a7 7 0 0 0 14 0c0-4-3-11-7-11z"/>'],
    ['milk|yog|cream|juice|soy', '<path d="M8 8l2-4h4l2 4v12H8z M8 8h8"/>'],
    ['bread|bagel|toast|croissant|bun|cake|cookie|biscuit|muffin', '<path d="M4 10a4 4 0 0 1 3-6h10a4 4 0 0 1 3 6v9H4z"/>'],
    ['carrot|veg|lettuce|spinach|broccoli|onion|garlic|potato|tomato|salad|herb|kale|cabbage|cucumber|pepper|avocado|leaf',
      '<path d="M5 19c0-9 6-14 14-14 0 8-5 14-14 14z M5 19l8-8"/>'],
    ['fish|salmon|tuna|shrimp|prawn|seafood|sushi', '<path d="M3 12c3-5 10-6 14 0-4 6-11 5-14 0z M17 12l4-4v8z"/><circle cx="8" cy="11" r=".6"/>'],
    ['coffee|tea|latte|matcha|mug|cup|boba', '<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z M16 11h2a2 2 0 0 1 0 4h-2 M9 3c0 2 2 2 2 4"/>'],
    ['cheese|butter', '<path d="M3 17l18-8v10H3z"/><circle cx="9" cy="15" r="1"/><circle cx="15" cy="14" r="1"/>'],
    ['gift|present|birthday|bday', '<path d="M4 10h16v10H4z M3 7h18v3H3z M12 7v13 M12 7c-2-4-6-3-4-1 M12 7c2-4 6-3 4-1"/>'],
    ['book|read|novel|manga|comic|journal|notebook', '<path d="M4 5c3-1 6-1 8 1v14c-2-2-5-2-8-1z M20 5c-3-1-6-1-8 1v14c2-2 5-2 8-1z"/>'],
    ['shirt|dress|sweater|hoodie|jacket|jeans|cloth|top|skirt|shoe|sock|cardigan',
      '<path d="M8 3l-5 4 3 3 2-2v12h8V8l2 2 3-3-5-4c-1 2-3 2-4 2s-3 0-4-2z"/>'],
    ['clean|wash|laundry|vacuum|dish|tidy|sweep|mop', '<path d="M14 3l-4 9 M6 12h8l2 9H4z"/>'],
    ['trip|travel|flight|plane|ticket|holiday|vacation|pack', '<path d="M3 12l18-8-6 16-3-7z M12 13l9-9"/>'],
    ['movie|film|show|netflix|series|drama|anime', '<path d="M4 5h16v14H4z M4 9h16 M4 15h16 M8 5v4 M16 5v4 M8 15v4 M16 15v4"/>'],
    ['love|date|mom|mum|dad|friend|call|hug', '<path d="M12 20l-7-7a4 4 0 0 1 7-5 4 4 0 0 1 7 5z"/>'],
    // last, so "coconut water" and "water the plants" get their own icons first
    ['water|hydrat|drink', '<path d="M12 3c3 4 6 8 6 11a6 6 0 0 1-12 0c0-3 3-7 6-11z"/>'],
  ].map(([words, path]) => [new RegExp('\\b(' + words + ')', 'i'), path]);

  const sticker = text => {
    const hit = STICKERS.find(([re]) => re.test(text));
    return hit ? `<svg class="stk" viewBox="0 0 24 24" aria-hidden="true">${hit[1]}</svg>` : '';
  };

  const LOOP = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 3l3 3-3 3 M20 6H9a5 5 0 0 0-5 5 M7 21l-3-3 3-3 M4 18h11a5 5 0 0 0 5-5"
    fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const CHECK = `<svg viewBox="0 0 32 32" aria-hidden="true">
    <path class="ring" d="M17 3.6c7.2.3 12 5.8 11.6 12.7-.4 6.9-5.9 12-12.6 11.7C9 27.7 3.8 22.3 4 15.6 4.3 8.9 9.6 3.6 16.4 4.2"/>
    <path class="tick" d="M9 16.5l5.2 5.6L24.5 8.5"/></svg>`;

  const SCRIBBLE = `<svg class="scribble" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
    <path pathLength="100" d="M1 7 L9 4 L16 8 L25 3 L33 8 L42 4 L50 8 L59 3 L67 8 L76 4 L84 8 L92 4 L99 6"/></svg>`;

  const SPARKS = [
    '<svg viewBox="0 0 20 20"><path d="M10 1Q11 9 19 10Q11 11 10 19Q9 11 1 10Q9 9 10 1Z" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 20 20"><path d="M10 17L3 10a4 4 0 0 1 7-5 4 4 0 0 1 7 5z" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="4" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>',
  ];

  // ---------- words ----------

  const NOTES = ['drink some water ♡', 'one thing at a time', 'you’re doing great', 'don’t forget snacks',
    'small steps count ✿', 'take a little break', 'hi hi!', 'proud of you'];
  // what the mascot says when a list is finished, per list type
  const DONE = {
    grocery: ['basket complete ✿', 'all shopped ♡', 'groceries done, yay'],
    wish: ['every wish granted ✿', 'all yours now ♡', 'wishes do come true!'],
    todo: ['you did it! ✿', 'all done ♡', 'look at you go!'],
    other: ['all done ♡', 'list cleared, yay', 'look at you go!'],
  };
  const ALL_DONE = {
    grocery: 'all in the basket ✿',
    wish: 'every wish granted ✿',
    todo: 'all done! go treat yourself ✿',
    other: 'all done! ✿',
  };
  const pick = (arr, not) => {
    const pool = arr.filter(x => x !== not);
    return pool[Math.floor(Math.random() * pool.length)];
  };

  // ---------- state ----------

  const KINDS = [
    { id: 'grocery', label: 'Groceries', hint: 'eggs, bread, the good cheese', group: 'Basket', placeholder: 'add groceries…' },
    { id: 'wish', label: 'Wishlist', hint: 'things you’d love someday', group: 'Wants', placeholder: 'add a wish…' },
    { id: 'todo', label: 'To-do', hint: 'chores, errands, plans', group: 'Today', placeholder: 'add a task…' },
    { id: 'other', label: 'Anything', hint: 'books, films, ideas…', group: 'Things', placeholder: 'add something…' },
  ];
  const kindOf = id => KINDS.find(k => k.id === id) || KINDS[3];

  const KEY = 'scribble-lists:v1'; // the app's old name; kept so existing saves still load
  const uid = () => Math.random().toString(36).slice(2, 10);

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && Array.isArray(s.lists)) return s;
    } catch (e) { /* fall through */ }
    return { seen: false, user: '', lists: [], log: {}, months: {}, recipes: [], notes: [] };
  }
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ }
  }
  function save() {
    persist();
    if (window.Sync) Sync.schedule();
  }

  let state = load();
  let draft = null;           // the new-list wizard in progress
  let you = state.user || ''; // name being typed on the "what is your name" screen
  let filter = 'all';
  let note = pick(NOTES);
  let pendingFocus = null;    // selector to focus after the next render
  let lastRoute = null;
  let justAdded = null;       // item id to pop in
  let justToggled = null;     // item id to animate its tick
  let hop = false;            // make the buddy hop after the next render
  let sheet = null;           // item id whose repeat sheet is open
  let sheetFresh = false;     // slide the sheet in only when it first opens
  let leroArmed = true;       // easter egg fires once per time it's typed
  let msel = null;            // month page: selected photo / sticker / text id
  let msheet = null;          // month page sheet: 'day' | 'tray' | 'text' | 'export'
  let mday = null;            // day number the day sheet is open for
  let mtab = 'doodles';       // sticker tray tab
  let mtext = null;           // words being written: { id?, t, shape }
  let mexp = null;            // export options and the finished file: { fmt, ticks, dots, preview, blob }
  let gest = null;            // drag / pinch in progress on the month page
  let mzoom = 1;              // month page zoom, 1 = the whole board fits
  let bsheet = false;         // recipe page: the "which grocery list?" sheet is open
  let nsel = null;            // note page: the photo whose frame / remove tools are showing
  let crop = null;            // square photo cropper: { rid | lid + iid (whose photo), o (whole photo id), w, h, cx, cy (crop centre), z, fresh }
  let wsheet = null;          // wishlist: the wish whose photo / link sheet is open
  let wexp = null;            // wishlist export: { fmt, got, preview, blob }

  const esc = s => String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  const route = () => location.hash.replace(/^#/, '') || '/';
  const currentList = () => {
    const r = route();
    return r.startsWith('/list/') ? state.lists.find(l => l.id === r.slice(6)) : null;
  };
  const go = path => {
    if (route() === path) render();
    else location.hash = path;
  };

  const stats = list => {
    const items = list.sections.flatMap(s => s.items);
    return { total: items.length, done: items.filter(i => i.done).length };
  };

  // ---------- views ----------

  function welcomeView() {
    return `
      <section class="screen center">
        <div class="art">${DOODLES.grocery}</div>
        <h1 class="headline"><small>It’s time to sort out</small>all your lists</h1>
        <div class="rule"></div>
        <p class="sub">Groceries, wishlists, chores — jot them down before you forget</p>
        <div class="spacer"></div>
        <button class="pill wide" data-action="start">Continue</button>
        <a class="text-btn" href="#/account" style="margin-top:8px">already using scribbles? sign in</a>
      </section>`;
  }

  function nameView() {
    return `
      <section class="screen">
        <div class="art">${DOODLES.welcome}</div>
        <form data-form="you">
          <p class="question">First, what is your name?</p>
          <input class="field" name="you" maxlength="24" autocomplete="given-name"
            placeholder="your name" value="${esc(you)}">
        </form>
        <div class="spacer"></div>
        <div class="nav">
          <button class="text-btn" data-action="you-back">Back</button>
          <button class="pill" data-action="you-next" ${you.trim() ? '' : 'disabled'}>Next</button>
        </div>
      </section>`;
  }

  function wizardView() {
    const k = kindOf(draft.kind);
    if (draft.step === 0) {
      return `
        <section class="screen">
          <div class="art">${DOODLES.other}</div>
          <form data-form="name">
            <p class="question">${state.lists.length ? 'What is your new list called?' : 'What should your first list be called?'}</p>
            <input class="field" name="name" maxlength="40" autocomplete="off"
              value="${esc(draft.name)}">
          </form>
          <div class="spacer"></div>
          <div class="nav">
            <button class="text-btn" data-action="wiz-back">Back</button>
            <button class="pill" data-action="wiz-next" ${draft.name.trim() ? '' : 'disabled'}>Next</button>
          </div>
        </section>`;
    }
    if (draft.step === 1) {
      return `
        <section class="screen">
          <p class="question" style="margin-top:8px">What kind of list is it?</p>
          <div class="kinds">
            ${KINDS.map(x => `
              <button class="kind-tile ${x.id === draft.kind ? 'on' : ''}" data-action="pick-kind" data-kind="${x.id}">
                ${DOODLES[x.id]}
                <b>${x.label}</b><span>${x.hint}</span>
              </button>`).join('')}
          </div>
          <div class="spacer"></div>
          <div class="nav">
            <button class="text-btn" data-action="wiz-back">Back</button>
            <button class="pill" data-action="wiz-next">Next</button>
          </div>
        </section>`;
    }
    return `
      <section class="screen center">
        <div class="art">${DOODLES.ready}</div>
        <h1 class="headline"><small>And now</small>you’re ready</h1>
        <p class="sub">Tap the button to start filling up “${esc(draft.name.trim())}”, your new ${k.label.toLowerCase()} list</p>
        <div class="spacer"></div>
        <button class="pill wide" data-action="create">Let’s start</button>
        <button class="text-btn" data-action="wiz-back" style="margin-top:8px">Back</button>
      </section>`;
  }

  function card(l) {
    const { total, done } = stats(l);
    const pct = total ? Math.round(done / total * 100) : 0;
    return `
      <a class="card" href="#/list/${l.id}">
        <div class="card-art">${DOODLES[kindOf(l.kind).id]}</div>
        <div class="card-body">
          <h3>${esc(l.name)}</h3>
          <div class="bar"><span style="width:${pct}%"></span></div>
          <small>${!total ? 'nothing here… yet' : done === total ? 'all done ✿' : `${done} of ${total} ticked off`}</small>
        </div>
      </a>`;
  }

  function homeView() {
    const hour = new Date().getHours();
    const hello = hour < 12 ? 'good morning' : hour < 18 ? 'good afternoon' : 'good evening';
    const lists = [...state.lists].sort((a, b) => b.created - a.created);
    const count = id => lists.filter(l => l.kind === id).length;

    let body;
    if (!lists.length) {
      body = `<div class="empty">${mascot()}<p>no lists yet<br>let’s make one ♡</p></div>`;
    } else if (filter === 'all') {
      body = KINDS.filter(k => count(k.id)).map(k => `
        <h2 class="group-label">${k.label}</h2>
        <div class="cards">${lists.filter(l => l.kind === k.id).map(card).join('')}</div>`).join('');
    } else {
      const shown = lists.filter(l => l.kind === filter);
      body = shown.length
        ? `<div class="cards">${shown.map(card).join('')}</div>`
        : `<div class="empty">${mascot()}<p>no ${kindOf(filter).label.toLowerCase()} lists yet</p></div>`;
    }

    return `
      <section class="screen">
        <div class="home-head">
          <div>
            <div class="hello-row">
              <button class="hello" data-action="edit-name">${hello}${state.user ? ', ' + esc(state.user) : ''} ✿</button>
              <button class="icon-btn snd" data-action="sound" aria-label="Sound ${state.sound === false ? 'off' : 'on'}" title="Sound">${state.sound === false ? SPEAKER_OFF : SPEAKER_ON}</button>
              <a class="icon-btn snd ${Sync.user() ? 'on' : ''}" href="#/account" aria-label="${Sync.user() ? 'Synced' : 'Sign in to sync'}" title="Sync">${Sync.user() ? CLOUD_ON : CLOUD}</a>
            </div>
            <h1 class="home-title">your lists</h1>
          </div>
          <button class="buddy" data-action="poke" aria-label="Say hi">
            <span class="bubble">${esc(note)}</span>${mascot()}
          </button>
        </div>
        ${lists.length ? `
          <div class="chips">
            <button class="chip ${filter === 'all' ? 'on' : ''}" data-action="filter" data-kind="all">All<i>${lists.length}</i></button>
            ${KINDS.map(k => `<button class="chip ${filter === k.id ? 'on' : ''}" data-action="filter" data-kind="${k.id}">${k.label}<i>${count(k.id)}</i></button>`).join('')}
          </div>` : ''}
        ${body}
        <div class="spacer"></div>
        <div class="dock dock-row">
          <a class="pill ghost" href="#/book">${BOOK}notebook</a>
          <button class="pill grow" data-action="new">New list</button>
        </div>
      </section>`;
  }

  function listView(l) {
    const k = kindOf(l.kind);
    const { total, done } = stats(l);
    const allDone = total > 0 && done === total;
    const wish = l.kind === 'wish';
    return `
      <section class="screen">
        <div class="topbar">
          <a class="text-btn" href="#/">Back</a>
          ${wish ? `<button class="text-btn w-save" data-action="w-export" ${total ? '' : 'disabled'}>${SAVE_ICON}save</button>`
            : `<span class="kind-tag">${k.label}</span>`}
        </div>
        <div class="hero">
          <div class="hero-art">${DOODLES[k.id]}</div>
          <div style="flex:1;min-width:0">
            <input class="title-input" data-field="list-name" value="${esc(l.name)}" maxlength="40" aria-label="List name">
          </div>
        </div>
        <div class="progress-row">
          <p class="progress-line">${!total ? 'nothing here… yet' : allDone ? ALL_DONE[k.id] : `${done} of ${total} ticked off`}</p>
          <span class="buddy sm">${mascot(allDone)}</span>
        </div>

        ${l.sections.map(s => {
          const sd = s.items.filter(i => i.done).length;
          return `
          <div class="group" data-sec="${s.id}">
            <div class="group-head">
              <input class="group-name" data-field="sec-name" value="${esc(s.name)}" maxlength="30" aria-label="Group name">
              <span class="group-count">${s.items.length ? `${sd}/${s.items.length}` : ''}</span>
              <button class="icon-btn" data-action="del-sec" title="Remove group" aria-label="Remove group">×</button>
            </div>
            <ul class="items">
              ${s.items.map(i => `
                <li class="item ${wish ? 'wish' : ''} ${i.done ? 'done' : ''} ${i.id === justAdded ? 'new' : ''} ${i.id === justToggled ? 'just' : ''}" data-item="${i.id}">
                  <button class="check" data-action="toggle" aria-label="${i.done ? 'Untick' : 'Tick'} ${esc(i.text)}">${CHECK}</button>
                  ${wish && i.photo ? `<button class="w-thumb" data-action="w-edit" aria-label="Photo of ${esc(i.text)}"><img data-photo="${esc(i.photo.p)}" alt="" draggable="false"></button>` : ''}
                  ${wish && linkUrl(i.link)
                    ? `<div class="w-body">
                        <button class="item-text" data-action="toggle"><span class="txt">${esc(i.text)}${SCRIBBLE}</span>${sticker(i.text)}</button>
                        <a class="w-go" href="${esc(linkUrl(i.link))}" target="_blank" rel="noopener noreferrer" aria-label="Open the link for ${esc(i.text)}">${esc(host(i.link))} ↗</a>
                      </div>`
                    : `<button class="item-text" data-action="toggle"><span class="txt">${esc(i.text)}${SCRIBBLE}</span>${sticker(i.text)}${repeatTag(l, i)}</button>`}
                  ${wish ? `<button class="icon-btn w-edit" data-action="w-edit" title="Photo & link" aria-label="Add a photo or link to ${esc(i.text)}">${PENCIL}</button>` : ''}
                  ${!canRepeat(l) ? '' : `<button class="icon-btn rep ${repeats(l, i) ? 'on' : ''}" data-action="repeat" title="Repeat" aria-label="Repeat ${esc(i.text)}: ${repeats(l, i) ? repeatLabel(i) : 'off'}">${LOOP}</button>`}
                  <button class="icon-btn" data-action="del-item" aria-label="Delete ${esc(i.text)}">×</button>
                </li>`).join('')}
            </ul>
            <form class="add-row" data-form="add-item">
              <span class="add-plus" aria-hidden="true">+</span>
              <input name="text" maxlength="${wish ? 500 : 80}" autocomplete="off" placeholder="${wish ? 'add a wish, or paste a link…' : k.placeholder}" aria-label="Add item to ${esc(s.name)}">
            </form>
          </div>`;
        }).join('')}

        <button class="new-group" data-action="add-sec">+ add a group</button>
        <div class="list-foot">
          <button class="text-btn" data-action="clear-done" ${done ? '' : 'disabled style="opacity:.4"'}>Clear ticked</button>
          <button class="text-btn danger" data-action="del-list">Delete list</button>
        </div>
      </section>
      ${sheet ? sheetView(l) : ''}
      ${wsheet ? wishSheet(l) : ''}
      ${wexp ? wishExportSheet() : ''}
      ${crop ? cropView() : ''}`;
  }

  // ---------- wishlists: a photo and a link on each wish, and saving the list as a picture ----------
  // item.photo = { p, a: 1, o, c } like a recipe photo (cropped square) · item.link = the product page

  function wishSheet(l) {
    const i = findItem(l, wsheet);
    if (!i) return '';
    const url = linkUrl(i.link);
    return `
      <div class="sheet-wrap ${sheetFresh ? 'fresh' : ''}">
        <div class="sheet-backdrop" data-action="w-close"></div>
        <div class="sheet w-sheet" role="dialog" aria-label="Edit wish">
          <div class="w-top">
            <button class="w-pic ${i.photo ? 'has' : ''}" data-action="w-photo" aria-label="${i.photo ? 'Change photo' : 'Add a photo'}">
              ${i.photo ? `<img data-photo="${esc(i.photo.p)}" alt="" draggable="false">` : `${ADD_ICONS.photo}<span>photo</span>`}
            </button>
            <div class="w-fields">
              <input class="w-name" data-field="w-name" value="${esc(i.text)}" maxlength="80" aria-label="Wish">
              <div class="r-link w-link">
                ${LINK}<input data-field="w-link" type="url" inputmode="url" value="${esc(i.link || '')}" maxlength="1000" autocomplete="off" placeholder="paste a link to it…" aria-label="Link">
                <a class="r-open" href="${esc(url)}" target="_blank" rel="noopener noreferrer" ${url ? '' : 'hidden'}>open ↗</a>
              </div>
            </div>
          </div>
          ${i.photo ? `<div class="w-pic-btns">
            <button class="chip" data-action="w-crop">crop</button>
            <button class="chip" data-action="w-photo">change</button>
            <button class="chip" data-action="w-photo-del">remove</button>
          </div>` : ''}
          <button class="pill wide" data-action="w-close">Done</button>
        </div>
      </div>`;
  }

  function wishExportSheet() {
    const share = coarse && navigator.canShare && navigator.canShare({ files: [new File([''], 'x.png', { type: 'image/png' })] });
    return `
      <div class="sheet-wrap ${sheetFresh ? 'fresh' : ''}">
        <div class="sheet-backdrop" data-action="w-close"></div>
        <div class="sheet m-sheet" role="dialog" aria-label="Save your wishlist">
          <h3>save your wishlist</h3>
          <div class="m-preview">${wexp.preview
            ? `<img src="${wexp.preview}" alt="Preview of your wishlist">`
            : `<span class="m-busy">${mascot(true)}drawing…</span>`}</div>
          <div class="seg">
            <button class="${wexp.fmt === 'png' ? 'on' : ''}" data-action="w-fmt" data-fmt="png">image</button>
            <button class="${wexp.fmt === 'pdf' ? 'on' : ''}" data-action="w-fmt" data-fmt="pdf">pdf</button>
          </div>
          <div class="m-row">
            <span>include wishes you got</span>
            <button class="switch ${wexp.got ? 'on' : ''}" role="switch" aria-checked="${wexp.got}" aria-label="Include wishes you got" data-action="w-got"></button>
          </div>
          ${wexp.fmt === 'pdf' ? '<p class="m-empty w-pdf-note">links in the pdf can be tapped ✿</p>' : ''}
          <div class="m-btns">
            <button class="pill ghost" data-action="w-close">cancel</button>
            <button class="pill" data-action="w-save" ${wexp.blob ? '' : 'disabled'}>${wexp.fmt === 'pdf' ? 'save pdf' : share ? 'save to photos' : 'download'}</button>
          </div>
        </div>
      </div>`;
  }

  // wish photos, both the square and the whole photo it was cut from
  const dropPhoto = x => { if (x && x.photo) { R.photos.del(x.photo.p); if (x.photo.o && x.photo.o !== x.photo.p) R.photos.del(x.photo.o); } };

  // a pasted shop link becomes a wish: the link, named from the page's address
  function wishFromLink(text) {
    if (/\s/.test(text) || !/^(https?:\/\/|www\.)/i.test(text)) return null;
    const url = linkUrl(text);
    if (!url) return null;
    const u = new URL(url);
    const words = u.pathname.split('/').map(seg => {
      try { return decodeURIComponent(seg); } catch (e) { return seg; }
    }).filter(seg => /[a-z]{3}/i.test(seg) && /[-_ ]/.test(seg) && !/^(dp|p|product|products|item|itm|gp)$/i.test(seg))
      .sort((a, b) => b.length - a.length)[0];
    const name = words ? words.replace(/\.[a-z]+$/i, '').replace(/[-_+]+/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase().slice(0, 60) : '';
    return { text: name || host(url), link: url };
  }

  async function buildWishExport(l) {
    const run = wexp;
    const items = l.sections.flatMap(s => s.items).filter(i => run.got || !i.done);
    try {
      const canvas = await R.renderWish({
        title: l.name,
        sub: `${state.user ? state.user + '’s wishlist' : 'a wishlist'} · ${items.length} ${items.length === 1 ? 'wish' : 'wishes'}`,
        items: await Promise.all(items.map(async i => ({
          t: i.text, done: i.done, url: linkUrl(i.link), host: host(i.link),
          photo: i.photo ? await R.photos.url(i.photo.p).catch(() => '') : '',
        }))),
        dots: true,
      });
      const blob = await R.exportBlob(canvas, run.fmt);
      if (wexp !== run) return; // closed, or the options changed meanwhile
      run.preview = canvas.toDataURL('image/jpeg', .75);
      run.blob = blob;
    } catch (e) {
      if (wexp !== run) return;
      wexp = null;
      toast('couldn’t draw that, sorry');
    }
    render();
  }

  function wishAction(t) {
    const l = currentList();
    if (!l) return;
    const i = wsheet && findItem(l, wsheet);
    switch (t.dataset.action) {
      case 'w-edit':
        sfx('tap');
        wsheet = t.closest('[data-item]').dataset.item;
        sheetFresh = true;
        break;
      case 'w-close':
        wsheet = null;
        wexp = null;
        break;
      case 'w-photo':
        if (i) pickPhotos({ item: [l.id, i.id] });
        return;
      case 'w-crop':
        if (i && i.photo) { sfx('tap'); recrop(i, { lid: l.id, iid: i.id }); }
        return;
      case 'w-photo-del':
        if (!i) return;
        dropPhoto(i);
        delete i.photo;
        sfx('poof');
        save();
        break;
      case 'w-export':
        sfx('tap');
        wexp = { fmt: 'png', got: true };
        sheetFresh = true;
        render();
        buildWishExport(l);
        return;
      case 'w-fmt':
      case 'w-got':
        if (t.dataset.fmt === wexp.fmt) return;
        sfx('tap');
        wexp = { ...wexp, preview: null, blob: null };
        if (t.dataset.fmt) wexp.fmt = t.dataset.fmt; else wexp.got = !wexp.got;
        render();
        buildWishExport(l);
        return;
      case 'w-save':
        deliver(wexp.blob, `scribbles-${l.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'wishlist'}.${wexp.fmt}`);
        return;
      default:
        return;
    }
    render();
  }

  function sheetView(l) {
    const i = findItem(l, sheet);
    if (!i) return '';
    const days = i.repeat === 'days' ? i.days : [];
    return `
      <div class="sheet-wrap ${sheetFresh ? 'fresh' : ''}">
        <div class="sheet-backdrop" data-action="sheet-close"></div>
        <div class="sheet" role="dialog" aria-label="Repeat ${esc(i.text)}">
          <h3>repeat “${esc(i.text)}”</h3>
          <div class="rep-opts">
            ${REPEAT_OPTS.map(([v, label]) => `
              <button class="chip ${(i.repeat || null) === v ? 'on' : ''}" data-action="set-repeat" data-rep="${v || ''}">${label}</button>`).join('')}
          </div>
          <p class="sheet-label">or only on certain days</p>
          <div class="days">
            ${WEEK.map(d => `
              <button class="day ${days.includes(d) ? 'on' : ''}" data-action="toggle-day" data-day="${d}" aria-label="${DAY_NAMES[d]}">${DAY_NAMES[d][0]}</button>`).join('')}
          </div>
          <button class="pill wide" data-action="sheet-close">Done</button>
        </div>
      </div>`;
  }

  // ---------- render ----------

  const app = document.getElementById('app');

  // ---------- repeating items ----------
  // item.repeat: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'days' (item.days = weekdays, Sun = 0)
  // a ticked repeating item unticks itself when it's next due; wishlists and grocery lists never repeat

  const DAY = 864e5;
  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const WEEK = [1, 2, 3, 4, 5, 6, 0]; // Monday first
  const REPEAT_OPTS = [[null, 'never'], ['daily', 'every day'], ['weekly', 'every week'],
    ['biweekly', 'every 2 weeks'], ['monthly', 'every month']];

  const dayStart = (t, add = 0) => {
    const d = new Date(t);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + add).getTime();
  };

  const canRepeat = l => l.kind !== 'wish' && l.kind !== 'grocery';
  const repeats = (l, i) => canRepeat(l) && !!i.repeat && (i.repeat !== 'days' || !!(i.days && i.days.length));

  const findItem = (l, id) => {
    for (const s of l.sections) {
      const i = s.items.find(x => x.id === id);
      if (i) return i;
    }
    return null;
  };

  // the day a ticked item comes back, counted from the day it was ticked
  function nextDue(i) {
    const done = dayStart(i.doneAt || 0);
    const d = new Date(done);
    switch (i.repeat) {
      case 'daily': return dayStart(done, 1);
      case 'weekly': return dayStart(done, 7 - (d.getDay() + 6) % 7); // next Monday
      case 'biweekly': return dayStart(done, 14);
      case 'monthly': return new Date(d.getFullYear(), d.getMonth() + 1, 1).getTime();
      case 'days':
        for (let k = 1; k <= 7; k++) if (i.days.includes(new Date(dayStart(done, k)).getDay())) return dayStart(done, k);
    }
    return Infinity;
  }

  function repeatLabel(i) {
    if (i.repeat === 'days') {
      return i.days.length === 7 ? 'every day' : WEEK.filter(d => i.days.includes(d)).map(d => DAY_NAMES[d]).join(' · ');
    }
    return { daily: 'daily', weekly: 'weekly', biweekly: 'every 2 weeks', monthly: 'monthly' }[i.repeat];
  }

  function backLabel(i) {
    const due = nextDue(i);
    if (due === dayStart(Date.now(), 1)) return 'back tomorrow';
    if (i.repeat === 'weekly') return 'back next week';
    if (i.repeat === 'monthly') return 'back next month';
    const d = new Date(due);
    return due - dayStart(Date.now()) < 7 * DAY
      ? `back ${DAY_NAMES[d.getDay()]}`
      : `back ${d.getDate()} ${d.toLocaleString('en', { month: 'short' })}`;
  }

  function resetRepeats() {
    let changed = false;
    const now = Date.now();
    state.lists.forEach(l => l.sections.forEach(s => s.items.forEach(i => {
      if (i.done && repeats(l, i) && now >= nextDue(i)) { i.done = false; changed = true; }
    })));
    if (changed) save();
    return changed;
  }

  const repeatTag = (l, i) => repeats(l, i)
    ? `<span class="rep-tag">${i.done ? backLabel(i) : repeatLabel(i)}</span>`
    : '';

  // ---------- monthly recap ----------
  // state.log['2026-11-12'] = [{ i: item id, t: text, l: list name }], filled in as things get ticked
  // state.months['2026-11'] = { notes: { 12: 'yoga' }, hl: 'highlights', els: [...] }
  // an element is { id, type: 'photo' | 'sticker' | 'text' | 'draw', x, y (its centre), r (degrees), and
  //   photo: p (photo id), a (height / width), w, frame · sticker: k (sticker id), w · text: t, shape, s (font size)
  //   draw: p (picture id), s (strokes id), a, f (share of the pad it fills), w }
  // positions and sizes are in board units: 1% of the board's width (see recap.js)

  const R = window.Recap;
  const icon24 = body => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  const pad2 = n => String(n).padStart(2, '0');
  const ymd = t => {
    const d = new Date(t);
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  };
  const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const FRAMES = ['polaroid', 'taped', 'round', 'plain'];
  const TABS = [['doodles', 'doodles'], ['scribbles', 'scribbles'], ['stamps', 'stamps'], ['tape', 'tape & arrows']];
  const coarse = matchMedia('(pointer: coarse)').matches;

  function logTick(l, i) {
    const day = state.log[ymd(i.doneAt)] || (state.log[ymd(i.doneAt)] = []);
    if (!day.some(x => x.i === i.id)) day.push({ i: i.id, t: i.text, l: l.name });
  }
  function unlogTick(i, at) {
    const k = at && ymd(at);
    if (!k || !state.log[k]) return;
    state.log[k] = state.log[k].filter(x => x.i !== i.id);
    if (!state.log[k].length) delete state.log[k];
  }

  const viewKey = () => {
    const m = route().match(/^\/month\/(\d{4}-\d{2})$/);
    return m ? m[1] : ymd(Date.now()).slice(0, 7);
  };
  const monthOf = (key, make) => state.months[key] ||
    (make ? (state.months[key] = { notes: {}, hl: '', els: [] }) : { notes: {}, hl: '', els: [] });
  const monthName = (Y, M, month = 'long') => new Date(Y, M - 1, 1).toLocaleString('en', { month }).toLowerCase();

  function grid(key) {
    const [Y, M] = key.split('-').map(Number);
    const off = (new Date(Y, M - 1, 1).getDay() + 6) % 7; // Monday first
    const rows = Math.ceil((off + new Date(Y, M, 0).getDate()) / 7);
    const cells = [];
    for (let i = 0; i < rows * 7; i++) {
      const d = new Date(Y, M - 1, 1 - off + i);
      cells.push({ n: d.getDate(), out: d.getMonth() !== M - 1, key: ymd(d) });
    }
    return { Y, M, off, rows, cells };
  }

  function monthStats(key) {
    let ticked = 0, days = 0;
    Object.keys(state.log).forEach(k => {
      if (k.startsWith(key + '-')) { ticked += state.log[k].length; days++; }
    });
    return { ticked, days };
  }

  const showTicks = () => state.showTicks !== false;
  const elSize = e => e.type === 'text' ? e.s : e.w;
  const setSize = (e, v) => {
    if (e.type === 'text') e.s = Math.min(22, Math.max(2.5, v));
    else e.w = Math.min(95, Math.max(5, v));
  };

  const CAL = icon24('<rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M4 10h16 M9 3v4 M15 3v4"/>');
  const PENCIL = icon24('<path d="M4 20l1.2-4.2L16 5l3 3L8.2 18.8z M14 7l3 3"/>');
  const SAVE_ICON = icon24('<path d="M12 4v11 M7.5 10.5L12 15l4.5-4.5 M5 19.5h14"/>');
  const SMALL_TICK = icon24('<path d="M5 12.5l4.5 4.5L19 7"/>');
  const ADD_ICONS = {
    photo: icon24('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 16l5-5 4 4 3-3 6 5"/><circle cx="16" cy="9" r="1.5"/>'),
    sticker: icon24('<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>'),
    text: icon24('<path d="M5 6h14 M12 6v13"/>'),
    draw: icon24('<path d="M4 20l1.2-4.2L16 5l3 3L8.2 18.8z M14 7l3 3"/>'),
  };

  function elHtml(e) {
    const sel = e.id === msel;
    let cls = '', size = '', inner = '';
    if (e.type === 'photo') {
      const src = R.photos.cached(e.p);
      cls = 'fr-' + e.frame;
      size = `--w:${e.w}cqw;`;
      inner = `<img data-photo="${esc(e.p)}" ${src ? `src="${src}"` : ''} alt="" draggable="false" style="aspect-ratio:${e.frame === 'round' ? 1 : (1 / e.a).toFixed(4)}">`;
    } else if (e.type === 'draw') {
      const src = R.photos.cached(e.p);
      size = `--w:${e.w}cqw;`;
      inner = `<img data-photo="${esc(e.p)}" ${src ? `src="${src}"` : ''} alt="" draggable="false" style="aspect-ratio:${(1 / e.a).toFixed(4)}">`;
    } else if (e.type === 'sticker') {
      const s = R.stickerById(e.k);
      size = `--w:${e.w}cqw;`;
      inner = s ? R.stickerSvg(s, 'aria-hidden="true"') : '';
    } else {
      cls = 'sh-' + e.shape;
      size = `font-size:${e.s}cqw;`;
      inner = esc(e.t);
    }
    const handles = sel ? `<button class="h h-del" data-action="m-del" aria-label="Remove">×</button>
      <span class="h h-size" data-handle="size"></span><span class="h h-rot" data-handle="rot"></span>` : '';
    return `<div class="el el-${e.type} ${cls} ${sel ? 'sel' : ''}" data-el="${e.id}"
      style="left:${e.x}cqw;top:${e.y}cqw;--r:${e.r || 0}deg;${size}">${inner}${handles}</div>`;
  }

  function monthView(key) {
    const m = monthOf(key);
    const g = grid(key);
    const name = monthName(g.Y, g.M);
    const prev = new Date(g.Y, g.M - 2, 1), next = new Date(g.Y, g.M, 1);
    const today = ymd(Date.now());
    const { ticked, days } = monthStats(key);
    const sel = m.els.find(e => e.id === msel);

    const cells = g.cells.map(c => {
      if (c.out) return `<div class="cell out"><span class="num">${c.n}</span></div>`;
      const ticks = (state.log[c.key] || []).length;
      const note = m.notes[c.n];
      return `<button class="cell ${c.key === today ? 'today' : ''}" data-action="m-day" data-day="${c.n}" aria-label="${c.n} ${name}${note ? ': ' + esc(note) : ''}">
        <span class="num">${c.n}</span>${note ? `<span class="cnote">${esc(note)}</span>` : ''}
        ${ticks && showTicks() ? `<i class="ctick">✓ ${ticks}</i>` : ''}</button>`;
    }).join('');

    let dock;
    if (sel) {
      dock = `<div class="m-tools">
        ${sel.type === 'photo' ? FRAMES.map(f => `<button class="chip ${sel.frame === f ? 'on' : ''}" data-action="m-frame" data-frame="${f}">${f}</button>`).join('') : ''}
        ${sel.type === 'text' ? '<button class="chip" data-action="m-edit-text">edit words</button>' : ''}
        ${sel.type === 'draw' ? '<button class="chip" data-action="m-edit-draw">edit drawing</button>' : ''}
        <button class="chip" data-action="m-front">to front</button>
        <button class="chip" data-action="m-del">remove</button>
      </div>`;
    } else {
      dock = [['photo', 'm-photo'], ['sticker', 'm-tray'], ['text', 'm-words'], ['draw', 'm-draw']].map(([a, action]) =>
        `<button class="pill ghost" data-action="${action}">${ADD_ICONS[a]}${a}</button>`).join('');
    }

    return `
      <section class="screen month">
        <div class="m-top">
          <a class="m-btn" href="#/book">back</a>
          <div class="m-title">
            <h1>${name}</h1>
            <div class="m-nav">
              <button data-action="m-go" data-key="${ymd(prev).slice(0, 7)}">${monthName(prev.getFullYear(), prev.getMonth() + 1, 'short')}</button>
              · ${g.Y} ·
              <button data-action="m-go" data-key="${ymd(next).slice(0, 7)}">${monthName(next.getFullYear(), next.getMonth() + 1, 'short')}</button>
            </div>
          </div>
          ${sel ? '<button class="m-btn dark" data-action="m-deselect">done</button>'
            : '<button class="m-btn dark" data-action="m-export">save</button>'}
        </div>

        <div class="m-card">
          <div class="m-hl">
            <h3>this month</h3>
            <textarea data-field="m-hl" rows="3" maxlength="200" aria-label="This month's highlights" placeholder="a few highlights…">${esc(m.hl)}</textarea>
          </div>
          <div class="m-stats">
            <span><b>${ticked}</b> ticked</span>
            <span><b>${days}</b> busy ${days === 1 ? 'day' : 'days'}</span>
            <small>from your lists</small>
          </div>
        </div>

        <div class="board-wrap"><div class="board" style="--z:${mzoom}">
          <div class="wk">${WEEKDAYS.map(d => `<span>${d}</span>`).join('')}</div>
          <div class="cal">${cells}</div>
          <div class="layer">${m.els.map(elHtml).join('')}</div>
        </div></div>
        <div class="m-legend">
          <p><span>${sel ? 'drag · pinch · twist' : 'tap a day to write'}</span>
            ${showTicks() ? '<span><i>✓ 3</i> = ticked that day</span>' : ''}</p>
          <div class="m-zoom">
            <button data-action="m-zoom" data-dir="-1" aria-label="Zoom out" ${mzoom > 1 ? '' : 'disabled'}>−</button>
            <span>${mzoom.toFixed(1).replace('.0', '')}×</span>
            <button data-action="m-zoom" data-dir="1" aria-label="Zoom in" ${mzoom < ZMAX ? '' : 'disabled'}>+</button>
          </div>
        </div>

        <div class="spacer"></div>
        <div class="dock m-dock">${dock}</div>
      </section>
      ${msheet ? monthSheet(key, m, g) : ''}`;
  }

  function monthSheet(key, m, g) {
    const wrapSheet = (label, body) => `
      <div class="sheet-wrap ${sheetFresh ? 'fresh' : ''}">
        <div class="sheet-backdrop" data-action="m-close"></div>
        <div class="sheet m-sheet" role="dialog" aria-label="${label}">${body}</div>
      </div>`;

    if (msheet === 'day') {
      const d = new Date(g.Y, g.M - 1, mday);
      const ticks = state.log[ymd(d)] || [];
      const title = `${d.toLocaleString('en', { weekday: 'short' }).toLowerCase()}, ${mday} ${monthName(g.Y, g.M, 'short')}`;
      return wrapSheet(title, `
        <div class="m-sheet-head"><h3>${title}</h3><span>${ticks.length ? `${ticks.length} ticked` : ''}</span></div>
        <label class="sheet-label" for="m-note">a little note</label>
        <input id="m-note" class="field m-note" data-field="m-note" maxlength="40" autocomplete="off" value="${esc(m.notes[mday] || '')}">
        <p class="sheet-label">ticked off this day</p>
        ${ticks.length
          ? `<ul class="m-ticks">${ticks.map(x => `<li>${SMALL_TICK}<span>${esc(x.t)}${sticker(x.t)}</span><i>${esc(x.l)}</i></li>`).join('')}</ul>`
          : '<p class="m-empty">nothing ticked this day</p>'}
        <div class="m-row">
          <span>show ticks on the calendar</span>
          <button class="switch ${showTicks() ? 'on' : ''}" role="switch" aria-checked="${showTicks()}" aria-label="Show ticks on the calendar" data-action="m-ticks"></button>
        </div>
        <div class="m-btns">
          <button class="pill ghost" data-action="m-photo">add photo</button>
          <button class="pill" data-action="m-close">done</button>
        </div>`);
    }

    if (msheet === 'tray') {
      const items = mtab === 'stamps'
        ? R.STAMPS.map(([t, shape], i) => `<button class="tray-btn" data-action="m-add-stamp" data-i="${i}"><span class="tray-stamp sh-${shape}">${esc(t)}</span></button>`)
        : R.STICKERS.filter(s => s.tab === mtab).map(s => `<button class="tray-btn" data-action="m-add-stk" data-k="${s.id}" aria-label="${s.id.replace('-', ' ')}">${R.stickerSvg(s, 'aria-hidden="true"')}</button>`);
      return wrapSheet('Stickers', `
        <div class="m-tabs">${TABS.map(([id, label]) => `<button class="chip ${mtab === id ? 'on' : ''}" data-action="m-tab" data-tab="${id}">${label}</button>`).join('')}</div>
        <div class="tray ${mtab === 'stamps' ? 'stamps' : ''}">${items.join('')}</div>`);
    }

    if (msheet === 'text') {
      return wrapSheet('Words', `
        <h3>${mtext.id ? 'edit words' : 'add words'}</h3>
        <textarea class="field m-words" data-field="m-text" rows="2" maxlength="60" aria-label="Words">${esc(mtext.t)}</textarea>
        <div class="m-shapes">${R.SHAPES.map(s => `<button class="chip ${mtext.shape === s ? 'on' : ''}" data-action="m-shape" data-shape="${s}">${s}</button>`).join('')}</div>
        <div class="m-btns">
          <button class="pill ghost" data-action="m-close">cancel</button>
          <button class="pill" data-action="m-words-done">done</button>
        </div>`);
    }

    // export
    const share = coarse && navigator.canShare && navigator.canShare({ files: [new File([''], 'x.png', { type: 'image/png' })] });
    return wrapSheet('Save your month', `
      <h3>save your month</h3>
      <div class="m-preview">${mexp.preview
        ? `<img src="${mexp.preview}" alt="Preview of your month">`
        : `<span class="m-busy">${mascot(true)}drawing…</span>`}</div>
      <div class="seg">
        <button class="${mexp.fmt === 'png' ? 'on' : ''}" data-action="m-fmt" data-fmt="png">image</button>
        <button class="${mexp.fmt === 'pdf' ? 'on' : ''}" data-action="m-fmt" data-fmt="pdf">pdf</button>
      </div>
      <div class="m-row">
        <span>show ✓ ticks</span>
        <button class="switch ${mexp.ticks ? 'on' : ''}" role="switch" aria-checked="${mexp.ticks}" aria-label="Show ticks" data-action="m-exp" data-opt="ticks"></button>
      </div>
      <div class="m-row">
        <span>dotted paper</span>
        <button class="switch ${mexp.dots ? 'on' : ''}" role="switch" aria-checked="${mexp.dots}" aria-label="Dotted paper" data-action="m-exp" data-opt="dots"></button>
      </div>
      <div class="m-btns">
        <button class="pill ghost" data-action="m-close">cancel</button>
        <button class="pill" data-action="m-save" ${mexp.blob ? '' : 'disabled'}>${mexp.fmt === 'pdf' ? 'save pdf' : share ? 'save to photos' : 'download'}</button>
      </div>`);
  }

  // where a new photo / sticker / text goes: the middle of the part of the board you can see
  function spot() {
    const b = app.querySelector('.board').getBoundingClientRect();
    const w = app.querySelector('.board-wrap').getBoundingClientRect();
    const a = app.getBoundingClientRect();
    const top = Math.max(b.top, a.top, 0), bottom = Math.min(b.bottom, a.bottom, innerHeight - 90);
    const y = top < bottom ? (top + bottom) / 2 : b.top + b.height / 2;
    const x = (Math.max(b.left, w.left) + Math.min(b.right, w.right)) / 2;
    // a little scatter (less when zoomed in), so a few added in a row don't stack exactly on top of each other
    return { x: (x - b.left) * 100 / b.width + (Math.random() * 30 - 15) / mzoom, y: (y - b.top) * 100 / b.width + (Math.random() * 16 - 8) / mzoom };
  }

  const dayCentre = (g, n) => {
    const i = g.off + n - 1;
    return { x: (i % 7 + .5) * 100 / 7, y: R.WK + (Math.floor(i / 7) + .5) * R.CELL };
  };

  function addEl(key, e, at) {
    const m = monthOf(key, true);
    Object.assign(e, at || spot(), { id: uid(), r: Math.round(Math.random() * 10 - 5) });
    m.els.push(e);
    msel = e.id;
    save();
    sfx('pop');
  }

  // opens the drawing pad (with an earlier drawing's strokes when editing one) and stores the result:
  // the picture under p, its strokes under s, both in the photo store; null when cancelled or left empty
  async function drawSomething(old) {
    let strokes = [];
    if (old && old.s) {
      try { strokes = await (await fetch(await R.photos.url(old.s))).json(); } catch (e) { /* draw fresh */ }
    }
    const res = await window.Draw.open({ strokes });
    if (!res) return null;
    const p = uid(), s = uid();
    try {
      await R.photos.put(p, res.blob);
      await R.photos.put(s, new Blob([JSON.stringify(res.strokes)], { type: 'application/json' }));
    } catch (e) {
      toast('couldn’t save that drawing');
      return null;
    }
    if (old) { R.photos.del(old.p); if (old.s) R.photos.del(old.s); }
    sfx('pop');
    return { p, s, a: res.a, f: res.f };
  }

  // photos come from a file picker that lives outside #app, so re-rendering doesn't lose it
  const picker = document.createElement('input');
  picker.type = 'file';
  picker.accept = 'image/*';
  picker.multiple = true;
  picker.hidden = true;
  document.body.appendChild(picker);
  let pickFor = null; // { at } on the month page (at = where to put it), { recipe: id }, { note: id } or { item: [list id, item id] }

  const pickPhotos = to => {
    pickFor = to;
    picker.multiple = !to.recipe && !to.item;  // a recipe or a wish has one photo, notes and months take a few
    picker.click();
  };

  picker.addEventListener('change', async () => {
    const files = [...picker.files];
    picker.value = '';
    if (pickFor && pickFor.recipe) {
      const r = state.recipes.find(x => x.id === pickFor.recipe);
      if (!r || !files[0]) return;
      try {
        // keep the whole photo, then crop it square; the crop becomes the recipe photo on "use photo"
        const { blob } = await R.shrinkPhoto(files[0]);
        const o = uid();
        await R.photos.put(o, blob);
        const img = await R.loadImage(R.photos.cached(o));
        openCrop(r, { rid: r.id }, o, img.naturalWidth, img.naturalHeight, true);
      } catch (e) {
        toast('couldn’t add that photo');
      }
      return;
    }
    if (pickFor && pickFor.item) {
      const [lid, iid] = pickFor.item;
      const l = state.lists.find(x => x.id === lid);
      const i = l && findItem(l, iid);
      if (!i || !files[0]) return;
      try {
        const { blob } = await R.shrinkPhoto(files[0]);
        const o = uid();
        await R.photos.put(o, blob);
        const img = await R.loadImage(R.photos.cached(o));
        openCrop(i, { lid, iid }, o, img.naturalWidth, img.naturalHeight, true);
      } catch (e) {
        toast('couldn’t add that photo');
      }
      return;
    }
    if (pickFor && pickFor.note) {
      const n = state.notes.find(x => x.id === pickFor.note);
      if (!n) return;
      for (const f of files) {
        try {
          const { blob, a } = await R.shrinkPhoto(f);
          const id = uid();
          await R.photos.put(id, blob);
          n.photos.push({ id: uid(), p: id, a, frame: 'polaroid' });
          touch(n);
          sfx('pop');
          render();
        } catch (e) {
          toast('couldn’t add that photo');
        }
      }
      return;
    }
    const key = viewKey();
    const at = pickFor && pickFor.at;
    for (const [n, f] of files.entries()) {
      try {
        const { blob, a } = await R.shrinkPhoto(f);
        const id = uid();
        await R.photos.put(id, blob);
        addEl(key, { type: 'photo', p: id, a, w: 26, frame: 'polaroid' }, at && { x: at.x + n * 4, y: at.y + n * 4 });
        render();
      } catch (e) {
        toast('couldn’t add that photo');
      }
    }
  });

  async function buildExport() {
    const run = mexp;
    const key = viewKey();
    const m = monthOf(key);
    const g = grid(key);
    const { ticked, days } = monthStats(key);
    try {
      const canvas = await R.renderPage({
        title: monthName(g.Y, g.M),
        sub: `${g.Y}${state.user ? ' · ' + state.user : ''}`,
        stats: ticked ? `${ticked} ticked · ${days} busy ${days === 1 ? 'day' : 'days'}` : '',
        highlights: m.hl || '',
        rows: g.rows,
        cells: g.cells.map(c => ({ n: c.n, out: c.out, note: c.out ? '' : m.notes[c.n], ticks: (state.log[c.key] || []).length })),
        els: m.els,
        showTicks: run.ticks,
        dots: run.dots,
      });
      const blob = await R.exportBlob(canvas, run.fmt);
      if (mexp !== run) return; // closed, or the options changed meanwhile
      run.preview = canvas.toDataURL('image/jpeg', .75);
      run.blob = blob;
    } catch (e) {
      if (mexp !== run) return;
      msheet = null;
      mexp = null;
      toast('couldn’t draw that, sorry');
    }
    render();
  }

  function deliver(blob, name) {
    const file = new File([blob], name, { type: blob.type });
    if (coarse && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file] }).catch(() => {});
      return;
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    toast('saved ✿');
  }

  const closeMonthSheet = () => { msheet = null; mday = null; mtext = null; mexp = null; };

  // ---------- notebook: recipes, notes and the monthly pages ----------
  // state.recipes = [{ id, name, photo: { p, a } | null, link, time, serves, ings: [row], steps: [row], notes, created, updated }]
  //   a row is { id, t: text, d: ticked off while cooking }
  //   flavour: '' | 'savoury' | 'sweet'
  // state.notes = [{ id, title, body, tint, paper: 'dots' | 'blank', stamp: 'YYYY-MM-DD' | null,
  //   photos: [{ id, p (photo id), a (height / width), frame }], created, updated }]

  const BOOK = icon24('<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z M5 17a3 3 0 0 1 3-3h11 M9 8h6"/>');
  const LISTS = icon24('<path d="M9 6h11 M9 12h11 M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>');
  const CLOCK = icon24('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>');
  const PLATE = icon24('<path d="M3 11h18c0 5-4 8-9 8s-9-3-9-8z M12 8V6 M8.5 8.5 7.5 7 M15.5 8.5l1-1.5"/>');
  const LINK = icon24('<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1 M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>');
  const CART = icon24('<path d="M3 4h2.5l2 11h10l2-8H7 M9 19.5a1 1 0 1 0 0 .01 M17 19.5a1 1 0 1 0 0 .01"/>');
  const BOOK_TABS = ['months', 'recipes', 'notes'];
  const FLAVOURS = ['savoury', 'sweet'];
  const TINTS = ['paper', 'butter', 'peach', 'sage', 'sky'];

  const routeId = prefix => {
    const r = route();
    return r.startsWith(prefix) ? r.slice(prefix.length) : null;
  };
  const currentRecipe = () => state.recipes.find(x => x.id === routeId('/recipe/'));
  const currentNote = () => state.notes.find(x => x.id === routeId('/note/'));
  const touch = x => { x.updated = Date.now(); save(); };
  const shortDate = t => ymd(t) === ymd(Date.now()) ? 'today'
    : `${new Date(t).getDate()} ${new Date(t).toLocaleString('en', { month: 'short' }).toLowerCase()}`;

  // only http(s) links, and "bbcgoodfood.com/…" without the https:// still works
  function linkUrl(s) {
    s = (s || '').trim();
    if (!s) return '';
    if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
    try {
      const u = new URL(s);
      return u.hostname.includes('.') ? u.href : '';
    } catch (e) { return ''; }
  }
  const host = s => { try { return new URL(linkUrl(s)).hostname.replace(/^www\./, ''); } catch (e) { return ''; } };

  // pasting a whole recipe: strip bullets and "1." / "step 2:" off the front of each line
  const cleanLine = s => s.replace(/^\s*(?:[-–•*·▢☐□✓✔]|\d+[.)](?!\d)|step\s*\d+\s*[:.)-]?)\s*/i, '').trim();

  // drop recipes and notes that were started but never written in, and empty rows
  function tidyBook() {
    const before = state.recipes.length + state.notes.length;
    let rows = 0;
    state.recipes.forEach(r => ['ings', 'steps'].forEach(k => {
      const kept = r[k].filter(x => x.t.trim());
      rows += r[k].length - kept.length;
      r[k] = kept;
    }));
    state.recipes = state.recipes.filter(r =>
      r.name.trim() || r.photo || r.ings.length || r.steps.length || r.notes.trim() || r.link.trim());
    state.notes = state.notes.filter(n => n.title.trim() || n.body.trim() || n.photos.length);
    if (rows || state.recipes.length + state.notes.length !== before) save();
  }

  function monthKeys() {
    const keys = new Set([ymd(Date.now()).slice(0, 7)]);
    Object.entries(state.months).forEach(([k, m]) => {
      if (m.hl || m.els.length || Object.keys(m.notes).length) keys.add(k);
    });
    Object.keys(state.log).forEach(k => keys.add(k.slice(0, 7)));
    return [...keys].sort().reverse();
  }

  function recipeCard(r) {
    const meta = [r.ings.length && `${r.ings.length} ingredient${r.ings.length === 1 ? '' : 's'}`, r.time.trim()].filter(Boolean).join(' · ');
    const q = [r.name, r.notes, ...r.ings.map(x => x.t)].join(' ').toLowerCase();
    return `
      <a class="r-card" href="#/recipe/${r.id}" data-q="${esc(q)}">
        <div class="r-thumb ${r.photo ? 'has' : ''}">${r.photo ? `<img data-photo="${esc(r.photo.p)}" alt="" draggable="false">` : DOODLES.recipe}</div>
        <h3>${esc(r.name.trim() || 'untitled recipe')}</h3>
        <small>${esc(meta || 'nothing here… yet')}</small>
        ${host(r.link) ? `<small class="r-host">${LINK}${esc(host(r.link))}</small>` : ''}
      </a>`;
  }

  const noteCard = n => `
    <a class="n-card t-${n.tint}" href="#/note/${n.id}" data-q="${esc((n.title + ' ' + n.body).toLowerCase())}">
      ${n.photos.length ? `<img class="n-thumb" data-photo="${esc(n.photos[0].p)}" alt="" draggable="false">` : ''}
      ${n.title.trim() ? `<h3>${esc(n.title)}</h3>` : ''}
      ${n.body.trim() ? `<p>${esc(n.body.trim())}</p>` : ''}
      ${n.stamp ? `<small class="n-stamp sm">${stampLabel(n.stamp)}</small>` : `<small>${shortDate(n.updated)}</small>`}
    </a>`;

  function monthCard(key) {
    const [Y, M] = key.split('-').map(Number);
    const m = monthOf(key);
    const { ticked } = monthStats(key);
    const photos = m.els.filter(e => e.type === 'photo').length;
    const bits = [ticked && `${ticked} ticked`, photos && `${photos} photo${photos === 1 ? '' : 's'}`,
      Object.keys(m.notes).length && `${Object.keys(m.notes).length} day notes`].filter(Boolean);
    return `
      <a class="card" href="#/month/${key}">
        <div class="card-art">${DOODLES.month}</div>
        <div class="card-body">
          <h3>${monthName(Y, M)} <span class="b-year">${Y}</span></h3>
          <small>${key === ymd(Date.now()).slice(0, 7) ? 'this month · ' : ''}${bits.join(' · ') || 'a blank page'}</small>
        </div>
      </a>`;
  }

  function bookView() {
    const tab = BOOK_TABS.includes(state.bookTab) ? state.bookTab : 'months';
    const recipes = [...state.recipes].sort((a, b) => b.created - a.created);
    const notes = [...state.notes].sort((a, b) => b.updated - a.updated);
    const empty = (art, words) => `<div class="empty b-empty"><div class="art">${art}</div><p>${words}</p></div>`;
    const search = n => n > 3 ? `<input class="b-search" data-field="b-q" type="search" autocomplete="off" placeholder="search…" aria-label="Search ${tab}">` : '';

    let body, add;
    if (tab === 'recipes') {
      const fl = FLAVOURS.includes(state.flavour) ? state.flavour : 'all';
      const shown = fl === 'all' ? recipes : recipes.filter(r => r.flavour === fl);
      const sub = ['all', ...FLAVOURS].map(f => `<button class="${fl === f ? 'on' : ''}" data-action="b-flavour" data-f="${f}">${f}<i>${
        f === 'all' ? recipes.length : recipes.filter(r => r.flavour === f).length}</i></button>`).join('');
      body = !recipes.length ? empty(DOODLES.recipe, 'no recipes yet<br>jot down a favourite ♡')
        : `<div class="b-sub">${sub}</div>${search(recipes.length)}${shown.length
          ? `<div class="r-grid">${shown.map(recipeCard).join('')}</div>`
          : `<p class="empty">no ${fl} recipes yet<br>pick savoury or sweet on a recipe</p>`}`;
      add = '<button class="pill grow" data-action="b-new-recipe">New recipe</button>';
    } else if (tab === 'notes') {
      body = notes.length ? `${search(notes.length)}<div class="n-grid">${notes.map(noteCard).join('')}</div>`
        : empty(DOODLES.note, 'a blank page<br>ideas, thoughts, anything ✿');
      add = '<button class="pill grow" data-action="b-new-note">New note</button>';
    } else {
      body = `<div class="cards">${monthKeys().map(monthCard).join('')}</div>`;
      add = '<a class="pill grow" href="#/month">This month</a>';
    }

    return `
      <section class="screen">
        <div class="home-head">
          <div>
            <p class="hello">recipes, notes &amp; months ✿</p>
            <h1 class="home-title">your notebook</h1>
          </div>
          <span class="buddy">${mascot()}</span>
        </div>
        <div class="chips">
          ${BOOK_TABS.map(id => `<button class="chip ${tab === id ? 'on' : ''}" data-action="b-tab" data-tab="${id}">${id}${
            id === 'months' ? '' : `<i>${(id === 'recipes' ? recipes : notes).length}</i>`}</button>`).join('')}
        </div>
        ${body}
        <p class="empty b-none" hidden>nothing matches</p>
        <div class="spacer"></div>
        <div class="dock dock-row">
          <a class="pill ghost" href="#/">${LISTS}lists</a>
          ${add}
        </div>
      </section>`;
  }

  function recipeView(r) {
    const got = r.ings.filter(x => x.d).length;
    const ticked = got + r.steps.filter(x => x.d).length;
    const url = linkUrl(r.link);
    const rows = (list, field) => r[list].map((x, i) => `
      <li class="r-row ${x.d ? 'done' : ''} ${x.id === justAdded ? 'new' : ''}" data-row="${x.id}">
        <button class="${list === 'ings' ? 'r-dot' : 'r-num'}" data-action="b-tick" data-list="${list}"
          aria-label="${x.d ? 'Untick' : 'Tick'} ${esc(x.t)}">${list === 'ings' ? (x.d ? SMALL_TICK : '') : x.d ? SMALL_TICK : i + 1}</button>
        ${list === 'ings'
          ? `<input data-field="${field}" value="${esc(x.t)}" maxlength="120" autocomplete="off" aria-label="Ingredient">`
          : `<textarea class="autogrow" data-field="${field}" rows="1" maxlength="600" aria-label="Step ${i + 1}">${esc(x.t)}</textarea>`}
        <button class="icon-btn" data-action="b-row-del" data-list="${list}" aria-label="Remove">×</button>
      </li>`).join('');
    const addRow = (list, placeholder) => `
      <form class="add-row" data-form="r-add" data-list="${list}">
        <span class="add-plus" aria-hidden="true">+</span>
        <input name="text" maxlength="${list === 'ings' ? 120 : 600}" autocomplete="off" placeholder="${placeholder}" aria-label="${placeholder}">
      </form>`;

    return `
      <section class="screen recipe">
        <div class="topbar">
          <a class="text-btn" href="#/book">Back</a>
          <span class="kind-tag">recipe</span>
        </div>
        ${r.photo
          ? `<div class="r-photo"><img data-photo="${esc(r.photo.p)}" alt="" draggable="false" style="aspect-ratio:${Math.min(1.25, Math.max(.6, 1 / r.photo.a)).toFixed(3)}">
              <div class="r-photo-btns"><button class="chip" data-action="b-crop">crop</button><button class="chip" data-action="b-photo">change</button><button class="chip" data-action="b-photo-del">remove</button></div></div>`
          : `<button class="r-photo r-add-photo" data-action="b-photo">${ADD_ICONS.photo}<span>add a photo</span></button>`}
        <input class="title-input" data-field="r-name" value="${esc(r.name)}" maxlength="60" placeholder="recipe name" aria-label="Recipe name">
        <div class="b-sub r-flavours">${FLAVOURS.map(f =>
          `<button class="${r.flavour === f ? 'on' : ''}" data-action="b-set-flavour" data-f="${f}">${f}</button>`).join('')}</div>
        <div class="r-meta">
          <label class="r-chip">${CLOCK}<input data-field="r-time" value="${esc(r.time)}" maxlength="16" placeholder="time" aria-label="Time"></label>
          <label class="r-chip">${PLATE}<input data-field="r-serves" value="${esc(r.serves)}" maxlength="16" placeholder="serves" aria-label="Serves"></label>
        </div>
        <div class="r-link">
          ${LINK}<input data-field="r-link" type="url" inputmode="url" value="${esc(r.link)}" maxlength="500" autocomplete="off" placeholder="paste a link to the recipe…" aria-label="Link">
          <a class="r-open" href="${esc(url)}" target="_blank" rel="noopener noreferrer" ${url ? '' : 'hidden'}>open ↗</a>
        </div>

        <div class="group">
          <div class="group-head"><h2 class="r-h">ingredients</h2><span class="group-count">${got ? `${got}/${r.ings.length} got` : ''}</span></div>
          <ul class="r-rows">${rows('ings', 'r-ing')}</ul>
          ${addRow('ings', 'add an ingredient…')}
          ${r.ings.length ? `<button class="text-btn r-shop" data-action="b-shop">${CART}add to a grocery list</button>` : ''}
        </div>

        <div class="group">
          <div class="group-head"><h2 class="r-h">steps</h2></div>
          <ol class="r-rows">${rows('steps', 'r-step')}</ol>
          ${addRow('steps', 'add a step…')}
        </div>

        <div class="group">
          <div class="group-head"><h2 class="r-h">notes</h2></div>
          <textarea class="r-notes autogrow" data-field="r-notes" rows="2" maxlength="2000" placeholder="swaps, tips, who loved it…" aria-label="Notes">${esc(r.notes)}</textarea>
        </div>

        <div class="list-foot">
          <button class="text-btn" data-action="b-untick" ${ticked ? '' : 'disabled style="opacity:.4"'}>Untick all</button>
          <button class="text-btn danger" data-action="b-del-recipe">Delete recipe</button>
        </div>
      </section>
      ${bsheet ? shopSheet() : ''}
      ${crop ? cropView() : ''}`;
  }

  // ---------- square crop for recipe and wish photos ----------
  // the crop is a square of side min(w, h) / z around (cx, cy), all in the whole photo's pixels

  const cropView = () => `
    <div class="sheet-wrap crop-wrap ${sheetFresh ? 'fresh' : ''}">
      <div class="sheet-backdrop"></div>
      <div class="sheet" role="dialog" aria-label="Crop photo">
        <h3>crop your photo</h3>
        <div class="crop-view"><img class="crop-img" data-photo="${esc(crop.o)}" alt="" draggable="false"><i class="crop-grid"></i></div>
        <input class="crop-zoom" type="range" min="1" max="4" step="0.01" value="${crop.z}" data-field="crop-z" aria-label="Zoom">
        <p class="crop-hint">drag to move · pinch or slide to zoom</p>
        <div class="m-btns">
          <button class="pill ghost" data-action="b-crop-cancel">cancel</button>
          <button class="pill" data-action="b-crop-done">use photo</button>
        </div>
      </div>
    </div>`;

  const cropSide = () => Math.min(crop.w, crop.h) / crop.z;

  function clampCrop() {
    crop.z = Math.min(4, Math.max(1, crop.z));
    const h = cropSide() / 2;
    crop.cx = Math.min(crop.w - h, Math.max(h, crop.cx));
    crop.cy = Math.min(crop.h - h, Math.max(h, crop.cy));
  }

  function paintCrop() {
    const view = app.querySelector('.crop-view');
    if (!view || !crop) return;
    clampCrop();
    const V = view.clientWidth, k = V / cropSide();
    const img = view.querySelector('.crop-img');
    img.style.width = crop.w * k + 'px';
    img.style.height = crop.h * k + 'px';
    img.style.transform = `translate(${V / 2 - crop.cx * k}px, ${V / 2 - crop.cy * k}px)`;
    const zoom = app.querySelector('.crop-zoom');
    if (zoom) zoom.value = crop.z;
  }

  // whose photo is being cropped: a recipe ({ rid }) or a wish ({ lid, iid })
  function cropOwner(c) {
    if (c.rid) return state.recipes.find(x => x.id === c.rid);
    const l = state.lists.find(x => x.id === c.lid);
    return l && findItem(l, c.iid);
  }

  function openCrop(r, ref, o, w, h, fresh) {
    const c = r.photo && r.photo.o === o && r.photo.c; // start from the last crop of this photo
    crop = { ...ref, o, w, h, cx: c ? c.x * w : w / 2, cy: c ? c.y * h : h / 2, z: c ? c.z : 1, fresh };
    sheetFresh = true;
    render();
  }

  // the whole photo's real size, from the photo itself
  async function recrop(r, ref) {
    const o = r.photo.o || r.photo.p;
    try {
      const img = await R.loadImage(await R.photos.url(o));
      openCrop(r, ref, o, img.naturalWidth, img.naturalHeight, false);
    } catch (e) {
      toast('couldn’t open that photo');
    }
  }

  async function finishCrop() {
    const c = crop;
    const r = cropOwner(c);
    if (!r) { crop = null; render(); return; }
    clampCrop();
    const s = cropSide();
    try {
      const blob = await R.cropSquare(await R.photos.url(c.o), c.cx - s / 2, c.cy - s / 2, s);
      const id = uid();
      await R.photos.put(id, blob);
      if (r.photo) {
        if (r.photo.p !== c.o) R.photos.del(r.photo.p);
        if (r.photo.o && r.photo.o !== c.o) R.photos.del(r.photo.o);
      }
      r.photo = { p: id, a: 1, o: c.o, c: { x: c.cx / c.w, y: c.cy / c.h, z: c.z } };
      if (c.rid) touch(r); else save();
      sfx('pop');
    } catch (e) {
      toast('couldn’t crop that photo');
    }
    crop = null;
    render();
  }

  // a just-picked photo that was never used goes away again
  function dropCrop() {
    const r = cropOwner(crop);
    if (crop.fresh && !(r && r.photo && (r.photo.o === crop.o || r.photo.p === crop.o))) R.photos.del(crop.o);
    crop = null;
  }

  // dragging moves the photo under the square, two fingers or the wheel zoom it
  let cropGest = null;
  app.addEventListener('pointerdown', ev => {
    const view = ev.target.closest('.crop-view');
    if (!view || !crop) return;
    ev.preventDefault();
    view.setPointerCapture(ev.pointerId);
    if (!cropGest) cropGest = { pts: new Map(), V: view.clientWidth };
    cropGest.pts.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
    cropGest.d = null;
  });
  app.addEventListener('pointermove', ev => {
    const g = cropGest;
    if (!g || !g.pts.has(ev.pointerId)) return;
    const prev = g.pts.get(ev.pointerId);
    g.pts.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
    if (g.pts.size > 1) {
      const [a, b] = [...g.pts.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      if (g.d) crop.z *= d / g.d;
      g.d = d;
    } else {
      const k = g.V / cropSide();
      crop.cx -= (ev.clientX - prev.x) / k;
      crop.cy -= (ev.clientY - prev.y) / k;
    }
    paintCrop();
  });
  const endCrop = ev => {
    if (!cropGest || !cropGest.pts.has(ev.pointerId)) return;
    cropGest.pts.delete(ev.pointerId);
    cropGest.d = null;
    if (!cropGest.pts.size) cropGest = null;
  };
  app.addEventListener('pointerup', endCrop);
  app.addEventListener('pointercancel', endCrop);
  app.addEventListener('wheel', ev => {
    if (!crop || !ev.target.closest('.crop-view')) return;
    ev.preventDefault();
    crop.z *= Math.exp(-ev.deltaY * .002);
    paintCrop();
  }, { passive: false });

  const groceryLists = () => state.lists.filter(l => l.kind === 'grocery').sort((a, b) => b.created - a.created);

  const shopSheet = () => `
    <div class="sheet-wrap ${sheetFresh ? 'fresh' : ''}">
      <div class="sheet-backdrop" data-action="b-close"></div>
      <div class="sheet" role="dialog" aria-label="Add to a grocery list">
        <h3>add to which list?</h3>
        <div class="b-pick">
          ${groceryLists().map(l => `<button class="b-pick-btn" data-action="b-to-list" data-id="${l.id}">${CART}<span>${esc(l.name)}</span></button>`).join('')}
          <button class="b-pick-btn ghost" data-action="b-to-list" data-id="new"><span>+ a new grocery list</span></button>
        </div>
      </div>
    </div>`;

  // ingredients you haven't ticked ("got") go on the list, skipping ones already there
  function addToGroceries(r, l) {
    if (!l.sections.length) l.sections.push({ id: uid(), name: kindOf('grocery').group, items: [] });
    const on = new Set(l.sections.flatMap(s => s.items).filter(i => !i.done).map(i => i.text.toLowerCase()));
    const add = r.ings.filter(x => !x.d).map(x => x.t.trim()).filter(t => t && !on.has(t.toLowerCase()));
    add.forEach(t => l.sections[0].items.push({ id: uid(), text: t.slice(0, 80), done: false }));
    save();
    sfx(add.length ? 'pop' : 'tap');
    toast(add.length ? `added ${add.length} to ${l.name} ✿` : `already on ${l.name} ✿`);
  }

  // "tue 10 nov", with the year only when it isn't this year
  function stampLabel(key) {
    const [Y, M, D] = key.split('-').map(Number);
    const d = new Date(Y, M - 1, D);
    return `${d.toLocaleString('en', { weekday: 'short' })} ${D} ${d.toLocaleString('en', { month: 'short' })}${
      Y === new Date().getFullYear() ? '' : ' ' + Y}`.toLowerCase();
  }

  // photos and drawings; a drawing (frame 'ink') sits straight on the paper at the size it was drawn
  const notePhoto = (x, i) => `
    <button class="n-ph fr-${x.frame} ${x.id === nsel ? 'sel' : ''}" data-action="b-nphoto" data-id="${x.id}"
      style="--r:${x.frame === 'ink' ? 0 : i % 2 ? 2.5 : -2}deg;${x.frame === 'ink' ? `--w:${Math.max(70, Math.round(x.f * 330))}px` : ''}" aria-label="${x.frame === 'ink' ? 'Drawing' : 'Photo'}">
      <img data-photo="${esc(x.p)}" alt="" draggable="false" style="aspect-ratio:${x.frame === 'round' ? 1 : (1 / x.a).toFixed(4)}">
    </button>`;

  function noteView(n) {
    const sel = n.photos.find(x => x.id === nsel);
    return `
      <section class="screen note t-${n.tint} ${n.paper === 'blank' ? '' : 'dots'}">
        <div class="topbar">
          <a class="text-btn" href="#/book">Back</a>
          <span class="kind-tag">${n.body || n.title ? 'edited ' + shortDate(n.updated) : 'new note'}</span>
        </div>
        ${n.stamp ? `<label class="n-stamp">${stampLabel(n.stamp)}<input type="date" data-field="n-stamp" value="${n.stamp}" aria-label="Date"></label>` : ''}
        <input class="title-input" data-field="n-title" value="${esc(n.title)}" maxlength="60" placeholder="title" aria-label="Title">
        <div class="n-tools">
          <div class="n-tints">
            ${TINTS.map(t => `<button class="n-tint t-${t} ${n.tint === t ? 'on' : ''}" data-action="b-tint" data-tint="${t}" aria-label="${t} paper"></button>`).join('')}
          </div>
          <div class="b-sub">${['dots', 'blank'].map(p => `<button class="${(n.paper || 'dots') === p ? 'on' : ''}" data-action="b-paper" data-paper="${p}">${p}</button>`).join('')}</div>
        </div>
        ${n.photos.length ? `<div class="n-photos ${n.photos.length === 1 ? 'one' : ''}">${n.photos.map(notePhoto).join('')}</div>` : ''}
        ${sel ? `<div class="m-tools n-ph-tools">
          ${sel.frame === 'ink' ? '<button class="chip" data-action="b-ndraw-edit">edit drawing</button>'
            : FRAMES.map(f => `<button class="chip ${sel.frame === f ? 'on' : ''}" data-action="b-nframe" data-frame="${f}">${f}</button>`).join('')}
          <button class="chip" data-action="b-nphoto-del">remove</button>
        </div>` : ''}
        <textarea class="n-body autogrow" data-field="n-body" maxlength="20000" placeholder="write anything…" aria-label="Note">${esc(n.body)}</textarea>
        <div class="list-foot">
          <span></span>
          <button class="text-btn danger" data-action="b-del-note">Delete note</button>
        </div>
        <div class="dock m-dock">
          <button class="pill ghost" data-action="b-nphoto-add">${ADD_ICONS.photo}photo</button>
          <button class="pill ghost" data-action="b-ndraw">${ADD_ICONS.draw}draw</button>
          <button class="pill ghost" data-action="b-stamp">${CAL}${n.stamp ? 'no date' : 'date'}</button>
        </div>
      </section>`;
  }

  const grow = el => { el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'; };

  function addRows(r, list, lines) {
    const made = lines.map(t => ({ id: uid(), t, d: false }));
    r[list].push(...made);
    touch(r);
    sfx('pop');
    justAdded = made.length === 1 ? made[0].id : null;
    pendingFocus = `form[data-list="${list}"] input`;
    render();
  }

  function bookAction(t) {
    const r = currentRecipe();
    const n = currentNote();
    const rowOf = () => r && r[t.dataset.list].find(x => x.id === t.closest('[data-row]').dataset.row);

    switch (t.dataset.action) {
      case 'b-flavour':
        sfx('tap'); state.flavour = t.dataset.f; save(); render(); return;
      case 'b-set-flavour':
        r.flavour = r.flavour === t.dataset.f ? '' : t.dataset.f;
        sfx('tap'); touch(r); render(); return;
      case 'b-tab':
        sfx('tap'); state.bookTab = t.dataset.tab; save(); render(); return;
      case 'b-new-recipe': {
        sfx('pop');
        const x = { id: uid(), name: '', photo: null, link: '', time: '', serves: '', ings: [], steps: [], notes: '', created: Date.now(), updated: Date.now() };
        state.recipes.push(x);
        save();
        pendingFocus = { sel: '[data-field="r-name"]' };
        go('/recipe/' + x.id);
        return;
      }
      case 'b-new-note': {
        sfx('pop');
        const x = { id: uid(), title: '', body: '', tint: 'paper', paper: 'dots', stamp: null, photos: [], created: Date.now(), updated: Date.now() };
        state.notes.push(x);
        save();
        pendingFocus = { sel: '.n-body' };
        go('/note/' + x.id);
        return;
      }
      case 'b-photo':
        if (r) pickPhotos({ recipe: r.id });
        return;
      case 'b-crop':
        if (r && r.photo) { sfx('tap'); recrop(r, { rid: r.id }); }
        return;
      case 'b-crop-done':
        if (crop) finishCrop();
        return;
      case 'b-crop-cancel':
        if (crop) { dropCrop(); render(); }
        return;
      case 'b-photo-del':
        if (!r || !r.photo) return;
        R.photos.del(r.photo.p);
        if (r.photo.o && r.photo.o !== r.photo.p) R.photos.del(r.photo.o);
        r.photo = null;
        sfx('poof'); touch(r); render();
        return;
      case 'b-tick': {
        const x = rowOf();
        if (!x) return;
        x.d = !x.d;
        sfx(x.d ? 'scratch' : 'untick'); touch(r); render();
        return;
      }
      case 'b-row-del': {
        const x = rowOf();
        if (!x) return;
        r[t.dataset.list] = r[t.dataset.list].filter(y => y !== x);
        sfx('poof'); touch(r); render();
        return;
      }
      case 'b-untick':
        r.ings.concat(r.steps).forEach(x => { x.d = false; });
        sfx('untick'); touch(r); render();
        return;
      case 'b-del-recipe':
        if ((r.name.trim() || r.ings.length || r.steps.length) && !confirm(`Delete “${r.name.trim() || 'this recipe'}”? This can’t be undone.`)) return;
        if (r.photo) { R.photos.del(r.photo.p); if (r.photo.o) R.photos.del(r.photo.o); }
        state.recipes = state.recipes.filter(x => x !== r);
        sfx('poof'); save(); go('/book');
        return;
      case 'b-shop': {
        const lists = groceryLists();
        if (lists.length === 1) { addToGroceries(r, lists[0]); return; }
        sfx('tap'); bsheet = true; sheetFresh = true; render();
        return;
      }
      case 'b-to-list': {
        let l = state.lists.find(x => x.id === t.dataset.id);
        if (!l) {
          l = { id: uid(), name: 'Groceries', kind: 'grocery', created: Date.now(), sections: [{ id: uid(), name: kindOf('grocery').group, items: [] }] };
          state.lists.push(l);
        }
        bsheet = false;
        render();
        addToGroceries(r, l);
        return;
      }
      case 'b-close':
        bsheet = false; render(); return;
      case 'b-paper':
        sfx('tap'); n.paper = t.dataset.paper; touch(n); render(); return;
      case 'b-stamp':
        sfx(n.stamp ? 'poof' : 'pop'); n.stamp = n.stamp ? null : ymd(Date.now()); touch(n); render(); return;
      case 'b-nphoto-add':
        nsel = null; pickPhotos({ note: n.id }); return;
      case 'b-ndraw':
        sfx('tap');
        nsel = null;
        render();
        drawSomething(null).then(d => {
          if (!d) return;
          n.photos.push({ id: uid(), frame: 'ink', ...d });
          touch(n);
          render();
        });
        return;
      case 'b-ndraw-edit': {
        const x = n.photos.find(y => y.id === nsel);
        if (!x) return;
        drawSomething(x).then(d => {
          if (!d) return;
          Object.assign(x, d);
          touch(n);
          render();
        });
        return;
      }
      case 'b-nphoto':
        sfx('tap'); nsel = nsel === t.dataset.id ? null : t.dataset.id; render(); return;
      case 'b-nframe': {
        const x = n.photos.find(y => y.id === nsel);
        if (x) { sfx('tap'); x.frame = t.dataset.frame; touch(n); render(); }
        return;
      }
      case 'b-nphoto-del': {
        const x = n.photos.find(y => y.id === nsel);
        if (!x) return;
        R.photos.del(x.p);
        if (x.s) R.photos.del(x.s);
        n.photos = n.photos.filter(y => y !== x);
        nsel = null;
        sfx('poof'); touch(n); render();
        return;
      }
      case 'b-tint':
        sfx('tap'); n.tint = t.dataset.tint; touch(n); render(); return;
      case 'b-del-note':
        if ((n.body.trim() || n.photos.length) && !confirm('Delete this note? This can’t be undone.')) return;
        n.photos.forEach(x => { R.photos.del(x.p); if (x.s) R.photos.del(x.s); });
        state.notes = state.notes.filter(x => x !== n);
        sfx('poof'); save(); go('/book');
        return;
    }
  }

  // Enter in an ingredient or step starts the next one; Backspace in an empty one removes it
  function rowKey(el, key) {
    const r = currentRecipe();
    const list = el.dataset.field === 'r-ing' ? 'ings' : 'steps';
    const i = r[list].findIndex(x => x.id === el.closest('[data-row]').dataset.row);
    if (i < 0) return;
    if (key === 'Enter') {
      if (!el.value.trim() || i === r[list].length - 1) {
        pendingFocus = `form[data-list="${list}"] input`;
      } else {
        const x = { id: uid(), t: '', d: false };
        r[list].splice(i + 1, 0, x);
        pendingFocus = { sel: `[data-row="${x.id}"] [data-field]` };
      }
    } else {
      r[list].splice(i, 1);
      const prev = r[list][i - 1];
      pendingFocus = prev ? { sel: `[data-row="${prev.id}"] [data-field]`, end: true } : `form[data-list="${list}"] input`;
    }
    touch(r);
    render();
  }

  function render() {
    resetRepeats();
    const r = route();
    if (!r.startsWith('/list/')) { sheet = null; wsheet = null; wexp = null; }
    if (!r.startsWith('/month')) { msel = null; closeMonthSheet(); mzoom = 1; }
    const oldWrap = app.querySelector('.board-wrap');
    const keepLeft = oldWrap ? oldWrap.scrollLeft : 0;
    if (!r.startsWith('/recipe/')) bsheet = false;
    if (crop && !(crop.rid ? r === '/recipe/' + crop.rid : r === '/list/' + crop.lid)) dropCrop();
    if (!r.startsWith('/note/')) nsel = null;
    if (!r.startsWith('/recipe/') && !r.startsWith('/note/')) tidyBook();
    let html;
    if (r === '/month' || r.startsWith('/month/')) {
      html = monthView(viewKey());
    } else if (r === '/book') {
      html = bookView();
    } else if (r.startsWith('/recipe/') || r.startsWith('/note/')) {
      const x = currentRecipe() || currentNote();
      if (!x) { location.replace('#/book'); return; }
      html = r.startsWith('/recipe/') ? recipeView(x) : noteView(x);
    } else if (r.startsWith('/list/')) {
      const l = currentList();
      html = l ? listView(l) : homeView();
    } else if (r === '/new') {
      if (!draft) draft = { step: 0, name: '', kind: 'grocery' };
      html = wizardView();
    } else if (r === '/hi') {
      html = nameView();
    } else if (r === '/account') {
      html = accountView();
    } else {
      draft = null;
      html = !state.seen && !state.lists.length ? welcomeView() : homeView();
    }

    const key = r + (draft ? ':' + draft.step : '');
    const changed = key !== lastRoute;
    lastRoute = key;

    app.innerHTML = html;
    app.querySelectorAll('img[data-photo]:not([src])').forEach(img =>
      R.photos.url(img.dataset.photo).then(u => { if (u) img.src = u; }).catch(() => {}));
    app.querySelectorAll('textarea.autogrow').forEach(grow);
    if (crop) paintCrop();
    const wrap = app.querySelector('.board-wrap');
    if (wrap && !changed) wrap.scrollLeft = keepLeft;
    justAdded = justToggled = null;
    sheetFresh = false;

    if (changed) {
      app.firstElementChild.classList.add('enter');
      app.scrollTop = 0;
      window.scrollTo(0, 0);
      if (r === '/hi') pendingFocus = pendingFocus || 'input[name=you]';
      if (draft && draft.step === 0) pendingFocus = pendingFocus || 'input[name=name]';
    }
    if (pendingFocus) {
      const el = app.querySelector(pendingFocus.sel || pendingFocus);
      if (el) {
        el.focus({ preventScroll: !changed && !pendingFocus.sel });
        if (pendingFocus.select) el.select();
        if (pendingFocus.end) el.setSelectionRange(el.value.length, el.value.length);
      }
      pendingFocus = null;
    }
    if (hop) { hopBuddy(); hop = false; }
  }

  function hopBuddy() {
    const m = app.querySelector('.buddy > .mascot');
    if (!m) return;
    m.classList.remove('hop');
    void m.getBoundingClientRect(); // restart the animation
    m.classList.add('hop');
    setTimeout(() => m.classList.remove('hop'), 520);
  }

  function burst(x, y, big) {
    const n = big ? 16 : 5;
    for (let i = 0; i < n; i++) {
      const p = document.createElement('span');
      p.className = 'spark';
      p.innerHTML = big ? SPARKS[i % SPARKS.length] : SPARKS[i % 2 ? 2 : 0];
      const ang = (i / n) * Math.PI * 2 + Math.random() * .6;
      const dist = big ? 60 + Math.random() * 70 : 22 + Math.random() * 12;
      const size = big ? 10 + Math.random() * 10 : 9;
      p.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;` +
        `--dx:${Math.cos(ang) * dist}px;--dy:${Math.sin(ang) * dist}px;--r:${Math.random() * 180 - 90}deg`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 900);
    }
  }

  function toast(msg) {
    document.querySelectorAll('.toast').forEach(t => t.remove());
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = mascot(true) + `<span>${esc(msg)}</span>`;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('out'), 2200);
    setTimeout(() => t.remove(), 2600);
  }

  // ---------- sounds ----------
  // all synthesised with Web Audio, so there are no sound files to download

  const SPEAKER = '<path d="M4 9h4l5-4v14l-5-4H4z"/>';
  const SPEAKER_ON = icon24(SPEAKER + '<path d="M16 9c1.5 1.5 1.5 4.5 0 6 M18.5 6.5c3 3 3 8 0 11"/>');
  const SPEAKER_OFF = icon24(SPEAKER + '<path d="M17 9.5l5 5 M22 9.5l-5 5"/>');

  let actx = null;
  let noise = null;

  function audio() {
    if (state.sound === false) return null;
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    if (!actx) {
      actx = new C();
      noise = actx.createBuffer(1, actx.sampleRate, actx.sampleRate);
      const d = noise.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (actx.state === 'suspended') actx.resume();
    return actx;
  }

  // one soft note; f is a frequency, or [from, to] to slide
  function tone(c, f, at, dur, vol = .15, type = 'sine') {
    const o = c.createOscillator();
    const g = c.createGain();
    const t = c.currentTime + at;
    const [a, b] = Array.isArray(f) ? f : [f, f];
    o.type = type;
    o.frequency.setValueAtTime(a, t);
    if (b !== a) o.frequency.exponentialRampToValueAtTime(b, t + dur * .8);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + .01);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + .02);
  }

  // filtered noise: a pencil stroke on paper, or a soft poof
  function hiss(c, at, dur, vol, type, from, to) {
    const s = c.createBufferSource();
    const f = c.createBiquadFilter();
    const g = c.createGain();
    const t = c.currentTime + at;
    s.buffer = noise;
    f.type = type;
    f.Q.value = 1.4;
    f.frequency.setValueAtTime(from, t);
    f.frequency.exponentialRampToValueAtTime(to, t + dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + .012);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    s.connect(f).connect(g).connect(c.destination);
    s.start(t, Math.random() * .5);
    s.stop(t + dur + .02);
  }

  const SFX = {
    // zig-zag of quick pencil strokes, matching the crayon scribble
    scratch: c => { for (let k = 0; k < 4; k++) hiss(c, k * .065, .075, .55, 'bandpass', 2000 + Math.random() * 1500, 4000 + Math.random() * 1800); },
    untick: c => tone(c, [520, 300], 0, .12, .12),
    pop: c => tone(c, [420, 900], 0, .09, .14),
    boing: c => { tone(c, [330, 800], 0, .12, .14); tone(c, [800, 520], .1, .2, .1); },
    chime: c => [784, 988, 1175, 1568].forEach((f, k) => tone(c, f, .15 + k * .09, .5, .09, 'triangle')),
    poof: c => hiss(c, 0, .24, .4, 'lowpass', 1500, 200),
    tap: c => tone(c, 660, 0, .05, .06, 'triangle'),
    ding: c => { tone(c, 880, 0, .12, .08, 'triangle'); tone(c, 1320, .07, .22, .08, 'triangle'); },
  };

  const sfx = name => {
    const c = audio();
    if (c) try { SFX[name](c); } catch (e) { /* audio is optional */ }
  };

  // ---------- easter egg ----------

  function leroLero() {
    if (document.activeElement) document.activeElement.blur(); // hide the phone keyboard
    sfx('chime');
    const w = document.createElement('div');
    w.className = 'lero';
    w.innerHTML = `
      <div class="lero-box" role="dialog" aria-label="lero lero">
        <div class="lero-head">
          <span class="buddy sm">${mascot(true)}</span>
          <b>lero lero ♪</b>
          <button class="icon-btn" aria-label="Close">×</button>
        </div>
        <div class="lero-video">
          <iframe src="https://www.youtube-nocookie.com/embed/nYMDFv5cKaA?autoplay=1&playsinline=1&rel=0"
            title="lero lero" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen
            referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
      </div>`;
    w.addEventListener('click', e => {
      if (e.target === w || e.target.closest('.icon-btn')) w.remove();
    });
    document.body.appendChild(w);
  }

  const afterName = () => go(state.lists.length ? '/' : '/new');

  // ---------- signing in and syncing (see sync.js) ----------

  const CLOUD_PATH = '<path d="M7 18h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.1 11.6 3.3 3.3 0 0 0 7 18z"/>';
  const CLOUD = icon24(CLOUD_PATH);
  const GOOGLE_G = `<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`;
  const CLOUD_ON = icon24(CLOUD_PATH + '<path d="M9.5 14l2 2 3.5-3.5"/>');

  // acct.mode: 'in' | 'up' (new account) | 'reset' (after a password-reset link)
  let acct = { mode: 'in', email: '', pw: '', busy: false, err: '', msg: '' };
  let remoteWaiting = false; // other devices' changes arrived while you were typing

  const ago = t => {
    const m = Math.round((Date.now() - t) / 60000);
    return m < 1 ? 'just now' : m < 60 ? `${m} min ago` : m < 1440 ? `${Math.round(m / 60)} h ago` : shortDate(t);
  };

  function syncLine() {
    const { status, at } = Sync.state();
    if (status === 'syncing') return 'syncing…';
    if (status === 'offline') return 'offline — it’ll sync when you’re back';
    if (status === 'error') return 'couldn’t sync just now, trying again soon';
    return at ? `synced ${ago(at)} ✿` : 'getting ready…';
  }

  function accountView() {
    const u = Sync.user();
    const head = `
      <div class="topbar"><a class="text-btn" href="#/">Back</a><span class="kind-tag">sync</span></div>
      <div class="art acct-art">${DOODLES.sync}</div>`;
    if (u && acct.mode !== 'reset') {
      return `
        <section class="screen center acct">
          ${head}
          <h1 class="headline"><small>signed in as</small></h1>
          <p class="acct-email">${esc(u.email)}</p>
          <p class="sub acct-status">${syncLine()}</p>
          <div class="spacer"></div>
          <button class="pill wide ghost" data-action="acct-sync">sync now</button>
          <button class="text-btn danger" data-action="acct-out" style="margin-top:8px">Sign out</button>
          <p class="acct-note">signing out keeps everything on this device</p>
        </section>`;
    }
    if (acct.mode === 'reset') {
      return `
        <section class="screen center acct">
          ${head}
          <h1 class="headline"><small>almost there</small>new password</h1>
          <form data-form="acct" class="acct-form">
            <input class="field" type="password" name="pw" autocomplete="new-password" minlength="6" placeholder="new password" aria-label="New password" value="${esc(acct.pw)}">
            ${acct.err ? `<p class="acct-err">${esc(acct.err)}</p>` : ''}
            <button class="pill wide" ${acct.busy ? 'disabled' : ''}>save password</button>
          </form>
        </section>`;
    }
    const up = acct.mode === 'up';
    return `
      <section class="screen center acct">
        ${head}
        <h1 class="headline"><small>keep everything</small>in sync</h1>
        <p class="sub">your lists, recipes, notes and months on all your devices</p>
        <button type="button" class="pill wide g-btn" data-action="acct-google">${GOOGLE_G}continue with Google</button>
        <p class="acct-or"><span>or with email</span></p>
        <div class="seg acct-seg">
          <button type="button" class="${up ? '' : 'on'}" data-action="acct-mode" data-mode="in">sign in</button>
          <button type="button" class="${up ? 'on' : ''}" data-action="acct-mode" data-mode="up">new account</button>
        </div>
        <form data-form="acct" class="acct-form">
          <input class="field" type="email" name="email" autocomplete="email" inputmode="email" placeholder="email" aria-label="Email" value="${esc(acct.email)}">
          <input class="field" type="password" name="pw" autocomplete="${up ? 'new-password' : 'current-password'}" minlength="6"
            placeholder="${up ? 'make a password (6+ letters)' : 'password'}" aria-label="Password" value="${esc(acct.pw)}">
          ${acct.err ? `<p class="acct-err">${esc(acct.err)}</p>` : ''}
          ${acct.msg ? `<p class="acct-msg">${esc(acct.msg)}</p>` : ''}
          <button class="pill wide" ${acct.busy ? 'disabled' : ''}>${acct.busy ? 'one sec…' : up ? 'create account' : 'sign in'}</button>
        </form>
        ${up ? '' : '<button class="text-btn" data-action="acct-forgot">forgot password?</button>'}
        <p class="acct-note">anything already on this device gets added to your account</p>
        <p class="acct-note acct-legal"><a href="/privacy.html">privacy</a> · <a href="/terms.html">terms</a></p>
      </section>`;
  }

  // Supabase's messages, in the app's voice
  const nice = e => {
    const m = (e && e.message || '').toLowerCase();
    if (!navigator.onLine) return 'you’re offline — try again when you’re connected';
    if (m.includes('invalid login')) return 'that email and password don’t match';
    if (m.includes('already registered') || m.includes('already been registered')) return 'that email already has an account — sign in instead';
    if (m.includes('password')) return 'the password needs at least 6 letters';
    if (m.includes('email') && m.includes('invalid')) return 'that email doesn’t look right';
    if (m.includes('rate limit') || m.includes('security purposes')) return 'too many tries — wait a minute and try again';
    if (e && e.confirm) return e.message;
    return 'something went wrong — try again';
  };

  async function submitAccount() {
    const email = acct.email.trim(), pw = acct.pw;
    if (acct.mode !== 'reset' && !email) { acct.err = 'add your email'; render(); return; }
    if (pw.length < 6) { acct.err = 'the password needs at least 6 letters'; render(); return; }
    Object.assign(acct, { busy: true, err: '', msg: '' });
    render();
    try {
      if (acct.mode === 'reset') await Sync.setPassword(pw);
      else if (acct.mode === 'up') await Sync.signUp(email, pw);
      else await Sync.signIn(email, pw);
      acct = { mode: 'in', email: '', pw: '', busy: false, err: '', msg: '' };
      sfx('chime');
      toast('signed in ✿');
    } catch (e) {
      Object.assign(acct, { busy: false, err: nice(e) });
    }
    render();
  }

  // ---------- what sync.js sees: every list, recipe, note, month, day of ticks and your settings ----------

  const PREFS = ['user', 'sound', 'showTicks', 'bookTab', 'flavour'];

  function syncDocs() {
    const m = new Map();
    state.lists.forEach(l => m.set('list:' + l.id, l));
    state.recipes.forEach(r => m.set('recipe:' + r.id, r));
    state.notes.forEach(n => m.set('note:' + n.id, n));
    Object.entries(state.months).forEach(([k, v]) => m.set('month:' + k, v));
    Object.entries(state.log).forEach(([k, v]) => m.set('log:' + k, v));
    const prefs = {};
    PREFS.forEach(k => { if (state[k] !== undefined) prefs[k] = state[k]; });
    m.set('prefs:me', prefs);
    return m;
  }

  function syncApply(key, data) {
    const i = key.indexOf(':');
    const kind = key.slice(0, i), id = key.slice(i + 1);
    const arr = { list: 'lists', recipe: 'recipes', note: 'notes' }[kind];
    if (kind === 'note' && data && !data.photos) data.photos = [];
    if (arr) {
      const at = state[arr].findIndex(x => x.id === id);
      if (data === null) { if (at >= 0) state[arr].splice(at, 1); }
      else if (at >= 0) state[arr][at] = data;
      else state[arr].push(data);
    } else if (kind === 'month' || kind === 'log') {
      const box = kind === 'month' ? state.months : state.log;
      if (data === null) delete box[id]; else box[id] = data;
    } else if (kind === 'prefs' && data) {
      PREFS.forEach(k => { if (data[k] !== undefined) state[k] = data[k]; });
    }
  }

  function syncChanged() {
    if (state.user || state.lists.length || state.recipes.length || state.notes.length) state.seen = true;
    persist();
    // don't redraw under someone mid-typing or mid-drag; catch up when they're done
    const a = document.activeElement;
    if ((a && app.contains(a) && /^(INPUT|TEXTAREA)$/.test(a.tagName)) || gest || cropGest) { remoteWaiting = true; return; }
    render();
  }
  app.addEventListener('focusout', () => setTimeout(() => {
    const a = document.activeElement;
    if (remoteWaiting && !(a && app.contains(a) && /^(INPUT|TEXTAREA)$/.test(a.tagName))) { remoteWaiting = false; render(); }
  }, 350));

  function syncPhotoIds() {
    const ids = new Set();
    const photoOf = x => { if (x.photo) { ids.add(x.photo.p); if (x.photo.o) ids.add(x.photo.o); } };
    state.recipes.forEach(photoOf);
    state.lists.forEach(l => l.sections.forEach(s => s.items.forEach(photoOf)));
    state.notes.forEach(n => n.photos.forEach(x => { ids.add(x.p); if (x.s) ids.add(x.s); }));
    Object.values(state.months).forEach(m => m.els.forEach(e => {
      if (e.type === 'photo' || e.type === 'draw') ids.add(e.p);
      if (e.type === 'draw' && e.s) ids.add(e.s);
    }));
    return ids;
  }

  Sync.onStatus(() => {
    const a = document.activeElement;
    if (route() === '/account' && !(a && app.contains(a) && a.tagName === 'INPUT')) render();
  });

  // ---------- events ----------

  app.addEventListener('click', e => {
    // the date stamp is a hidden date input; open its picker wherever it's tapped
    if (e.target.dataset.field === 'n-stamp') {
      try { e.target.showPicker(); } catch (err) { /* older browsers open it themselves */ }
      return;
    }
    const t = e.target.closest('[data-action]');
    if (!t || t.disabled) return;
    const list = currentList();
    const secEl = t.closest('[data-sec]');
    const sec = list && secEl ? list.sections.find(s => s.id === secEl.dataset.sec) : null;
    const itemEl = t.closest('[data-item]');
    const item = sec && itemEl ? sec.items.find(i => i.id === itemEl.dataset.item) : null;

    switch (t.dataset.action) {
      case 'acct-mode':
        sfx('tap'); Object.assign(acct, { mode: t.dataset.mode, err: '', msg: '' }); render(); break;
      case 'acct-google':
        sfx('tap');
        if (!navigator.onLine) { acct.err = nice(null); render(); break; }
        Sync.google().catch(e => {
          acct.err = /google is off/.test(e.message) ? 'Google sign-in isn’t switched on yet' : nice(e);
          render();
        });
        break;
      case 'acct-forgot':
        if (!acct.email.trim()) { acct.err = 'add your email first'; render(); break; }
        Object.assign(acct, { err: '', msg: '' });
        Sync.forgot(acct.email.trim())
          .then(() => { acct.msg = 'check your email for a link to set a new password'; })
          .catch(e => { acct.err = nice(e); })
          .then(render);
        break;
      case 'acct-sync':
        sfx('tap'); Sync.now(); break;
      case 'acct-out':
        if (!confirm('Sign out? Everything stays on this device.')) return;
        sfx('poof');
        Sync.signOut().then(render);
        break;
      case 'start':
        sfx('tap'); state.seen = true; save(); go(state.user ? '/new' : '/hi'); break;
      case 'sound':
        state.sound = state.sound === false; save(); sfx('ding'); render(); break;
      case 'edit-name':
        you = state.user || ''; go('/hi'); break;
      case 'you-back':
        if (!state.lists.length) { state.seen = false; save(); }
        go('/');
        break;
      case 'you-next':
        if (!you.trim()) return;
        sfx('tap'); state.user = you.trim(); save(); afterName();
        break;
      case 'poke': {
        note = pick(NOTES, note);
        const b = t.querySelector('.bubble');
        b.textContent = note;
        b.style.animation = 'none';
        void b.offsetWidth;
        b.style.animation = '';
        sfx('boing');
        hopBuddy();
        break;
      }
      case 'new':
        sfx('tap'); draft = null; go('/new'); break;
      case 'filter':
        sfx('tap'); filter = t.dataset.kind; render(); break;
      case 'wiz-back':
        if (draft.step === 0) { draft = null; go(state.lists.length ? '/' : '/hi'); } else { draft.step--; render(); }
        break;
      case 'wiz-next':
        if (draft.step === 0 && !draft.name.trim()) return;
        sfx('tap'); draft.step++; render(); break;
      case 'pick-kind':
        sfx('tap'); draft.kind = t.dataset.kind; render(); break;
      case 'create': {
        sfx('pop');
        const k = kindOf(draft.kind);
        const l = {
          id: uid(), name: draft.name.trim(), kind: k.id, created: Date.now(),
          sections: [{ id: uid(), name: k.group, items: [] }],
        };
        state.seen = true;
        state.lists.push(l);
        save();
        draft = null;
        pendingFocus = { sel: '.add-row input' };
        go('/list/' + l.id);
        break;
      }
      case 'toggle': {
        if (!item) return;
        const box = itemEl.querySelector('.check').getBoundingClientRect();
        const was = item.doneAt;
        item.done = !item.done;
        item.doneAt = item.done ? Date.now() : null;
        if (item.done) logTick(list, item); else unlogTick(item, was);
        justToggled = item.id;
        save();
        const { total, done } = stats(list);
        const finished = item.done && done === total;
        if (finished) hop = true;
        sfx(item.done ? 'scratch' : 'untick');
        if (finished) sfx('chime');
        render();
        if (item.done) burst(box.left + box.width / 2, box.top + box.height / 2, finished);
        if (finished) toast(pick(DONE[kindOf(list.kind).id]));
        break;
      }
      case 'repeat':
        if (!item) return;
        sfx('tap');
        sheet = item.id;
        sheetFresh = true;
        render();
        break;
      case 'sheet-close':
        sheet = null; render(); break;
      case 'set-repeat': {
        const it = findItem(list, sheet);
        if (!it) return;
        const v = t.dataset.rep || null;
        if (v) it.repeat = v; else delete it.repeat;
        delete it.days;
        if (it.done && !it.doneAt) it.doneAt = Date.now();
        sfx(v ? 'ding' : 'tap'); save(); render();
        break;
      }
      case 'toggle-day': {
        const it = findItem(list, sheet);
        if (!it) return;
        const d = +t.dataset.day;
        const days = it.repeat === 'days' ? it.days.filter(x => x !== d) : [];
        if (!(it.repeat === 'days' && it.days.includes(d))) days.push(d);
        if (days.length) { it.repeat = 'days'; it.days = days; } else { delete it.repeat; delete it.days; }
        if (it.done && !it.doneAt) it.doneAt = Date.now();
        sfx('tap'); save(); render();
        break;
      }
      case 'del-item':
        if (item) { sfx('poof'); dropPhoto(item); sec.items = sec.items.filter(i => i !== item); save(); render(); }
        break;
      case 'add-sec': {
        sfx('pop');
        const s = { id: uid(), name: 'New group', items: [] };
        list.sections.push(s); save();
        pendingFocus = { sel: `[data-sec="${s.id}"] .group-name`, select: true };
        render();
        break;
      }
      case 'del-sec':
        if (sec.items.length && !confirm(`Remove “${sec.name}” and its ${sec.items.length} item(s)?`)) return;
        sfx('poof'); list.sections = list.sections.filter(s => s !== sec); save(); render();
        break;
      case 'clear-done':
        // repeating items stay; they untick themselves when it's time
        sfx('poof');
        list.sections.forEach(s => { s.items = s.items.filter(i => !i.done || repeats(list, i) || dropPhoto(i)); });
        save(); render();
        break;
      case 'del-list':
        if (!confirm(`Delete “${list.name}”? This can’t be undone.`)) return;
        sfx('poof');
        list.sections.forEach(s => s.items.forEach(dropPhoto));
        state.lists = state.lists.filter(l => l !== list); save(); go('/');
        break;
      default:
        if (t.dataset.action.startsWith('m-')) monthAction(t);
        else if (t.dataset.action.startsWith('b-')) bookAction(t);
        else if (t.dataset.action.startsWith('w-')) wishAction(t);
    }
  });

  function monthAction(t) {
    const key = viewKey();
    const m = monthOf(key, true);
    const sel = m.els.find(e => e.id === msel);
    const open = (name, fresh = true) => { msheet = name; sheetFresh = fresh; };

    switch (t.dataset.action) {
      case 'm-go':
        sfx('tap'); msel = null; go('/month/' + t.dataset.key); return;
      case 'm-day':
        // with something selected, tapping the calendar just puts it down
        if (msel) { msel = null; break; }
        sfx('tap'); mday = +t.dataset.day; open('day');
        break;
      case 'm-close':
        closeMonthSheet(); break;
      case 'm-deselect':
        sfx('tap'); msel = null; break;
      case 'm-zoom': {
        const z = +t.dataset.dir > 0 ? ZOOMS.find(x => x > mzoom + .01) : [...ZOOMS].reverse().find(x => x < mzoom - .01);
        if (!z) return;
        sfx('tap');
        const w = app.querySelector('.board-wrap').getBoundingClientRect();
        const a = app.getBoundingClientRect();
        const top = Math.max(w.top, a.top, 0), bottom = Math.min(w.bottom, a.bottom, innerHeight - 90);
        zoomAround(z, w.left + w.width / 2, top < bottom ? (top + bottom) / 2 : w.top);
        render();
        return;
      }
      case 'm-draw':
        sfx('tap');
        msel = null;
        render();
        drawSomething(null).then(d => {
          if (!d) return;
          addEl(key, { type: 'draw', ...d, w: Math.max(8, Math.round(d.f * 60)) });
          render();
        });
        return;
      case 'm-edit-draw': {
        if (!sel) return;
        const e = sel;
        drawSomething(e).then(d => {
          if (!d) return;
          e.w = Math.max(5, Math.round(e.w * d.f / (e.f || d.f) * 10) / 10); // the same ink, the same size
          Object.assign(e, d);
          save();
          render();
        });
        return;
      }
      case 'm-ticks':
        state.showTicks = !showTicks(); save(); sfx('tap'); break;
      case 'm-photo':
        pickPhotos({ at: msheet === 'day' ? dayCentre(grid(key), mday) : null });
        closeMonthSheet();
        break;
      case 'm-tray':
        sfx('tap'); msel = null; open('tray'); break;
      case 'm-tab':
        sfx('tap'); mtab = t.dataset.tab; open('tray', false); break;
      case 'm-add-stk': {
        const s = R.stickerById(t.dataset.k);
        closeMonthSheet();
        addEl(key, { type: 'sticker', k: s.id, w: s.tab === 'tape' ? 20 : s.tab === 'scribbles' ? 16 : 12 });
        break;
      }
      case 'm-add-stamp': {
        const [text, shape] = R.STAMPS[+t.dataset.i];
        closeMonthSheet();
        addEl(key, { type: 'text', t: text, shape, s: 4.4 });
        break;
      }
      case 'm-words':
        sfx('tap'); msel = null; mtext = { t: '', shape: 'plain' }; open('text');
        pendingFocus = '.m-words';
        break;
      case 'm-edit-text':
        if (!sel) return;
        sfx('tap'); mtext = { id: sel.id, t: sel.t, shape: sel.shape }; open('text');
        pendingFocus = '.m-words';
        break;
      case 'm-shape':
        sfx('tap'); mtext.shape = t.dataset.shape; open('text', false); break;
      case 'm-words-done': {
        const { t: words, shape } = mtext;
        const text = words.trim();
        const e = mtext.id && m.els.find(x => x.id === mtext.id);
        if (e && text) Object.assign(e, { t: text, shape });
        else if (e) m.els = m.els.filter(x => x !== e);
        closeMonthSheet();
        if (!e && text) addEl(key, { type: 'text', t: text, shape, s: 5 });
        else { sfx('tap'); save(); }
        break;
      }
      case 'm-frame':
        if (sel) { sel.frame = t.dataset.frame; sfx('tap'); save(); }
        break;
      case 'm-front':
        if (sel) { m.els = m.els.filter(e => e !== sel).concat(sel); sfx('tap'); save(); }
        break;
      case 'm-del':
        if (!sel) return;
        if (sel.type === 'photo' || sel.type === 'draw') R.photos.del(sel.p);
        if (sel.type === 'draw') R.photos.del(sel.s);
        m.els = m.els.filter(e => e !== sel);
        msel = null;
        sfx('poof'); save();
        break;
      case 'm-export':
        sfx('tap');
        mexp = { fmt: 'png', ticks: showTicks(), dots: true };
        open('export');
        render();
        buildExport();
        return;
      case 'm-fmt':
      case 'm-exp':
        if (t.dataset.fmt === mexp.fmt) return;
        sfx('tap');
        mexp = { ...mexp, preview: null, blob: null };
        if (t.dataset.fmt) mexp.fmt = t.dataset.fmt; else mexp[t.dataset.opt] = !mexp[t.dataset.opt];
        open('export', false);
        render();
        buildExport();
        return;
      case 'm-save': {
        const g = grid(key);
        deliver(mexp.blob, `scribble-${monthName(g.Y, g.M)}-${g.Y}.${mexp.fmt}`);
        return;
      }
      default:
        return;
    }
    render();
  }

  // ---------- zooming the month page ----------
  // the board is sized in cqw, so making it wider zooms everything on it; the wrap scrolls sideways

  const ZOOMS = [1, 1.5, 2, 3];
  const ZMAX = ZOOMS[ZOOMS.length - 1];

  // zoom to z keeping the board point under (px, py) on screen where it is
  function zoomAround(z, px, py) {
    const board = app.querySelector('.board');
    const wrap = app.querySelector('.board-wrap');
    if (!board) return;
    const b = board.getBoundingClientRect();
    const fx = (px - b.left) / b.width, fy = (py - b.top) / b.height;
    mzoom = Math.min(ZMAX, Math.max(1, z));
    board.style.setProperty('--z', mzoom);
    const nb = board.getBoundingClientRect();
    wrap.scrollLeft += nb.left + fx * nb.width - px;
    const dy = nb.top + fy * nb.height - py;
    app.scrollTop += dy;   // the phone frame on desktop scrolls #app,
    window.scrollBy(0, dy); // a real phone scrolls the page
  }

  // two fingers on the calendar (not on a photo or sticker) pinch-zoom it
  let pinch = null;
  const spread = ts => Math.hypot(ts[0].clientX - ts[1].clientX, ts[0].clientY - ts[1].clientY) || 1;
  app.addEventListener('touchstart', e => {
    if (e.touches.length !== 2 || gest || !e.target.closest('.board-wrap')) return;
    if ([...e.touches].some(t => t.target.closest && t.target.closest('.el'))) return;
    pinch = { d: spread(e.touches), z: mzoom };
  }, { passive: true });
  app.addEventListener('touchmove', e => {
    if (!pinch || e.touches.length !== 2) return;
    e.preventDefault();
    const [a, b] = e.touches;
    zoomAround(pinch.z * spread(e.touches) / pinch.d, (a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2);
  }, { passive: false });
  const endPinch = e => {
    if (!pinch || e.touches.length > 1) return;
    pinch = null;
    mzoom = Math.round(mzoom * 10) / 10;
    render(); // refresh the zoom buttons
  };
  app.addEventListener('touchend', endPinch);
  app.addEventListener('touchcancel', endPinch);

  // ---------- dragging, pinching and twisting things on the month page ----------

  function paintEl(el, e) {
    el.style.left = e.x + 'cqw';
    el.style.top = e.y + 'cqw';
    el.style.setProperty('--r', e.r + 'deg');
    if (e.type === 'text') el.style.fontSize = e.s + 'cqw';
    else el.style.setProperty('--w', e.w + 'cqw');
  }

  const twoFingers = g => {
    const [a, b] = [...g.pts.values()];
    return {
      dist: Math.hypot(b.x - a.x, b.y - a.y) || 1,
      ang: Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI,
      cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2,
      x: g.e.x, y: g.e.y, r: g.e.r || 0, z: elSize(g.e),
    };
  };

  app.addEventListener('pointerdown', ev => {
    const el = ev.target.closest('.el');
    if (!el || ev.target.closest('[data-action]')) return;
    const e = monthOf(viewKey()).els.find(x => x.id === el.dataset.el);
    if (!e) return;
    ev.preventDefault();
    el.setPointerCapture(ev.pointerId);
    if (gest && gest.e === e) { // a second finger: pinch to resize, twist to rotate
      gest.pts.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
      gest.two = twoFingers(gest);
      gest.moved = true;
      return;
    }
    const b = el.closest('.board').getBoundingClientRect();
    gest = {
      el, e, b, k: 100 / b.width, mode: ev.target.dataset.handle || 'move',
      pts: new Map([[ev.pointerId, { x: ev.clientX, y: ev.clientY }]]),
      sx: ev.clientX, sy: ev.clientY, x0: e.x, y0: e.y, r0: e.r || 0, z0: elSize(e), moved: false,
    };
  });

  app.addEventListener('pointermove', ev => {
    const g = gest;
    if (!g || !g.pts.has(ev.pointerId)) return;
    g.pts.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
    const e = g.e;
    if (Math.abs(ev.clientX - g.sx) + Math.abs(ev.clientY - g.sy) > 6) g.moved = true;
    if (g.two && g.pts.size > 1) {
      const now = twoFingers(g);
      setSize(e, g.two.z * now.dist / g.two.dist);
      e.r = g.two.r + now.ang - g.two.ang;
      e.x = g.two.x + (now.cx - g.two.cx) * g.k;
      e.y = g.two.y + (now.cy - g.two.cy) * g.k;
    } else if (g.mode === 'move') {
      e.x = g.x0 + (ev.clientX - g.sx) * g.k;
      e.y = g.y0 + (ev.clientY - g.sy) * g.k;
    } else {
      const cx = g.b.left + g.x0 / g.k, cy = g.b.top + g.y0 / g.k;
      if (g.mode === 'size') {
        setSize(e, g.z0 * Math.hypot(ev.clientX - cx, ev.clientY - cy) / (Math.hypot(g.sx - cx, g.sy - cy) || 1));
      } else {
        e.r = g.r0 + (Math.atan2(ev.clientY - cy, ev.clientX - cx) - Math.atan2(g.sy - cy, g.sx - cx)) * 180 / Math.PI;
      }
    }
    e.x = Math.min(100, Math.max(0, e.x));
    e.y = Math.min(g.b.height * g.k, Math.max(0, e.y));
    paintEl(g.el, e);
  });

  const endGesture = ev => {
    const g = gest;
    if (!g || !g.pts.has(ev.pointerId)) return;
    g.pts.delete(ev.pointerId);
    if (g.pts.size) { // one finger still down: carry on dragging from here
      const [p] = [...g.pts.values()];
      Object.assign(g, { two: null, mode: 'move', sx: p.x, sy: p.y, x0: g.e.x, y0: g.e.y });
      return;
    }
    gest = null;
    const e = g.e;
    e.x = Math.round(e.x * 10) / 10;
    e.y = Math.round(e.y * 10) / 10;
    e.r = Math.round(e.r || 0);
    save();
    if (msel !== e.id) { sfx('tap'); msel = e.id; render(); }
  };
  app.addEventListener('pointerup', endGesture);
  app.addEventListener('pointercancel', endGesture);

  app.addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    if (f.dataset.form === 'acct') {
      if (!acct.busy) submitAccount();
      return;
    }
    if (f.dataset.form === 'you') {
      if (you.trim()) { state.user = you.trim(); save(); afterName(); }
      return;
    }
    if (f.dataset.form === 'name') {
      if (draft.name.trim()) { draft.step = 1; render(); }
      return;
    }
    if (f.dataset.form === 'r-add') {
      const text = f.elements.text.value.trim();
      if (text) addRows(currentRecipe(), f.dataset.list, [text]);
      return;
    }
    if (f.dataset.form === 'add-item') {
      const list = currentList();
      const secId = f.closest('[data-sec]').dataset.sec;
      const sec = list.sections.find(s => s.id === secId);
      const text = f.elements.text.value.trim();
      if (!text) return;
      const fromLink = list.kind === 'wish' && wishFromLink(text);
      const item = fromLink ? { id: uid(), text: fromLink.text, link: fromLink.link, done: false } : { id: uid(), text: text.slice(0, 80), done: false };
      sec.items.push(item);
      save();
      sfx('pop');
      justAdded = item.id;
      hop = true;
      pendingFocus = `[data-sec="${secId}"] .add-row input`;
      render();
    }
  });

  app.addEventListener('input', e => {
    // typing "lero lero" anywhere, in any capitalisation
    if (/lero\s*lero/i.test(e.target.value || '')) {
      if (leroArmed) { leroArmed = false; leroLero(); }
    } else {
      leroArmed = true;
    }

    // month page fields save as you type, so a re-render never loses words
    const f = e.target.dataset.field;
    if (f === 'm-hl' || f === 'm-note') {
      const m = monthOf(viewKey(), true);
      if (f === 'm-hl') m.hl = e.target.value;
      else if (e.target.value.trim()) m.notes[mday] = e.target.value;
      else delete m.notes[mday];
      save();
      return;
    }
    if (f === 'm-text') { mtext.t = e.target.value; return; }
    if (f === 'crop-z') { crop.z = +e.target.value; paintCrop(); return; }
    if (f === 'w-name' || f === 'w-link') {
      const l = currentList();
      const i = l && findItem(l, wsheet);
      if (!i) return;
      if (f === 'w-name') { if (e.target.value.trim()) i.text = e.target.value.trim(); }
      else {
        i.link = e.target.value.trim();
        const a = app.querySelector('.w-sheet .r-open');
        a.hidden = !linkUrl(i.link);
        a.href = linkUrl(i.link) || '#';
      }
      save();
      return;
    }

    // notebook fields save as you type too
    if (f === 'b-q') {
      const q = e.target.value.trim().toLowerCase();
      let shown = 0;
      app.querySelectorAll('[data-q]').forEach(c => {
        c.hidden = !!q && !c.dataset.q.includes(q);
        if (!c.hidden) shown++;
      });
      app.querySelector('.b-none').hidden = shown > 0;
      return;
    }
    if (e.target.classList.contains('autogrow')) grow(e.target);
    const v = e.target.value;
    if (f && f.startsWith('r-')) {
      const r = currentRecipe();
      if (!r) return;
      if (f === 'r-ing' || f === 'r-step') {
        const x = r[f === 'r-ing' ? 'ings' : 'steps'].find(y => y.id === e.target.closest('[data-row]').dataset.row);
        if (x) x.t = v;
      } else {
        r[{ 'r-name': 'name', 'r-time': 'time', 'r-serves': 'serves', 'r-link': 'link', 'r-notes': 'notes' }[f]] = v;
      }
      if (f === 'r-link') {
        const a = app.querySelector('.r-open');
        a.hidden = !linkUrl(v);
        a.href = linkUrl(v) || '#';
      }
      touch(r);
      return;
    }
    if (f === 'n-stamp') {
      const n = currentNote();
      if (n && v) { n.stamp = v; touch(n); render(); }
      return;
    }
    if (f === 'n-title' || f === 'n-body') {
      const n = currentNote();
      if (n) { n[f === 'n-title' ? 'title' : 'body'] = v; touch(n); }
      return;
    }

    const n = e.target.name;
    if (e.target.closest('form[data-form="acct"]')) { acct[n] = e.target.value; return; }
    if (n === 'name' && draft) {
      draft.name = e.target.value;
      const next = app.querySelector('[data-action="wiz-next"]');
      if (next) next.disabled = !draft.name.trim();
    } else if (n === 'you') {
      you = e.target.value;
      const next = app.querySelector('[data-action="you-next"]');
      if (next) next.disabled = !you.trim();
    }
  });

  app.addEventListener('change', e => {
    const field = e.target.dataset.field;
    const list = currentList();
    if (!field || !list) return;
    const v = e.target.value.trim();
    if (field === 'list-name') {
      if (v) list.name = v; else e.target.value = list.name;
    } else if (field === 'sec-name') {
      const sec = list.sections.find(s => s.id === e.target.closest('[data-sec]').dataset.sec);
      if (v) sec.name = v; else e.target.value = sec.name;
    }
    save();
  });

  // Enter in a heading input just commits the rename
  app.addEventListener('keydown', e => {
    const f = e.target.dataset.field;
    if ((f === 'r-ing' || f === 'r-step') && !e.isComposing &&
        ((e.key === 'Enter' && !e.shiftKey) || (e.key === 'Backspace' && !e.target.value))) {
      e.preventDefault();
      rowKey(e.target, e.key);
      return;
    }
    if (e.key === 'Enter' && f && e.target.tagName === 'INPUT') e.target.blur();
  });

  // pasting a few lines into "add an ingredient / step" adds one row per line
  app.addEventListener('paste', e => {
    const form = e.target.closest('form[data-form="r-add"]');
    if (!form || !e.clipboardData) return;
    const lines = e.clipboardData.getData('text').split(/\r?\n/).map(cleanLine).filter(Boolean);
    if (lines.length < 2) return;
    e.preventDefault();
    const list = form.dataset.list;
    addRows(currentRecipe(), list, lines.map(t => t.slice(0, list === 'ings' ? 120 : 600)));
    toast(`added ${lines.length} ${list === 'ings' ? 'ingredients' : 'steps'} ✿`);
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const egg = document.querySelector('.lero');
    if (egg) egg.remove();
    else if (sheet) { sheet = null; render(); }
    else if (crop) { dropCrop(); render(); }
    else if (wsheet || wexp) { wsheet = null; wexp = null; render(); }
    else if (bsheet) { bsheet = false; render(); }
    else if (msheet) { closeMonthSheet(); render(); }
    else if (msel) { msel = null; render(); }
  });

  window.addEventListener('hashchange', render);
  // the installed app can sit open in the background for days
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && resetRepeats()) render();
  });

  const clock = document.getElementById('clock');
  const tick = () => {
    const d = new Date();
    clock.textContent = `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
  };
  tick();
  setInterval(tick, 30000);

  // installable + offline (see sw.js)
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
  }

  // older saves have no month data yet; seed the tick log from things already ticked
  if (!state.months) state.months = {};
  if (!state.recipes) state.recipes = [];
  if (!state.notes) state.notes = [];
  state.notes.forEach(n => { if (!n.photos) n.photos = []; });
  if (!state.log) {
    state.log = {};
    state.lists.forEach(l => l.sections.forEach(s => s.items.forEach(i => { if (i.done && i.doneAt) logTick(l, i); })));
    save();
  }

  Sync.init({ docs: syncDocs, apply: syncApply, changed: syncChanged, photoIds: syncPhotoIds });
  // a password-reset link, or the way back from Google, lands here with tokens (or an error) in the address
  if (/access_token=|error_description=/.test(location.hash)) {
    const link = location.hash;
    const failed = /error_description=/.test(link) ? 'couldn’t sign in — try again' : 'that link has expired — try again';
    history.replaceState(null, '', '#/account');
    Sync.fromLink(link)
      .then(type => {
        if (type === 'recovery') acct.mode = 'reset';
        else if (type) { sfx('chime'); toast('signed in ✿'); }
        else acct.err = failed;
      })
      .catch(() => { acct.err = failed; })
      .then(render);
  }

  render();
})();
