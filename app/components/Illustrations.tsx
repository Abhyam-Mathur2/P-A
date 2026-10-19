/** Inline SVG for the couple illustration used in the hero. */
export function CoupleIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 500 510"
      role="img"
      aria-label="A cute storybook couple holding hands"
    >
      <defs>
        <linearGradient id="il-dress" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#d98b9a" />
          <stop offset="1" stopColor="#9c3e56" />
        </linearGradient>
        <linearGradient id="il-shirt" x1="0" x2="1">
          <stop stopColor="#fff3df" />
          <stop offset="1" stopColor="#e5cdbb" />
        </linearGradient>
        <linearGradient id="il-hair" x1="0" x2="1">
          <stop stopColor="#3d2028" />
          <stop offset="1" stopColor="#77404a" />
        </linearGradient>
        <radialGradient id="il-skin">
          <stop stopColor="#ffdfc6" />
          <stop offset="1" stopColor="#e6a989" />
        </radialGradient>
        <linearGradient id="il-trousers" x1="0" x2="1">
          <stop stopColor="#51434a" />
          <stop offset="1" stopColor="#2f2730" />
        </linearGradient>
      </defs>
      <ellipse cx="250" cy="455" rx="150" ry="23" fill="#8c5260" opacity=".12" />
      {/* girl */}
      <path d="M302 175 Q290 145 313 123 Q344 102 364 129 Q380 147 365 178 L356 210 L310 208Z" fill="url(#il-hair)" />
      <path d="M310 201 Q294 244 279 290 Q276 323 303 374 L364 374 Q385 323 369 278 L353 205Z" fill="url(#il-dress)" />
      <path d="M310 202 Q331 223 353 202 L361 251 Q338 270 299 250Z" fill="#f2c2c5" opacity=".8" />
      <path d="M302 374 L326 374 L321 428 Q317 440 304 435 L299 430Z" fill="url(#il-skin)" />
      <path d="M343 374 L363 374 L373 428 Q370 440 356 434 L341 429Z" fill="url(#il-skin)" />
      <path d="M292 435 Q313 428 324 438 L326 448 L288 448 Q282 442 292 435Z" fill="#8b394d" />
      <path d="M352 435 Q370 426 381 438 L384 448 L350 448Z" fill="#8b394d" />
      <path d="M306 141 Q309 111 338 112 Q367 112 371 143 L364 173 Q353 194 335 190 Q315 185 308 165Z" fill="url(#il-skin)" />
      <path d="M304 148 Q291 111 323 96 Q353 82 371 111 Q380 128 367 149 L359 126 Q338 137 316 123 L312 155Z" fill="url(#il-hair)" />
      <path d="M312 151 Q296 178 315 194 L305 208 Q286 188 296 157Z" fill="url(#il-hair)" />
      <path d="M358 151 Q374 172 362 195 L374 207 Q391 179 370 145Z" fill="url(#il-hair)" />
      <ellipse cx="325" cy="153" rx="3" ry="4" fill="#4c2c32" />
      <ellipse cx="350" cy="153" rx="3" ry="4" fill="#4c2c32" />
      <path d="M328 169 Q338 179 348 168" fill="none" stroke="#a95361" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="317" cy="164" r="7" fill="#e88e99" opacity=".55" />
      <circle cx="357" cy="164" r="7" fill="#e88e99" opacity=".55" />
      {/* boy */}
      <path d="M143 184 Q128 158 145 135 Q164 111 191 132 Q209 151 192 181 L182 207 L147 205Z" fill="url(#il-hair)" />
      <path d="M137 211 Q165 194 193 210 L214 300 L199 374 L139 374 L124 297Z" fill="url(#il-shirt)" />
      <path d="M139 217 L163 245 L151 269 L127 239Z" fill="#e8c3b2" />
      <path d="M191 216 L170 244 L183 264 L207 236Z" fill="#e8c3b2" />
      <path d="M142 370 L169 370 L169 427 L149 431Z" fill="url(#il-trousers)" />
      <path d="M174 370 L200 370 L209 425 L188 430Z" fill="url(#il-trousers)" />
      <path d="M143 425 Q160 418 174 431 L175 442 L135 442Z" fill="#4d2935" />
      <path d="M187 425 Q203 418 217 431 L221 442 L186 442Z" fill="#4d2935" />
      <path d="M145 143 Q149 116 172 116 Q198 117 199 145 L193 174 Q181 192 164 187 Q146 182 143 161Z" fill="url(#il-skin)" />
      <path d="M141 149 Q127 118 151 101 Q180 84 198 111 L203 139 L190 130 L184 118 Q164 135 145 128Z" fill="url(#il-hair)" />
      <ellipse cx="160" cy="151" rx="3" ry="4" fill="#4c2c32" />
      <ellipse cx="182" cy="151" rx="3" ry="4" fill="#4c2c32" />
      <path d="M162 168 Q171 176 181 168" fill="none" stroke="#a95361" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="153" cy="163" r="6" fill="#e88e99" opacity=".5" />
      <circle cx="189" cy="163" r="6" fill="#e88e99" opacity=".5" />
      {/* arms and joined hands */}
      <path d="M132 231 Q115 255 139 278 L188 293 Q199 297 203 286 Q207 276 193 270 L158 250 L159 231Z" fill="url(#il-shirt)" />
      <path d="M365 235 Q384 254 361 279 L313 293 Q301 297 297 286 Q293 276 307 270 L341 250 L340 231Z" fill="url(#il-dress)" />
      <path d="M194 282 Q205 275 214 285 L231 299 Q239 309 229 317 Q220 321 212 311 L193 299 Q185 291 194 282Z" fill="url(#il-skin)" />
      <path d="M306 282 Q295 275 286 285 L269 299 Q261 309 271 317 Q280 321 288 311 L307 299 Q315 291 306 282Z" fill="url(#il-skin)" />
      <path d="M226 307 Q249 298 273 307" fill="none" stroke="#d5a28b" strokeWidth="6" strokeLinecap="round" />
      <path d="M246 298 C236 285 219 293 226 307 L249 328 L271 307 C279 292 261 285 249 298Z" fill="#b74d67" />
      <path d="M250 303 L250 322" stroke="#e7a0a9" strokeWidth="2" opacity=".7" />
      {/* sparkles */}
      <path d="M95 175 L100 188 L113 193 L100 198 L95 211 L90 198 L77 193 L90 188Z" fill="#c9a66b" />
      <path d="M403 287 L407 297 L417 301 L407 305 L403 315 L399 305 L389 301 L399 297Z" fill="#c9a66b" />
      <circle cx="111" cy="326" r="4" fill="#c9a66b" />
      <circle cx="398" cy="156" r="4" fill="#c9a66b" />
    </svg>
  );
}

/** Inline SVG for the proposal kneeling-boy scene. */
export function ProposalIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 560 310"
      role="img"
      aria-label="A boy kneeling with a flower bouquet in front of a girl"
    >
      <defs>
        <linearGradient id="pr-dress" x1="0" x2="1">
          <stop stopColor="#f2c4c5" />
          <stop offset="1" stopColor="#b9526b" />
        </linearGradient>
        <linearGradient id="pr-skin">
          <stop stopColor="#ffdfc6" />
          <stop offset="1" stopColor="#e3a384" />
        </linearGradient>
        <linearGradient id="pr-hair">
          <stop stopColor="#3b2027" />
          <stop offset="1" stopColor="#70404a" />
        </linearGradient>
      </defs>
      <ellipse cx="280" cy="273" rx="190" ry="18" fill="#7d394b" opacity=".1" />
      {/* girl */}
      <g transform="translate(318 15)">
        <path d="M33 91 Q19 132 4 185 L76 185 Q92 134 69 91Z" fill="url(#pr-dress)" />
        <path d="M27 181 L43 181 L41 232 L26 232Z" fill="url(#pr-skin)" />
        <path d="M53 181 L68 181 L78 232 L63 232Z" fill="url(#pr-skin)" />
        <path d="M20 231 Q35 224 47 235 L47 242 L15 242Z" fill="#87364c" />
        <path d="M62 231 Q77 224 88 235 L90 242 L61 242Z" fill="#87364c" />
        <path d="M32 43 Q33 16 54 17 Q77 18 77 43 L70 67 Q56 81 43 67Z" fill="url(#pr-skin)" />
        <path d="M29 47 Q17 17 43 7 Q68 -2 81 23 L78 43 L67 29 Q48 39 33 29Z" fill="url(#pr-hair)" />
        <ellipse cx="45" cy="43" rx="2.5" ry="3" fill="#4a2830" />
        <ellipse cx="64" cy="43" rx="2.5" ry="3" fill="#4a2830" />
        <path d="M46 57 Q55 65 64 57" fill="none" stroke="#a95361" strokeWidth="2" strokeLinecap="round" />
        <path d="M31 104 Q3 116 13 141 L41 160 L50 146 L36 128Z" fill="url(#pr-dress)" />
        <path d="M72 104 Q89 121 73 145 L54 162 L45 150 L60 130Z" fill="url(#pr-dress)" />
        <path d="M43 145 Q54 137 61 147 L65 164 L48 172 L38 159Z" fill="url(#pr-skin)" />
        <path d="M44 148 Q56 138 66 149 L78 139 L86 150 L66 168 L49 164Z" fill="#4e8b60" />
        <g fill="#c65b78">
          <circle cx="81" cy="136" r="10" />
          <circle cx="91" cy="148" r="9" />
          <circle cx="72" cy="150" r="9" />
          <circle cx="84" cy="158" r="8" />
        </g>
        <g fill="#f4c5cb">
          <circle cx="81" cy="136" r="4" />
          <circle cx="91" cy="148" r="3" />
          <circle cx="72" cy="150" r="3" />
        </g>
      </g>
      {/* kneeling boy */}
      <g transform="translate(104 47)">
        <path d="M61 107 Q80 105 96 122 L115 169 L86 188 L52 157 L29 153 L23 137Z" fill="#eee0d2" />
        <path d="M81 174 L116 167 Q139 175 139 195 L113 213 L74 205 L57 191Z" fill="#50404a" />
        <path d="M91 202 L116 211 L145 225 Q151 237 136 238 L99 224 L75 217Z" fill="#3d3038" />
        <path d="M49 154 L70 170 L52 200 L22 209 Q8 209 13 196 L34 179Z" fill="#55444d" />
        <path d="M18 200 Q13 193 3 201 L-3 211 L34 215 Q43 208 34 202Z" fill="#5d3340" />
        <path d="M56 103 Q33 89 31 69 Q29 45 50 39 Q73 34 83 58 L81 79 Q74 94 56 103Z" fill="url(#pr-skin)" />
        <path d="M28 70 Q17 43 41 28 Q66 12 84 37 L86 58 L72 48 Q54 55 37 48Z" fill="url(#pr-hair)" />
        <ellipse cx="46" cy="63" rx="2.5" ry="3" fill="#4a2830" />
        <ellipse cx="65" cy="63" rx="2.5" ry="3" fill="#4a2830" />
        <path d="M46 77 Q55 83 63 76" fill="none" stroke="#a95361" strokeWidth="2" strokeLinecap="round" />
        <path d="M46 107 Q62 97 78 110 L90 145 L66 169 L35 149Z" fill="#f4e4d5" />
        <path d="M44 115 Q23 125 33 147 L54 159 L65 146 L54 130Z" fill="#e5cdbb" />
        <path d="M73 112 Q91 125 83 144 L67 157 L58 147 L69 130Z" fill="#f4e4d5" />
        <path d="M51 143 Q61 135 68 143 L78 157 L67 166 L52 156Z" fill="url(#pr-skin)" />
        <path d="M60 145 L74 128 L82 135 L69 153Z" fill="#4e8b60" />
        <g fill="#c65b78">
          <circle cx="78" cy="125" r="9" />
          <circle cx="89" cy="135" r="8" />
          <circle cx="70" cy="137" r="8" />
          <circle cx="81" cy="144" r="7" />
        </g>
        <g fill="#f5c8d0">
          <circle cx="78" cy="125" r="4" />
          <circle cx="89" cy="135" r="3" />
        </g>
      </g>
      {/* sparkles */}
      <g fill="#c4a067">
        <path d="M275 50 L280 64 L294 69 L280 74 L275 88 L270 74 L256 69 L270 64Z" />
        <path d="M430 210 L434 220 L444 224 L434 228 L430 238 L426 228 L416 224 L426 220Z" />
        <circle cx="119" cy="64" r="3" />
        <circle cx="454" cy="86" r="3" />
      </g>
    </svg>
  );
}
