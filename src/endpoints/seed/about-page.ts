import type { Experience, Media } from '@/payload-types'
import type { RequiredDataFromCollectionSlug } from 'payload'

import {
  aboutHeroRichTextEn,
  aboutMetaDescriptionEn,
  aboutMetaTitleEn,
  biographyBodyEn,
  biographyBodyFa,
  biographyHeadingEn,
  biographyHeadingFa,
  careerNarrativesEn,
  careerNarrativesFa,
  careerStageOrder,
  contactRichTextEn,
  contactRichTextFa,
  nowStatementEn,
  nowStatementFa,
  personalSideItemsEn,
  personalSideItemsFa,
  principlesEn,
  principlesFa,
  relatedProjectByOrder,
  relatedProjectByOrderFa,
  teamProcessNodesEn,
  teamProcessNodesFa,
  teamProcessStatementsEn,
  teamProcessStatementsFa,
  thinkingMapNodesEn,
  thinkingMapNodesFa,
  type PageLayout,
} from './about-page-content'
import { paragraph, richText } from './lexical-helpers'

type AboutArgs = {
  experienceDocs: Record<number, Experience>
  metaImage: Media
}

/** Thin factory mirroring `home.ts` — assembles the About page from experience doc ids. English pass; the Persian overlay is applied after creation (see `localizeAboutLayoutFa`). */
export const about: (args: AboutArgs) => RequiredDataFromCollectionSlug<'pages'> = ({ experienceDocs, metaImage }) => {
  return {
    slug: 'about',
    _status: 'published',
    hero: {
      type: 'lowImpact',
      richText: aboutHeroRichTextEn,
    },
    layout: buildAboutLayoutEn(experienceDocs),
    meta: {
      description: aboutMetaDescriptionEn,
      image: metaImage.id,
      title: aboutMetaTitleEn,
    },
    title: 'About',
  }
}

export const buildAboutLayoutEn = (experienceDocs: Record<number, Experience>): PageLayout => [
  {
    blockName: 'Biography',
    blockType: 'content',
    layout: 'editorial',
    columns: [
      { richText: richText(biographyHeadingEn), enableLink: false },
      { richText: richText(...biographyBodyEn), enableLink: false },
    ],
  },
  {
    blockName: 'Career Journey',
    blockType: 'careerJourney',
    sectionHeader: {
      tag: 'Journey',
      lead: 'How I',
      tail: 'got here',
      lede: 'Five stages that changed what I was responsible for, not just what I built.',
    },
    stages: careerStageOrder.map((order) => ({
      experience: experienceDocs[order]!.id,
      narrative: richText(paragraph(careerNarrativesEn[order]!)),
      relatedProjectLabel: relatedProjectByOrder[order] ?? null,
    })),
  },
  {
    blockName: 'How I Think',
    blockType: 'thinkingMap',
    sectionHeader: {
      tag: 'How I think',
      lead: 'Mapping the',
      tail: 'system, not the screen',
      lede: 'A rough map of how a problem moves from constraint to decision to outcome.',
    },
    nodes: thinkingMapNodesEn,
  },
  {
    blockName: 'Principles',
    blockType: 'principles',
    sectionHeader: {
      tag: 'Principles',
      lead: 'What actually',
      tail: 'guides the decisions',
      lede: 'Specific enough to be useful to whoever works with me next.',
    },
    items: principlesEn,
  },
  {
    blockName: 'Working With Teams',
    blockType: 'teamProcess',
    sectionHeader: {
      tag: 'Working with teams',
      lead: 'How decisions',
      tail: 'actually move',
      lede: 'A process, not a claim to be collaborative.',
    },
    nodes: teamProcessNodesEn,
    statements: teamProcessStatementsEn,
  },
  {
    blockName: 'Outside Work',
    blockType: 'personalSide',
    sectionHeader: {
      tag: 'Outside work',
      lead: 'What else',
      tail: 'shapes the work',
    },
    items: personalSideItemsEn.map((item) => ({ ...item, media: null })),
  },
  {
    blockName: 'Now',
    blockType: 'nowSection',
    sectionHeader: {
      tag: 'Now',
      lead: "What I'm",
      tail: 'exploring',
    },
    statement: nowStatementEn,
    // `link` intentionally left unset — no /lab route exists yet.
  },
  {
    blockName: 'Contact',
    blockType: 'cta',
    richText: contactRichTextEn,
    links: [
      {
        link: {
          type: 'custom',
          appearance: 'default',
          label: 'Email Sina',
          url: 'mailto:sinaoshaghi@gmail.com',
        },
      },
      {
        link: {
          type: 'custom',
          appearance: 'outline',
          label: 'LinkedIn',
          newTab: true,
          url: 'https://ir.linkedin.com/in/sinaoshaghi',
        },
      },
    ],
  },
]

/**
 * Overlays Persian text onto the EN layout Payload just returned (which now carries generated
 * `id`s for every block and nested array row). Spreading `...block`/`...item` preserves those
 * ids, relationships and non-localized fields exactly — only known localized leaf fields are
 * replaced, index-matched to the EN arrays above (same order, same row counts).
 */
export const localizeAboutLayoutFa = (enLayout: NonNullable<PageLayout>): PageLayout =>
  (enLayout as unknown as Array<Record<string, unknown>>).map((block) => {
    const sectionHeader = block.sectionHeader as Record<string, unknown> | undefined
    switch (block.blockType) {
      case 'content':
        return {
          ...block,
          columns: [
            { ...(block.columns as Record<string, unknown>[])[0], richText: richText(biographyHeadingFa) },
            { ...(block.columns as Record<string, unknown>[])[1], richText: richText(...biographyBodyFa) },
          ],
        }
      case 'careerJourney':
        return {
          ...block,
          sectionHeader: {
            ...sectionHeader,
            tag: 'مسیر',
            lead: 'چطور',
            tail: 'به اینجا رسیدم',
            lede: 'پنج مرحله که مسئولیتم را تغییر داد، نه فقط چیزی که ساختم.',
          },
          stages: (block.stages as Record<string, unknown>[]).map((stage, i) => {
            const order = careerStageOrder[i]!
            return {
              ...stage,
              narrative: richText(paragraph(careerNarrativesFa[order]!)),
              relatedProjectLabel: relatedProjectByOrderFa[order] ?? null,
            }
          }),
        }
      case 'thinkingMap':
        return {
          ...block,
          sectionHeader: {
            ...sectionHeader,
            tag: 'چطور فکر می‌کنم',
            lead: 'نقشه‌برداری',
            tail: 'سیستم، نه صفحه',
            lede: 'نقشه‌ای تقریبی از اینکه یک مسئله چطور از محدودیت به تصمیم و نتیجه می‌رسد.',
          },
          nodes: (block.nodes as Record<string, unknown>[]).map((node, i) => ({ ...node, ...thinkingMapNodesFa[i] })),
        }
      case 'principles':
        return {
          ...block,
          sectionHeader: {
            ...sectionHeader,
            tag: 'اصول',
            lead: 'چه‌چیزی واقعاً',
            tail: 'تصمیم‌ها را هدایت می‌کند',
            lede: 'آن‌قدر مشخص که برای هر کسی که بعداً با من کار می‌کند، مفید باشد.',
          },
          items: (block.items as Record<string, unknown>[]).map((item, i) => ({ ...item, ...principlesFa[i] })),
        }
      case 'teamProcess':
        return {
          ...block,
          sectionHeader: {
            ...sectionHeader,
            tag: 'کار با تیم‌ها',
            lead: 'چطور تصمیم‌ها',
            tail: 'واقعاً پیش می‌روند',
            lede: 'یک فرایند، نه ادعای همکاری‌کردن.',
          },
          nodes: (block.nodes as Record<string, unknown>[]).map((node, i) => ({ ...node, ...teamProcessNodesFa[i] })),
          statements: (block.statements as Record<string, unknown>[]).map((s, i) => ({ ...s, ...teamProcessStatementsFa[i] })),
        }
      case 'personalSide':
        return {
          ...block,
          sectionHeader: {
            ...sectionHeader,
            tag: 'بیرون از کار',
            lead: 'چه‌چیزهای دیگری',
            tail: 'روی کار اثر می‌گذارند',
          },
          items: (block.items as Record<string, unknown>[]).map((item, i) => ({ ...item, ...personalSideItemsFa[i] })),
        }
      case 'nowSection':
        return {
          ...block,
          sectionHeader: {
            ...sectionHeader,
            tag: 'اکنون',
            lead: 'الان روی',
            tail: 'چه چیزی کار می‌کنم',
          },
          statement: nowStatementFa,
        }
      case 'cta':
        return { ...block, richText: contactRichTextFa }
      default:
        return block
    }
  }) as unknown as PageLayout
