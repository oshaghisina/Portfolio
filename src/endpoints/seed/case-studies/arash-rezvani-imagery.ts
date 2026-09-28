import type { Locale } from '@/utilities/locale'

/**
 * The imagery chapter of `/work/arash-rezvani`: every image Sina generated for the site from
 * Arash's photographs, exported from `Design/Arash Rezvani Images` into `assets/imagery/`.
 *
 * - `turnarounds/` — the nine Main Style wardrobe turnarounds (`Main Style/`), the continuity
 *   reference for everything after them.
 * - `site/` — the generated images that reached arashrezvani.me (`Output/<slot>/`). The 1200×630
 *   share card is a crop of the closing band, so it is named in the caption, not repeated.
 * - `studies/` — the seventeen Main Style sample adaptations
 *   (`Output/main-style-sample-adaptations/`; sample 6 is the turnarounds, sample 18 has no image).
 *
 * Crops of his real photographs (the About portrait, the avatar, four About cards) and his book
 * covers are his, not generated work, and are never uploaded here. en/fa alts are the workspace's
 * own `.alt.md` pairs; the other five locales are machine-drafted. The chapter's prose and
 * captions live with the rest of the study's copy, in `arash-rezvani-copy/<locale>.json`.
 */

type Alt = Record<Locale, string>
interface ImageSpec {
  file: string
  alt: Alt
}

/** Nine wardrobes; each alt is the locale's frame sentence around one outfit phrase. */
const TURNAROUND_FRAME: Record<Exclude<Locale, 'en' | 'fa'>, (outfit: string) => string> = {
  ar: (o) =>
    `لوحة دوران استوديو من تسع لقطات لآرش ${o}، من الأمام والجانب والخلف وبزاوية ثلاثة أرباع ومن الأسفل.`,
  es: (o) =>
    `Hoja de giro de estudio en nueve vistas de Arash ${o}, de frente, de perfil, de espaldas, en tres cuartos y en contrapicado.`,
  de: (o) =>
    `Neunteiliges Studio-Turnaround von Arash ${o}, frontal, im Profil, von hinten, im Dreiviertelprofil und aus der Untersicht.`,
  fr: (o) =>
    `Planche de rotation en studio en neuf vues d’Arash ${o}, de face, de profil, de dos, de trois quarts et en contre-plongée.`,
  ja: (o) => `アラシュの9面スタジオ・ターンアラウンド。${o}。正面、横顔、背面、斜め、見上げの各角度。`,
}

const turnaround = (
  file: string,
  en: string,
  fa: string,
  outfit: Record<Exclude<Locale, 'en' | 'fa'>, string>,
): ImageSpec => ({
  file: `turnarounds/${file}.jpg`,
  alt: {
    en,
    fa,
    ar: TURNAROUND_FRAME.ar(outfit.ar),
    es: TURNAROUND_FRAME.es(outfit.es),
    de: TURNAROUND_FRAME.de(outfit.de),
    fr: TURNAROUND_FRAME.fr(outfit.fr),
    ja: TURNAROUND_FRAME.ja(outfit.ja),
  },
})

export const ARR_TURNAROUNDS: ImageSpec[] = [
  turnaround(
    '01-signature-literary-artist',
    'Nine-panel studio turnaround of Arash wearing round glasses, a white shirt, and a two-tone woven hat, shown from frontal, profile, rear, three-quarter, and upward-facing angles.',
    'شیت چرخش استودیویی نه‌قابی از آرش با عینک گرد، پیراهن سفید و کلاه حصیری دورنگ، در نماهای روبه‌رو، نیم‌رخ، پشت، سه‌رخ و رو به بالا.',
    {
      ar: 'بنظارة مستديرة داكنة وقبعة منسوجة بلونين وقميص أبيض مفتوح الياقة',
      es: 'con gafas redondas oscuras, sombrero tejido bicolor y camisa blanca de cuello abierto',
      de: 'mit runder dunkler Brille, zweifarbigem Flechthut und weißem Hemd mit offenem Kragen',
      fr: 'avec des lunettes rondes foncées, un chapeau tressé bicolore et une chemise blanche au col ouvert',
      ja: '丸い濃色の眼鏡、ツートーンの編み帽子、開襟の白シャツ',
    },
  ),
  turnaround(
    '02-relaxed-creative-traveler',
    'Nine-panel studio turnaround of Arash in a dark woven hat and pale sage shirt, shown from frontal, profile, rear, three-quarter, and upward-facing angles.',
    'شیت چرخش استودیویی نه‌قابی از آرش با کلاه حصیری تیره و پیراهن سبز مریم‌گلی روشن، در نماهای روبه‌رو، نیم‌رخ، پشت، سه‌رخ و رو به بالا.',
    {
      ar: 'بقبعة منسوجة داكنة وقميص بلون المريمية الفاتح',
      es: 'con sombrero tejido oscuro y camisa verde salvia claro',
      de: 'mit dunklem Flechthut und hellem salbeigrünem Hemd',
      fr: 'avec un chapeau tressé sombre et une chemise vert sauge pâle',
      ja: '濃色の編み帽子、淡いセージグリーンのシャツ',
    },
  ),
  turnaround(
    '03-formal-educator',
    'Nine-panel studio turnaround of bare-headed Arash in a dark navy blazer and white shirt, shown from frontal, profile, rear, three-quarter, and upward-facing angles.',
    'شیت چرخش استودیویی نه‌قابی از آرش بدون کلاه، با کت سرمه‌ای تیره و پیراهن سفید، در نماهای روبه‌رو، نیم‌رخ، پشت، سه‌رخ و رو به بالا.',
    {
      ar: 'حاسر الرأس بسترة كحلية داكنة وقميص أبيض',
      es: 'sin sombrero, con americana azul marino oscuro y camisa blanca',
      de: 'ohne Kopfbedeckung, in dunkelblauem Sakko und weißem Hemd',
      fr: 'tête nue, en veste bleu marine foncé et chemise blanche',
      ja: '帽子なし、濃紺のジャケットに白シャツ',
    },
  ),
  turnaround(
    '04-urban-smart-casual',
    'Nine-panel studio turnaround of Arash wearing round glasses, a muted lavender-gray blazer, and a black shirt, shown from frontal, profile, rear, three-quarter, and upward-facing angles.',
    'شیت چرخش استودیویی نه‌قابی از آرش با عینک گرد، کت خاکستریِ متمایل به یاسی و پیراهن مشکی، در نماهای روبه‌رو، نیم‌رخ، پشت، سه‌رخ و رو به بالا.',
    {
      ar: 'بنظارة مستديرة شفافة وسترة رمادية مائلة إلى الخزامى وقميص أسود',
      es: 'con gafas redondas transparentes, americana gris lavanda apagado y camisa negra',
      de: 'mit runder klarer Brille, gedämpft lavendelgrauem Sakko und schwarzem Hemd',
      fr: 'avec des lunettes rondes transparentes, une veste gris lavande sourd et une chemise noire',
      ja: '丸いクリアレンズの眼鏡、くすんだラベンダーグレーのジャケット、黒シャツ',
    },
  ),
  turnaround(
    '05-heritage-motorcyclist',
    'Nine-panel studio turnaround of Arash in a plain dark cap, round glasses, white shirt, checked vest, and monochrome bandana, shown from frontal, profile, rear, three-quarter, and upward-facing angles.',
    'شیت چرخش استودیویی نه‌قابی از آرش با کلاه تیره ساده، عینک گرد، پیراهن سفید، جلیقه چهارخانه و دستمال‌گردن تک‌رنگ، در نماهای روبه‌رو، نیم‌رخ، پشت، سه‌رخ و رو به بالا.',
    {
      ar: 'بقبعة داكنة بسيطة ونظارة مستديرة وقميص أبيض وصدرية مربعات ومنديل عنق أحادي اللون',
      es: 'con gorra oscura lisa, gafas redondas, camisa blanca, chaleco de cuadros y pañuelo monocromo',
      de: 'mit schlichter dunkler Kappe, runder Brille, weißem Hemd, kariertem Gilet und einfarbigem Halstuch',
      fr: 'avec une casquette sombre unie, des lunettes rondes, une chemise blanche, un gilet à carreaux et un bandana monochrome',
      ja: '無地の濃色キャップ、丸眼鏡、白シャツ、チェックのベスト、モノクロのバンダナ',
    },
  ),
  turnaround(
    '06-motorcycle-coach',
    'Nine-panel studio turnaround of Arash wearing a plain navy cap, round glasses, and a cobalt quarter-zip training top, shown from frontal, profile, rear, three-quarter, and upward-facing angles.',
    'شیت چرخش استودیویی نه‌قابی از آرش با کلاه سرمه‌ای ساده، عینک گرد و بلوز تمرینی نیم‌زیپ آبی، در نماهای روبه‌رو، نیم‌رخ، پشت، سه‌رخ و رو به بالا.',
    {
      ar: 'بقبعة كحلية بسيطة ونظارة مستديرة وقميص تدريب أزرق كوبالتي بسحّاب قصير',
      es: 'con gorra azul marino lisa, gafas redondas y sudadera de entrenamiento cobalto con media cremallera',
      de: 'mit schlichter marineblauer Kappe, runder Brille und kobaltblauem Trainingsshirt mit kurzem Reißverschluss',
      fr: 'avec une casquette bleu marine unie, des lunettes rondes et un haut d’entraînement cobalt à col zippé',
      ja: '無地の紺のキャップ、丸眼鏡、コバルトブルーのハーフジップのトレーニングウェア',
    },
  ),
  turnaround(
    '07-adventure-tourer',
    'Nine-panel studio turnaround of bare-headed Arash in an unbranded light-gray and black motorcycle touring jacket, shown from frontal, profile, rear, three-quarter, and upward-facing angles.',
    'شیت چرخش استودیویی نه‌قابی از آرش بدون کلاه، با کت بی‌نشانِ موتورسواری خاکستری روشن و مشکی، در نماهای روبه‌رو، نیم‌رخ، پشت، سه‌رخ و رو به بالا.',
    {
      ar: 'حاسر الرأس بسترة رحلات للدراجات النارية رمادية فاتحة وسوداء بلا علامة تجارية',
      es: 'sin sombrero, con chaqueta de mototurismo gris claro y negra sin marca',
      de: 'ohne Kopfbedeckung, in markenloser hellgrau-schwarzer Motorrad-Tourenjacke',
      fr: 'tête nue, en veste de moto-tourisme gris clair et noire sans marque',
      ja: '帽子なし、ロゴのないライトグレーと黒のツーリングジャケット',
    },
  ),
  turnaround(
    '08-field-traveler',
    'Nine-panel studio turnaround of Arash in an ochre cap, dark round sunglasses, and a layered olive field jacket, shown from frontal, profile, rear, three-quarter, and upward-facing angles.',
    'شیت چرخش استودیویی نه‌قابی از آرش با کلاه اخرایی، عینک آفتابی گرد تیره و کت صحرایی زیتونی چندلایه، در نماهای روبه‌رو، نیم‌رخ، پشت، سه‌رخ و رو به بالا.',
    {
      ar: 'بقبعة بلون المغرة ونظارة شمسية مستديرة داكنة وسترة ميدانية زيتونية متعددة الطبقات',
      es: 'con gorra ocre, gafas de sol redondas oscuras y chaqueta de campo verde oliva por capas',
      de: 'mit ockerfarbener Kappe, dunkler runder Sonnenbrille und olivgrüner Feldjacke im Lagenlook',
      fr: 'avec une casquette ocre, des lunettes de soleil rondes foncées et une veste de terrain olive superposée',
      ja: '黄土色のキャップ、丸い濃色のサングラス、重ね着したオリーブ色のフィールドジャケット',
    },
  ),
  turnaround(
    '09-relief-service-fieldwear',
    'Nine-panel studio turnaround of bare-headed Arash in an unbranded red-and-white utility vest over a dark shirt, shown from frontal, profile, rear, three-quarter, and upward-facing angles.',
    'شیت چرخش استودیویی نه‌قابی از آرش بدون کلاه، با جلیقه کاربردی قرمز و سفیدِ بدون نشان روی پیراهن تیره، در نماهای روبه‌رو، نیم‌رخ، پشت، سه‌رخ و رو به بالا.',
    {
      ar: 'حاسر الرأس بصدرية عمل حمراء وبيضاء بلا شعار فوق قميص داكن',
      es: 'sin sombrero, con chaleco utilitario rojo y blanco sin insignias sobre camisa oscura',
      de: 'ohne Kopfbedeckung, in abzeichenloser rot-weißer Arbeitsweste über dunklem Hemd',
      fr: 'tête nue, en gilet utilitaire rouge et blanc sans insigne sur une chemise sombre',
      ja: '帽子なし、濃色のシャツの上に記章のない赤と白のユーティリティベスト',
    },
  ),
]

export const ARR_SITE_IMAGES: ImageSpec[] = [
  {
    file: 'site/01-masthead-three-window.jpg',
    alt: {
      en: 'Three-window graphic portrait of Arash in left profile, frontal three-quarter view and right profile, wearing round glasses and a two-tone woven hat.',
      fa: 'پرتره‌ی گرافیکی سه‌پنجره‌ای از آرش در نیم‌رخ چپ، نمای سه‌رخ روبه‌رو و نیم‌رخ راست، با عینک گرد و کلاه حصیری دورنگ.',
      ar: 'بورتريه غرافيكي بثلاث نوافذ لآرش: جانب أيسر، ونظرة ثلاثة أرباع أمامية، وجانب أيمن، بنظارة مستديرة وقبعة منسوجة بلونين.',
      es: 'Retrato gráfico en tres ventanas de Arash, de perfil izquierdo, en tres cuartos frontal y de perfil derecho, con gafas redondas y sombrero tejido bicolor.',
      de: 'Grafisches Drei-Fenster-Porträt von Arash im linken Profil, frontal im Dreiviertelprofil und im rechten Profil, mit runder Brille und zweifarbigem Flechthut.',
      fr: 'Portrait graphique en trois fenêtres d’Arash, de profil gauche, de trois quarts face et de profil droit, avec des lunettes rondes et un chapeau tressé bicolore.',
      ja: '三つの窓で構成したアラシュのグラフィック・ポートレート。左の横顔、正面寄りの斜め、右の横顔。丸眼鏡とツートーンの編み帽子。',
    },
  },
  {
    file: 'site/02-masthead-mountain-collage.jpg',
    alt: {
      en: 'Rectilinear portrait collage of Arash Rezvani in a dark cap, layered with abstract mountain and road photographs on a textured paper ground.',
      fa: 'کلاژ پرتره‌ای مستطیل‌محور از آرش رضوانی با کلاهی تیره، لایه‌گذاری‌شده با عکس‌های انتزاعی از کوه و جاده بر زمینه‌ای با بافت کاغذی.',
      ar: 'كولاج بورتريه مستطيل لآرش رضواني بقبعة داكنة، تتراكب عليه صور مجردة لجبل وطريق على أرضية ورقية محببة.',
      es: 'Collage retrato rectilíneo de Arash Rezvani con gorra oscura, superpuesto a fotografías abstractas de montaña y carretera sobre un fondo de papel texturizado.',
      de: 'Geradlinige Porträtcollage von Arash Rezvani mit dunkler Kappe, geschichtet mit abstrakten Berg- und Straßenfotos auf strukturiertem Papiergrund.',
      fr: 'Collage portrait rectiligne d’Arash Rezvani en casquette sombre, superposé à des photographies abstraites de montagne et de route sur un fond de papier texturé.',
      ja: '濃色のキャップをかぶったアラシュ・レズヴァーニーの直線的なポートレート・コラージュ。質感のある紙の地に、山と道の抽象的な写真を重ねている。',
    },
  },
  {
    file: 'site/03-card-writing-notebook.jpg',
    alt: {
      en: 'Hands writing with a pen in an open notebook on a desk in raking window light, a glass beside it.',
      fa: 'دست‌هایی که با خودکار در دفتری باز روی میز می‌نویسند، در نور مورب پنجره، و لیوانی در کنارش.',
      ar: 'يدان تكتبان بقلم في دفتر مفتوح على مكتب في ضوء نافذة مائل، وبجانبه كأس.',
      es: 'Manos que escriben con un bolígrafo en un cuaderno abierto sobre un escritorio, con luz rasante de ventana y un vaso al lado.',
      de: 'Hände schreiben mit einem Stift in ein offenes Notizbuch auf einem Schreibtisch, im Streiflicht eines Fensters, daneben ein Glas.',
      fr: 'Des mains écrivent au stylo dans un carnet ouvert sur un bureau, sous une lumière rasante de fenêtre, un verre à côté.',
      ja: '斜めに差す窓の光の中、机の上の開いたノートにペンで書く手。そばにグラス。',
    },
  },
  {
    file: 'site/04-card-window-light-figure.jpg',
    alt: {
      en: 'Full-length figure in dark clothing walking through a bare room across a grid of window light.',
      fa: 'پیکری تمام‌قد با لباس تیره که در اتاقی خالی از میان شبکه‌ای از نور پنجره می‌گذرد.',
      ar: 'شخص كامل القامة بملابس داكنة يمشي في غرفة خالية عبر شبكة من ضوء النافذة.',
      es: 'Figura de cuerpo entero con ropa oscura que cruza una habitación vacía sobre una retícula de luz de ventana.',
      de: 'Ganzfigur in dunkler Kleidung, die durch einen leeren Raum über ein Raster aus Fensterlicht geht.',
      fr: 'Silhouette en pied, vêtue de sombre, traversant une pièce vide sur une grille de lumière de fenêtre.',
      ja: '暗い服の人物の全身像。何もない部屋を、窓の光の格子を横切って歩いている。',
    },
  },
  {
    file: 'site/05-card-motorcycle-multiview.jpg',
    alt: {
      en: 'Unbranded multi-view ink illustration of an adventure-touring motorcycle on a white ground.',
      fa: 'تصویرسازی مرکبی چندنما از یک موتورسیکلت ماجراجویی‌ـ‌گردشگری بی‌نشان بر زمینه‌ی سفید.',
      ar: 'رسم بالحبر متعدد المناظر لدراجة نارية للمغامرة والرحلات بلا علامة تجارية على أرضية بيضاء.',
      es: 'Ilustración a tinta en varias vistas de una moto de aventura y turismo sin marca sobre fondo blanco.',
      de: 'Mehransichtige Tuschezeichnung eines markenlosen Adventure-Tourenmotorrads auf weißem Grund.',
      fr: 'Illustration à l’encre en plusieurs vues d’une moto d’aventure et de tourisme sans marque sur fond blanc.',
      ja: '白地に描いた、ロゴのないアドベンチャーツアラー・バイクの多面インク画。',
    },
  },
  {
    file: 'site/06-card-rider-collage.jpg',
    alt: {
      en: 'Screen-print collage of Arash in a dark cap above an anonymous rider crossing an abstract mountain road.',
      fa: 'کلاژی به شیوه‌ی چاپ سیلک از آرش با کلاهی تیره، بر فراز موتورسوارِ بی‌نامی که از جاده‌ای کوهستانی و انتزاعی می‌گذرد.',
      ar: 'كولاج بأسلوب الطباعة الحريرية لآرش بقبعة داكنة فوق راكب مجهول يعبر طريقًا جبليًا مجردًا.',
      es: 'Collage en serigrafía de Arash con gorra oscura sobre un motorista anónimo que cruza una carretera de montaña abstracta.',
      de: 'Siebdruck-Collage von Arash mit dunkler Kappe über einem anonymen Fahrer auf einer abstrakten Bergstraße.',
      fr: 'Collage façon sérigraphie d’Arash en casquette sombre, au-dessus d’un motard anonyme sur une route de montagne abstraite.',
      ja: 'シルクスクリーン風のコラージュ。濃色のキャップのアラシュの下を、名もないライダーが抽象的な山道を走る。',
    },
  },
  {
    file: 'site/07-card-profile-portrait.jpg',
    alt: {
      en: 'Profile portrait of Arash Rezvani in a plain dark cap against an even grey ground.',
      fa: 'پرتره‌ی نیم‌رخ آرش رضوانی با کلاهی تیره و ساده در برابر زمینه‌ای خاکستری و یکدست.',
      ar: 'بورتريه جانبي لآرش رضواني بقبعة داكنة بسيطة أمام خلفية رمادية متجانسة.',
      es: 'Retrato de perfil de Arash Rezvani con gorra oscura lisa sobre un fondo gris uniforme.',
      de: 'Profilporträt von Arash Rezvani mit schlichter dunkler Kappe vor gleichmäßig grauem Grund.',
      fr: 'Portrait de profil d’Arash Rezvani en casquette sombre unie sur un fond gris uniforme.',
      ja: '無地の濃色キャップをかぶったアラシュ・レズヴァーニーの横顔。均一なグレーの背景。',
    },
  },
  {
    file: 'site/08-card-seated-table.jpg',
    alt: {
      en: 'Arash seated at a table in warm window light, looking away from the camera.',
      fa: 'آرش نشسته پشت میزی در نور گرم پنجره، نگاهش رو به بیرون از قاب.',
      ar: 'آرش جالسًا إلى طاولة في ضوء نافذة دافئ، ينظر بعيدًا عن الكاميرا.',
      es: 'Arash sentado a una mesa con cálida luz de ventana, mirando fuera de cámara.',
      de: 'Arash an einem Tisch im warmen Fensterlicht, den Blick von der Kamera abgewandt.',
      fr: 'Arash assis à une table dans une chaude lumière de fenêtre, le regard hors champ.',
      ja: '暖かな窓の光の中、テーブルに座りカメラから目をそらすアラシュ。',
    },
  },
  {
    file: 'site/09-band-overhead-figure.jpg',
    alt: {
      en: 'Overhead view of a lone figure in dark clothing standing on a pale mist-grey ground, crossed by a hard-edged diagonal shadow.',
      fa: 'نمای از بالا از پیکری تنها با لباس تیره، ایستاده بر زمینه‌ای روشن و مه‌خاکستری، که سایه‌ای مورب و تیزلبه آن را قطع می‌کند.',
      ar: 'منظر علوي لشخص وحيد بملابس داكنة يقف على أرضية رمادية ضبابية فاتحة، يقطعها ظل قطري حاد الحواف.',
      es: 'Vista cenital de una figura solitaria vestida de oscuro sobre un suelo gris niebla claro, cruzada por una sombra diagonal de bordes nítidos.',
      de: 'Aufsicht auf eine einzelne dunkel gekleidete Figur auf hellem nebelgrauem Grund, durchschnitten von einem scharfkantigen diagonalen Schatten.',
      fr: 'Vue plongeante d’une silhouette solitaire vêtue de sombre sur un sol gris brume pâle, traversée par une ombre diagonale aux bords nets.',
      ja: '淡いミストグレーの床に立つ、暗い服の人物を真上から見た図。輪郭のはっきりした斜めの影が横切る。',
    },
  },
  {
    file: 'site/10-card-ink-cobalt-panel.jpg',
    alt: {
      en: 'Abstract panel of black ink and cobalt brush strokes on a pale canvas.',
      fa: 'تابلوی انتزاعی با ضربه‌های قلم‌موی مرکب سیاه و آبی کبالت روی بومی روشن.',
      ar: 'لوحة مجردة من ضربات فرشاة بالحبر الأسود والأزرق الكوبالتي على قماش فاتح.',
      es: 'Panel abstracto de pinceladas de tinta negra y azul cobalto sobre un lienzo claro.',
      de: 'Abstrakte Tafel aus Pinselstrichen in schwarzer Tusche und Kobaltblau auf hellem Malgrund.',
      fr: 'Panneau abstrait de coups de pinceau à l’encre noire et bleu cobalt sur une toile claire.',
      ja: '淡いキャンバスに黒い墨とコバルトブルーの筆致を重ねた抽象パネル。',
    },
  },
  {
    file: 'site/11-card-camera-flatlay.jpg',
    alt: {
      en: 'Overhead still life: a film camera, small prints, the brim of a woven hat and a blank notebook on a dark blue cloth.',
      fa: 'طبیعت بی‌جان از بالا: دوربین فیلمی، چند عکس کوچک، لبه‌ی کلاه حصیری و دفتری خالی روی پارچه‌ای آبی تیره.',
      ar: 'طبيعة صامتة من الأعلى: كاميرا فيلمية وصور صغيرة وحافة قبعة منسوجة ودفتر فارغ على قماش أزرق داكن.',
      es: 'Bodegón cenital: una cámara de película, pequeñas copias, el ala de un sombrero tejido y un cuaderno en blanco sobre una tela azul oscuro.',
      de: 'Stillleben von oben: eine Filmkamera, kleine Abzüge, die Krempe eines Flechthuts und ein leeres Notizbuch auf dunkelblauem Stoff.',
      fr: 'Nature morte vue du dessus : un appareil argentique, de petits tirages, le bord d’un chapeau tressé et un carnet vierge sur un tissu bleu foncé.',
      ja: '上から見た静物。フィルムカメラ、小さなプリント、編み帽子のつば、白紙のノートが濃紺の布の上に。',
    },
  },
]

export const ARR_STUDIES: ImageSpec[] = [
  {
    file: 'studies/01-editorial-grid.jpg',
    alt: {
      en: 'Nine-panel editorial portrait mosaic of Arash Rezvani in clear round glasses, a muted lavender-gray blazer, and a black shirt under hard window light.',
      fa: 'موزاییک پرتره ادیتوریال نه‌قابی از آرش رضوانی با عینک گرد شفاف، کت خاکستری متمایل به یاسی و پیراهن مشکی در نور سخت پنجره.',
      ar: 'فسيفساء بورتريه تحريرية من تسع لوحات لآرش رضواني بنظارة مستديرة شفافة وسترة رمادية مائلة إلى الخزامى وقميص أسود في ضوء نافذة حاد.',
      es: 'Mosaico editorial de nueve retratos de Arash Rezvani con gafas redondas transparentes, americana gris lavanda y camisa negra, bajo una luz dura de ventana.',
      de: 'Neunteiliges Editorial-Porträtmosaik von Arash Rezvani mit runder klarer Brille, lavendelgrauem Sakko und schwarzem Hemd im harten Fensterlicht.',
      fr: 'Mosaïque éditoriale de neuf portraits d’Arash Rezvani, lunettes rondes transparentes, veste gris lavande et chemise noire, sous une lumière dure de fenêtre.',
      ja: '硬い窓の光の中、丸いクリアレンズの眼鏡、ラベンダーグレーのジャケット、黒シャツ姿のアラシュ・レズヴァーニーを9コマで構成したエディトリアル・ポートレート。',
    },
  },
  {
    file: 'studies/02-four-distances.jpg',
    alt: {
      en: 'Four-part editorial study of Arash Rezvani in a navy blazer and white shirt, shown from overhead, close, seated, and rear views.',
      fa: 'مطالعه ادیتوریال چهارقابی از آرش رضوانی با کت سرمه‌ای و پیراهن سفید، در نماهای از بالا، نزدیک، نشسته و پشت.',
      ar: 'دراسة تحريرية من أربعة أجزاء لآرش رضواني بسترة كحلية وقميص أبيض، من الأعلى وعن قرب وجالسًا ومن الخلف.',
      es: 'Estudio editorial en cuatro partes de Arash Rezvani con americana azul marino y camisa blanca: cenital, de cerca, sentado y de espaldas.',
      de: 'Vierteilige Editorial-Studie von Arash Rezvani in marineblauem Sakko und weißem Hemd: von oben, nah, sitzend und von hinten.',
      fr: 'Étude éditoriale en quatre parties d’Arash Rezvani en veste bleu marine et chemise blanche : en plongée, de près, assis et de dos.',
      ja: '紺のジャケットに白シャツのアラシュ・レズヴァーニーを、真上、近景、着席、背面の4つの距離で捉えたエディトリアル・スタディ。',
    },
  },
  {
    file: 'studies/03-illustrated-rider.jpg',
    alt: {
      en: 'Illustrated portrait of Arash riding an unbranded motorcycle on an abstract mountain road, wearing a light gray and black touring jacket.',
      fa: 'پرتره تصویرسازی‌شده از آرش هنگام راندن موتورسیکلتی بی‌نشان در جاده‌ای کوهستانی و انتزاعی، با کت گردشگری خاکستری روشن و مشکی.',
      ar: 'بورتريه مرسوم لآرش يقود دراجة نارية بلا علامة تجارية على طريق جبلي مجرد، بسترة رحلات رمادية فاتحة وسوداء.',
      es: 'Retrato ilustrado de Arash conduciendo una moto sin marca por una carretera de montaña abstracta, con chaqueta de mototurismo gris claro y negra.',
      de: 'Illustriertes Porträt von Arash auf einem markenlosen Motorrad auf einer abstrakten Bergstraße, in hellgrau-schwarzer Tourenjacke.',
      fr: 'Portrait illustré d’Arash au guidon d’une moto sans marque sur une route de montagne abstraite, en veste de tourisme gris clair et noire.',
      ja: '抽象的な山道でロゴのないバイクに乗るアラシュのイラスト・ポートレート。ライトグレーと黒のツーリングジャケット。',
    },
  },
  {
    file: 'studies/04-road-collage.jpg',
    alt: {
      en: 'Paper-collage portrait of Arash in a cap, glasses, checked vest, and bandana, with an abstract mountain road and a distant unbranded motorcycle.',
      fa: 'کلاژ کاغذی از پرتره آرش با کلاه، عینک، جلیقه چهارخانه و دستمال‌گردن، همراه با جاده‌ای کوهستانی و انتزاعی و موتورسیکلتی بی‌نشان در دوردست.',
      ar: 'كولاج ورقي لآرش بقبعة ونظارة وصدرية مربعات ومنديل عنق، مع طريق جبلي مجرد ودراجة نارية بلا علامة في البعيد.',
      es: 'Collage de papel de Arash con gorra, gafas, chaleco de cuadros y pañuelo, con una carretera de montaña abstracta y una moto sin marca a lo lejos.',
      de: 'Papiercollage von Arash mit Kappe, Brille, kariertem Gilet und Halstuch, mit abstrakter Bergstraße und einem markenlosen Motorrad in der Ferne.',
      fr: 'Collage de papier d’Arash en casquette, lunettes, gilet à carreaux et bandana, avec une route de montagne abstraite et une moto sans marque au loin.',
      ja: 'キャップ、眼鏡、チェックのベスト、バンダナ姿のアラシュの紙コラージュ。抽象的な山道と、遠くにロゴのないバイク。',
    },
  },
  {
    file: 'studies/05-motorcycle-study.jpg',
    alt: {
      en: 'Editorial illustration of a generic unbranded motorcycle in several views, with a small portrait of Arash in a navy cap and cobalt training top.',
      fa: 'تصویرسازی ادیتوریال از یک موتورسیکلت عمومی و بی‌نشان در چند نما، همراه با پرتره‌ای کوچک از آرش با کلاه سرمه‌ای و بلوز تمرینی آبی.',
      ar: 'رسم تحريري لدراجة نارية عامة بلا علامة من عدة زوايا، مع بورتريه صغير لآرش بقبعة كحلية وقميص تدريب كوبالتي.',
      es: 'Ilustración editorial de una moto genérica sin marca en varias vistas, con un pequeño retrato de Arash con gorra azul marino y sudadera cobalto.',
      de: 'Editorial-Illustration eines generischen markenlosen Motorrads in mehreren Ansichten, mit kleinem Porträt von Arash in marineblauer Kappe und kobaltblauem Trainingsshirt.',
      fr: 'Illustration éditoriale d’une moto générique sans marque sous plusieurs angles, avec un petit portrait d’Arash en casquette bleu marine et haut d’entraînement cobalt.',
      ja: 'ロゴのない汎用バイクを複数の角度から描いたエディトリアル・イラスト。紺のキャップとコバルトのトレーニングウェアのアラシュの小さな肖像を添えて。',
    },
  },
  {
    file: 'studies/07-road-poster.jpg',
    alt: {
      en: 'Text-free screen-print poster of Arash beside an unbranded motorcycle in an abstract mountain-road landscape, wearing a cap, glasses, vest, and bandana.',
      fa: 'پوستر بدون متن با چاپ سیلک از آرش در کنار موتورسیکلتی بی‌نشان در منظره‌ای انتزاعی از جاده کوهستانی، با کلاه، عینک، جلیقه و دستمال‌گردن.',
      ar: 'ملصق بلا نص بطباعة حريرية لآرش بجانب دراجة نارية بلا علامة في منظر طريق جبلي مجرد، بقبعة ونظارة وصدرية ومنديل عنق.',
      es: 'Cartel serigráfico sin texto de Arash junto a una moto sin marca en un paisaje abstracto de carretera de montaña, con gorra, gafas, chaleco y pañuelo.',
      de: 'Textloses Siebdruckplakat von Arash neben einem markenlosen Motorrad in einer abstrakten Bergstraßenlandschaft, mit Kappe, Brille, Weste und Halstuch.',
      fr: 'Affiche sérigraphiée sans texte d’Arash près d’une moto sans marque dans un paysage abstrait de route de montagne, en casquette, lunettes, gilet et bandana.',
      ja: '文字のないシルクスクリーン風ポスター。抽象的な山道の風景で、ロゴのないバイクの横に立つキャップ、眼鏡、ベスト、バンダナ姿のアラシュ。',
    },
  },
  {
    file: 'studies/08-three-window.jpg',
    alt: {
      en: 'Three-window editorial portrait of Arash in round dark glasses, a woven two-tone hat, and a white open-collar shirt.',
      fa: 'پرتره ادیتوریال سه‌پنجره‌ای از آرش با عینک گرد تیره، کلاه حصیری دورنگ و پیراهن سفید یقه‌باز.',
      ar: 'بورتريه تحريري بثلاث نوافذ لآرش بنظارة مستديرة داكنة وقبعة منسوجة بلونين وقميص أبيض مفتوح الياقة.',
      es: 'Retrato editorial en tres ventanas de Arash con gafas redondas oscuras, sombrero tejido bicolor y camisa blanca de cuello abierto.',
      de: 'Editorial-Porträt in drei Fenstern von Arash mit runder dunkler Brille, zweifarbigem Flechthut und weißem Hemd mit offenem Kragen.',
      fr: 'Portrait éditorial en trois fenêtres d’Arash, lunettes rondes foncées, chapeau tressé bicolore et chemise blanche au col ouvert.',
      ja: '丸い濃色の眼鏡、ツートーンの編み帽子、開襟の白シャツ姿のアラシュを三つの窓で見せるエディトリアル・ポートレート。',
    },
  },
  {
    file: 'studies/09-monumental-forms.jpg',
    alt: {
      en: 'Full-length editorial portrait of Arash in a navy blazer among large abstract paper-and-wood forms in a cool studio.',
      fa: 'پرتره تمام‌قد ادیتوریال از آرش با کت سرمه‌ای در میان حجم‌های بزرگ و انتزاعی کاغذی و چوبی در استودیویی با رنگ‌های سرد.',
      ar: 'بورتريه تحريري كامل القامة لآرش بسترة كحلية بين أشكال مجردة كبيرة من الورق والخشب في استوديو بارد الألوان.',
      es: 'Retrato editorial de cuerpo entero de Arash con americana azul marino entre grandes formas abstractas de papel y madera en un estudio de tonos fríos.',
      de: 'Ganzfiguriges Editorial-Porträt von Arash in marineblauem Sakko zwischen großen abstrakten Formen aus Papier und Holz in einem kühlen Studio.',
      fr: 'Portrait éditorial en pied d’Arash en veste bleu marine parmi de grandes formes abstraites de papier et de bois, dans un studio aux tons froids.',
      ja: '寒色のスタジオで、紙と木の大きな抽象的な造形の間に立つ紺のジャケット姿のアラシュの全身エディトリアル・ポートレート。',
    },
  },
  {
    file: 'studies/10-geometric-profile.jpg',
    alt: {
      en: 'Geometric paper-collage profile of Arash in clear glasses, a lavender-gray blazer, and a black shirt, with cobalt and amber shapes.',
      fa: 'نیم‌رخ کلاژ کاغذی و هندسی از آرش با عینک شفاف، کت خاکستری متمایل به یاسی و پیراهن مشکی، همراه با شکل‌های آبی کبالت و کهربایی.',
      ar: 'بورتريه جانبي بكولاج ورقي هندسي لآرش بنظارة شفافة وسترة رمادية مائلة إلى الخزامى وقميص أسود، مع أشكال كوبالتية وكهرمانية.',
      es: 'Perfil en collage geométrico de papel de Arash con gafas transparentes, americana gris lavanda y camisa negra, con formas cobalto y ámbar.',
      de: 'Geometrisches Papiercollage-Profil von Arash mit klarer Brille, lavendelgrauem Sakko und schwarzem Hemd, mit Formen in Kobalt und Bernstein.',
      fr: 'Profil en collage de papier géométrique d’Arash, lunettes transparentes, veste gris lavande et chemise noire, avec des formes cobalt et ambre.',
      ja: 'クリアレンズの眼鏡、ラベンダーグレーのジャケット、黒シャツ姿のアラシュの横顔を、コバルトと琥珀色の図形で構成した幾何学的な紙コラージュ。',
    },
  },
  {
    file: 'studies/11-mountain-collage.jpg',
    alt: {
      en: 'Collaged three-quarter portrait of Arash in a dark woven hat and pale sage shirt, joined with abstract mountain and road panels.',
      fa: 'پرتره سه‌رخ کلاژشده از آرش با کلاه حصیری تیره و پیراهن سبز مریم‌گلی روشن، در کنار پنل‌های انتزاعی کوه و جاده.',
      ar: 'بورتريه بزاوية ثلاثة أرباع بأسلوب الكولاج لآرش بقبعة منسوجة داكنة وقميص بلون المريمية الفاتح، مع ألواح مجردة لجبل وطريق.',
      es: 'Retrato en tres cuartos en collage de Arash con sombrero tejido oscuro y camisa verde salvia claro, junto a paneles abstractos de montaña y carretera.',
      de: 'Dreiviertelporträt als Collage von Arash mit dunklem Flechthut und hellem salbeigrünem Hemd, verbunden mit abstrakten Berg- und Straßenfeldern.',
      fr: 'Portrait de trois quarts en collage d’Arash, chapeau tressé sombre et chemise vert sauge pâle, avec des panneaux abstraits de montagne et de route.',
      ja: '濃色の編み帽子と淡いセージグリーンのシャツのアラシュの斜めからの肖像に、抽象的な山と道のパネルを組み合わせたコラージュ。',
    },
  },
  {
    file: 'studies/12-highland.jpg',
    alt: {
      en: 'Illustrated low-angle portrait of Arash in an ochre cap, dark sunglasses, and an olive field jacket against an abstract highland landscape.',
      fa: 'پرتره تصویرسازی‌شده از زاویه پایین از آرش با کلاه اخرایی، عینک آفتابی تیره و کت صحرایی زیتونی در برابر منظره‌ای انتزاعی از ارتفاعات.',
      ar: 'بورتريه مرسوم من زاوية منخفضة لآرش بقبعة بلون المغرة ونظارة شمسية داكنة وسترة ميدانية زيتونية أمام منظر مرتفعات مجرد.',
      es: 'Retrato ilustrado en contrapicado de Arash con gorra ocre, gafas de sol oscuras y chaqueta de campo verde oliva ante un paisaje abstracto de tierras altas.',
      de: 'Illustriertes Porträt aus der Untersicht von Arash mit ockerfarbener Kappe, dunkler Sonnenbrille und olivgrüner Feldjacke vor einer abstrakten Hochlandlandschaft.',
      fr: 'Portrait illustré en contre-plongée d’Arash en casquette ocre, lunettes de soleil foncées et veste de terrain olive devant un paysage abstrait de hautes terres.',
      ja: '抽象的な高原を背に、黄土色のキャップ、濃色のサングラス、オリーブのフィールドジャケット姿のアラシュを見上げて描いたイラスト・ポートレート。',
    },
  },
  {
    file: 'studies/13-hard-light.jpg',
    alt: {
      en: 'Hard-light editorial portrait of Arash in a navy blazer and white shirt beside a bright rectangular window shadow.',
      fa: 'پرتره ادیتوریال آرش با کت سرمه‌ای و پیراهن سفید در نور سخت و سایه مستطیلی پنجره.',
      ar: 'بورتريه تحريري بضوء حاد لآرش بسترة كحلية وقميص أبيض بجانب ظل نافذة مستطيل ساطع.',
      es: 'Retrato editorial con luz dura de Arash con americana azul marino y camisa blanca junto a la sombra rectangular y brillante de una ventana.',
      de: 'Editorial-Porträt im harten Licht von Arash in marineblauem Sakko und weißem Hemd neben dem hellen rechteckigen Schatten eines Fensters.',
      fr: 'Portrait éditorial en lumière dure d’Arash en veste bleu marine et chemise blanche, près de l’ombre rectangulaire et lumineuse d’une fenêtre.',
      ja: '硬い光の中、明るい長方形の窓の影のそばに立つ、紺のジャケットと白シャツ姿のアラシュのエディトリアル・ポートレート。',
    },
  },
  {
    file: 'studies/14-writing-desk.jpg',
    alt: {
      en: 'Arash in glasses and a woven hat seated at a dark desk, with a completely blank sheet of paper and a small amber wall light.',
      fa: 'آرش با عینک و کلاه حصیری پشت میزی تیره، با برگه‌ای کاملاً سفید و چراغ دیواری کهربایی کوچک.',
      ar: 'آرش بنظارة وقبعة منسوجة جالسًا إلى مكتب داكن، أمامه ورقة بيضاء تمامًا ومصباح جداري كهرماني صغير.',
      es: 'Arash con gafas y sombrero tejido sentado ante un escritorio oscuro, con una hoja completamente en blanco y una pequeña lámpara de pared ámbar.',
      de: 'Arash mit Brille und Flechthut an einem dunklen Schreibtisch, vor sich ein völlig leeres Blatt, dazu eine kleine bernsteinfarbene Wandleuchte.',
      fr: 'Arash, lunettes et chapeau tressé, assis à un bureau sombre, devant une feuille entièrement vierge et une petite applique ambrée.',
      ja: '暗い机に向かう眼鏡と編み帽子のアラシュ。まったくの白紙と、小さな琥珀色の壁灯。',
    },
  },
  {
    file: 'studies/15-reading-triptych.jpg',
    alt: {
      en: 'Three-panel reading study of Arash in glasses and a woven hat, holding one open book with blank pages.',
      fa: 'مطالعه خواندن سه‌قابی از آرش با عینک و کلاه حصیری، در حالی که کتابی باز با صفحه‌های سفید در دست دارد.',
      ar: 'دراسة قراءة من ثلاث لوحات لآرش بنظارة وقبعة منسوجة، يمسك كتابًا مفتوحًا صفحاته بيضاء.',
      es: 'Estudio de lectura en tres paneles de Arash con gafas y sombrero tejido, sosteniendo un libro abierto de páginas en blanco.',
      de: 'Dreiteilige Lesestudie von Arash mit Brille und Flechthut, in der Hand ein offenes Buch mit leeren Seiten.',
      fr: 'Étude de lecture en trois panneaux d’Arash, lunettes et chapeau tressé, tenant un livre ouvert aux pages vierges.',
      ja: '眼鏡と編み帽子のアラシュが白紙のページの本を開いて持つ、3枚構成の読書のスタディ。',
    },
  },
  {
    file: 'studies/16-reading-tableau.jpg',
    alt: {
      en: 'Illustrated reading tableau of Arash in a dark woven hat and pale sage shirt, with a blank book and square amber lamp.',
      fa: 'تابلوی تصویرسازی‌شده از آرش با کلاه حصیری تیره و پیراهن سبز مریم‌گلی روشن، همراه با کتابی سفید و چراغی چهارگوش و کهربایی.',
      ar: 'لوحة قراءة مرسومة لآرش بقبعة منسوجة داكنة وقميص بلون المريمية الفاتح، مع كتاب أبيض ومصباح مربع كهرماني.',
      es: 'Escena de lectura ilustrada de Arash con sombrero tejido oscuro y camisa verde salvia claro, con un libro en blanco y una lámpara cuadrada ámbar.',
      de: 'Illustriertes Lesetableau von Arash mit dunklem Flechthut und hellem salbeigrünem Hemd, mit leerem Buch und quadratischer Bernsteinlampe.',
      fr: 'Tableau de lecture illustré d’Arash, chapeau tressé sombre et chemise vert sauge pâle, avec un livre vierge et une lampe carrée ambrée.',
      ja: '濃色の編み帽子と淡いセージグリーンのシャツのアラシュを描いた読書の情景。白紙の本と四角い琥珀色のランプ。',
    },
  },
  {
    file: 'studies/17-music-camera-still-life.jpg',
    alt: {
      en: 'Overhead still life of a camera, blank notebook, dark glasses, woven hat, unmarked records, and abstract photographic prints on a blue textile field.',
      fa: 'چیدمان از بالا از دوربین، دفترچه سفید، عینک تیره، کلاه حصیری، صفحه‌های موسیقی بی‌نشان و چاپ‌های عکاسی انتزاعی روی زمینه‌ای پارچه‌ای و آبی.',
      ar: 'طبيعة صامتة من الأعلى لكاميرا ودفتر فارغ ونظارة داكنة وقبعة منسوجة وأسطوانات بلا علامات وصور فوتوغرافية مجردة على قماش أزرق.',
      es: 'Bodegón cenital de una cámara, un cuaderno en blanco, gafas oscuras, un sombrero tejido, discos sin marcas y copias fotográficas abstractas sobre una tela azul.',
      de: 'Stillleben von oben mit Kamera, leerem Notizbuch, dunkler Brille, Flechthut, unbeschrifteten Schallplatten und abstrakten Fotoabzügen auf blauem Stoff.',
      fr: 'Nature morte vue du dessus : appareil photo, carnet vierge, lunettes foncées, chapeau tressé, disques sans marque et tirages photographiques abstraits sur un tissu bleu.',
      ja: '青い布の上に、カメラ、白紙のノート、濃色の眼鏡、編み帽子、無地のレコード、抽象的な写真プリントを並べた俯瞰の静物。',
    },
  },
  {
    file: 'studies/19-studio-artist.jpg',
    alt: {
      en: 'Arash in glasses and a woven hat seated in a cool studio beside an easel with an abstract blue-and-ink panel and blank pinned sheets.',
      fa: 'آرش با عینک و کلاه حصیری در استودیویی با رنگ‌های سرد، کنار سه‌پایه‌ای با پنل انتزاعی آبی و مشکی و برگه‌های نصب‌شده سفید.',
      ar: 'آرش بنظارة وقبعة منسوجة جالسًا في استوديو بارد الألوان بجانب حامل رسم عليه لوحة مجردة بالأزرق والحبر وأوراق بيضاء مثبتة.',
      es: 'Arash con gafas y sombrero tejido sentado en un estudio de tonos fríos junto a un caballete con un panel abstracto azul y tinta y hojas en blanco clavadas.',
      de: 'Arash mit Brille und Flechthut in einem kühlen Atelier neben einer Staffelei mit abstrakter Tafel in Blau und Tusche und angehefteten leeren Blättern.',
      fr: 'Arash, lunettes et chapeau tressé, assis dans un atelier aux tons froids près d’un chevalet portant un panneau abstrait bleu et encre et des feuilles vierges épinglées.',
      ja: '寒色のアトリエで、青と墨の抽象パネルを載せたイーゼルと、白紙のピン留めされた紙のそばに座る眼鏡と編み帽子のアラシュ。',
    },
  },
]

/**
 * The imagery in place: sections of the live home page (arashrezvani.me, captured 2026-09-26 into
 * `assets/live-2026-09-26/`, Sina's call). Only sections that carry type and the generated images:
 * the books shelf (his covers) and the songs row (his video stills) are never captured, and the
 * eyebrow with his family name is hidden in the page before capture.
 */
export const ARR_LIVE_DIR = 'live-2026-09-26'

export const ARR_LIVE_DESKTOP_HERO: ImageSpec[] = [
  {
    file: 'desktop/home-en-hero.jpg',
    alt: {
      en: 'The English home page’s first screen: the headline “Life in its different forms” beside the three-window masthead portrait.',
      fa: 'نخستین صفحه‌ی خانه‌ی انگلیسی: تیتر «زندگی در شکل‌های مختلفش» کنار پرتره‌ی سه‌پنجره‌ای سرصفحه.',
      ar: 'الشاشة الأولى للصفحة الرئيسية بالإنجليزية: العنوان «الحياة في أشكالها المختلفة» بجانب بورتريه الترويسة ذي النوافذ الثلاث.',
      es: 'Primera pantalla de la portada en inglés: el titular «La vida en sus distintas formas» junto al retrato de cabecera en tres ventanas.',
      de: 'Erster Bildschirm der englischen Startseite: die Schlagzeile „Das Leben in seinen verschiedenen Formen“ neben dem Drei-Fenster-Porträt im Kopfbereich.',
      fr: 'Premier écran de l’accueil en anglais : le titre « La vie sous ses différentes formes » à côté du portrait de tête en trois fenêtres.',
      ja: '英語版トップページの最初の画面。見出し「さまざまなかたちの人生」と、三つの窓のマストヘッド・ポートレート。',
    },
  },
  {
    file: 'desktop/home-fa-hero.jpg',
    alt: {
      en: 'The Persian home page’s first screen, mirrored right to left: the headline beside the three-window masthead portrait.',
      fa: 'نخستین صفحه‌ی خانه‌ی فارسی، قرینه از راست به چپ: تیتر کنار پرتره‌ی سه‌پنجره‌ای سرصفحه.',
      ar: 'الشاشة الأولى للصفحة الرئيسية بالفارسية، معكوسة من اليمين إلى اليسار: العنوان بجانب بورتريه الترويسة ذي النوافذ الثلاث.',
      es: 'Primera pantalla de la portada en persa, reflejada de derecha a izquierda: el titular junto al retrato de cabecera en tres ventanas.',
      de: 'Erster Bildschirm der persischen Startseite, von rechts nach links gespiegelt: die Schlagzeile neben dem Drei-Fenster-Porträt.',
      fr: 'Premier écran de l’accueil en persan, en miroir de droite à gauche : le titre à côté du portrait de tête en trois fenêtres.',
      ja: '右から左へ反転したペルシャ語版トップページの最初の画面。見出しと三つの窓のマストヘッド・ポートレート。',
    },
  },
]

export const ARR_LIVE_WAYS: ImageSpec = {
  file: 'desktop/home-en-ways.jpg',
  alt: {
    en: 'The home page’s “Six ways” section: six numbered practices, each under one of the generated section images.',
    fa: 'بخش «شش راه» در صفحه‌ی خانه: شش حوزه‌ی شماره‌دار، هرکدام زیر یکی از تصویرهای تولیدشده‌ی بخش.',
    ar: 'قسم «ست طرق» في الصفحة الرئيسية: ست ممارسات مرقّمة، كلٌّ منها تحت إحدى صور الأقسام المولّدة.',
    es: 'La sección «Seis caminos» de la portada: seis prácticas numeradas, cada una bajo una de las imágenes generadas.',
    de: 'Der Abschnitt „Sechs Wege“ der Startseite: sechs nummerierte Tätigkeiten, jede unter einem der generierten Abschnittsbilder.',
    fr: 'La section « Six voies » de l’accueil : six pratiques numérotées, chacune sous l’une des images générées.',
    ja: 'トップページの「六つの道」セクション。番号付きの六つの活動が、それぞれ生成したセクション画像の下に並ぶ。',
  },
}

export const ARR_LIVE_PHONE: ImageSpec[] = [
  {
    file: 'mobile/home-fa-1-hero.jpg',
    alt: {
      en: 'The Persian home page on a phone: the headline and the opening line.',
      fa: 'صفحه‌ی خانه‌ی فارسی روی گوشی: تیتر و جمله‌ی آغازین.',
      ar: 'الصفحة الرئيسية بالفارسية على الهاتف: العنوان والسطر الافتتاحي.',
      es: 'La portada en persa en un teléfono: el titular y la frase de apertura.',
      de: 'Die persische Startseite auf dem Telefon: die Schlagzeile und der erste Satz.',
      fr: 'L’accueil en persan sur un téléphone : le titre et la phrase d’ouverture.',
      ja: 'スマートフォンで見たペルシャ語版トップページ。見出しと冒頭の一文。',
    },
  },
  {
    file: 'mobile/home-fa-2-masthead.jpg',
    alt: {
      en: 'The Persian home page on a phone, scrolled to the three-window masthead portrait.',
      fa: 'صفحه‌ی خانه‌ی فارسی روی گوشی، در جایی که پرتره‌ی سه‌پنجره‌ای سرصفحه دیده می‌شود.',
      ar: 'الصفحة الرئيسية بالفارسية على الهاتف، عند بورتريه الترويسة ذي النوافذ الثلاث.',
      es: 'La portada en persa en un teléfono, desplazada hasta el retrato de cabecera en tres ventanas.',
      de: 'Die persische Startseite auf dem Telefon, gescrollt bis zum Drei-Fenster-Porträt.',
      fr: 'L’accueil en persan sur un téléphone, défilé jusqu’au portrait de tête en trois fenêtres.',
      ja: 'スマートフォンのペルシャ語版トップページ。三つの窓のマストヘッド・ポートレートまでスクロールした状態。',
    },
  },
  {
    file: 'mobile/home-fa-3-ways.jpg',
    alt: {
      en: 'The Persian “Six ways” section on a phone, its image cards two to a row.',
      fa: 'بخش «شش راه» روی گوشی، با کارت‌های تصویری دوتایی در هر ردیف.',
      ar: 'قسم «ست طرق» بالفارسية على الهاتف، وبطاقاته المصوّرة اثنتان في كل صف.',
      es: 'La sección «Seis caminos» en persa en un teléfono, con las tarjetas de imagen de dos en dos.',
      de: 'Der persische Abschnitt „Sechs Wege“ auf dem Telefon, die Bildkarten zu zweit pro Reihe.',
      fr: 'La section « Six voies » en persan sur un téléphone, ses cartes illustrées deux par rangée.',
      ja: 'スマートフォンで見たペルシャ語版「六つの道」。画像カードが1列に2枚ずつ並ぶ。',
    },
  },
  {
    file: 'mobile/home-fa-4-notes.png',
    alt: {
      en: 'The Persian notes section on a phone: numbered, type-only cards, one to a row.',
      fa: 'بخش یادداشت‌ها روی گوشی: کارت‌های شماره‌دار و تنها با حروف، یکی در هر ردیف.',
      ar: 'قسم الملاحظات بالفارسية على الهاتف: بطاقات مرقّمة من النص وحده، واحدة في كل صف.',
      es: 'La sección de notas en persa en un teléfono: tarjetas numeradas, solo tipografía, una por fila.',
      de: 'Der persische Notizenbereich auf dem Telefon: nummerierte Karten nur aus Schrift, eine pro Reihe.',
      fr: 'La section des notes en persan sur un téléphone : des cartes numérotées, en typographie seule, une par rangée.',
      ja: 'スマートフォンで見たペルシャ語版ノート欄。文字だけの番号付きカードが1列に1枚ずつ。',
    },
  },
]

export const ARR_LIVE_LOWER: ImageSpec[] = [
  {
    file: 'desktop/home-en-map.png',
    alt: {
      en: 'The home page’s “Four decades, one country” section: a short text and a link beside a line map of Iran.',
      fa: 'بخش «چهار دهه، یک سرزمین» در صفحه‌ی خانه: متنی کوتاه و یک پیوند کنار نقشه‌ی خطی ایران.',
      ar: 'قسم «أربعة عقود، بلد واحد» في الصفحة الرئيسية: نص قصير ورابط بجانب خريطة خطية لإيران.',
      es: 'La sección «Cuatro décadas, un país» de la portada: un texto breve y un enlace junto a un mapa lineal de Irán.',
      de: 'Der Abschnitt „Vier Jahrzehnte, ein Land“ der Startseite: ein kurzer Text und ein Link neben einer Linienkarte des Iran.',
      fr: 'La section « Quatre décennies, un pays » de l’accueil : un court texte et un lien à côté d’une carte au trait de l’Iran.',
      ja: 'トップページの「四十年、ひとつの国」セクション。短い文とリンク、線画のイラン地図。',
    },
  },
  {
    file: 'desktop/home-en-notes.png',
    alt: {
      en: 'The home page’s notes section: six numbered, type-only cards, each with a date, a topic tag and a title.',
      fa: 'بخش یادداشت‌ها در صفحه‌ی خانه: شش کارت شماره‌دار و تنها با حروف، هرکدام با تاریخ، برچسب موضوع و عنوان.',
      ar: 'قسم الملاحظات في الصفحة الرئيسية: ست بطاقات مرقّمة من النص وحده، لكلٍّ منها تاريخ ووسم موضوع وعنوان.',
      es: 'La sección de notas de la portada: seis tarjetas numeradas, solo tipografía, cada una con fecha, etiqueta de tema y título.',
      de: 'Der Notizenbereich der Startseite: sechs nummerierte Karten nur aus Schrift, jede mit Datum, Themen-Tag und Titel.',
      fr: 'La section des notes de l’accueil : six cartes numérotées, en typographie seule, chacune avec une date, une étiquette de thème et un titre.',
      ja: 'トップページのノート欄。文字だけの番号付きカード6枚に、日付、テーマのタグ、タイトル。',
    },
  },
]
