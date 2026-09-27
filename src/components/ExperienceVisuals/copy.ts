import type { Locale } from '@/utilities/locale'
import type { SkillGroupKey } from '@/blocks/CapabilityIcons/keys'

export const DISCIPLINE_KEYS = [
  'business',
  'product',
  'design',
  'technology',
  'operations',
  'ai',
] as const
export type DisciplineKey = (typeof DISCIPLINE_KEYS)[number]
export const isDisciplineKey = (value: unknown): value is DisciplineKey =>
  typeof value === 'string' && (DISCIPLINE_KEYS as readonly string[]).includes(value)

type VisualCopy = {
  groups: Record<SkillGroupKey, string>
  disciplines: Record<DisciplineKey, string>
  pause: string
  resume: string
  reduced: string
}

export const experienceVisualCopy: Record<Locale, VisualCopy> = {
  en: {
    groups: {
      core: 'Clarify the problem. Choose a direction.',
      systems: 'Turn decisions into operating rules.',
      execution: 'Build, align and measure.',
      specialized: 'Adapt the solution to its context.',
    },
    disciplines: {
      business: 'Constraints & value',
      product: 'Scope & priorities',
      design: 'Flows & interactions',
      technology: 'Data & infrastructure',
      operations: 'Processes & ownership',
      ai: 'Context & assisted execution',
    },
    pause: 'Pause illustrations',
    resume: 'Resume illustrations',
    reduced: 'Reduced motion is on',
  },
  fa: {
    groups: {
      core: 'روشن‌کردن مسئله و انتخاب مسیر',
      systems: 'تبدیل تصمیم به قواعد اجرا',
      execution: 'ساختن، هماهنگ‌کردن و سنجیدن',
      specialized: 'تطبیق راه‌حل با زمینه',
    },
    disciplines: {
      business: 'محدودیت‌ها و ارزش',
      product: 'دامنه و اولویت‌ها',
      design: 'جریان‌ها و تعامل‌ها',
      technology: 'داده و زیرساخت',
      operations: 'فرایندها و مسئولیت‌ها',
      ai: 'زمینه و کمک به اجرا',
    },
    pause: 'توقف حرکت تصویرها',
    resume: 'ادامه‌ی حرکت تصویرها',
    reduced: 'کاهش حرکت فعال است',
  },
  ar: {
    groups: {
      core: 'توضيح المشكلة واختيار المسار',
      systems: 'تحويل القرارات إلى قواعد تشغيل',
      execution: 'البناء والتنسيق والقياس',
      specialized: 'تكييف الحل مع سياقه',
    },
    disciplines: {
      business: 'القيود والقيمة',
      product: 'النطاق والأولويات',
      design: 'المسارات والتفاعلات',
      technology: 'البيانات والبنية التحتية',
      operations: 'العمليات والمسؤوليات',
      ai: 'السياق والمساعدة في التنفيذ',
    },
    pause: 'إيقاف حركة الرسوم',
    resume: 'استئناف حركة الرسوم',
    reduced: 'تقليل الحركة مفعّل',
  },
  es: {
    groups: {
      core: 'Aclarar el problema y elegir el rumbo.',
      systems: 'Convertir decisiones en reglas operativas.',
      execution: 'Construir, coordinar y medir.',
      specialized: 'Adaptar la solución a su contexto.',
    },
    disciplines: {
      business: 'Restricciones y valor',
      product: 'Alcance y prioridades',
      design: 'Flujos e interacciones',
      technology: 'Datos e infraestructura',
      operations: 'Procesos y responsables',
      ai: 'Contexto y ejecución asistida',
    },
    pause: 'Pausar ilustraciones',
    resume: 'Reanudar ilustraciones',
    reduced: 'Movimiento reducido activado',
  },
  de: {
    groups: {
      core: 'Das Problem klären. Die Richtung wählen.',
      systems: 'Entscheidungen in Betriebsregeln übersetzen.',
      execution: 'Bauen, abstimmen und messen.',
      specialized: 'Die Lösung an den Kontext anpassen.',
    },
    disciplines: {
      business: 'Rahmen und Wert',
      product: 'Umfang und Prioritäten',
      design: 'Abläufe und Interaktionen',
      technology: 'Daten und Infrastruktur',
      operations: 'Prozesse und Verantwortung',
      ai: 'Kontext und unterstützte Umsetzung',
    },
    pause: 'Illustrationen pausieren',
    resume: 'Illustrationen fortsetzen',
    reduced: 'Reduzierte Bewegung aktiv',
  },
  fr: {
    groups: {
      core: 'Clarifier le problème, choisir une direction.',
      systems: 'Traduire les décisions en règles opérationnelles.',
      execution: 'Construire, aligner et mesurer.',
      specialized: 'Adapter la solution à son contexte.',
    },
    disciplines: {
      business: 'Contraintes et valeur',
      product: 'Périmètre et priorités',
      design: 'Parcours et interactions',
      technology: 'Données et infrastructure',
      operations: 'Processus et responsabilités',
      ai: 'Contexte et exécution assistée',
    },
    pause: 'Mettre les illustrations en pause',
    resume: 'Reprendre les illustrations',
    reduced: 'Mouvement réduit activé',
  },
  ja: {
    groups: {
      core: '課題を明確にし、方向を選ぶ。',
      systems: '意思決定を運用ルールに変える。',
      execution: '構築し、連携し、測定する。',
      specialized: '状況に合った解決策をつくる。',
    },
    disciplines: {
      business: '制約と価値',
      product: '範囲と優先順位',
      design: 'フローと操作',
      technology: 'データと基盤',
      operations: 'プロセスと責任',
      ai: '文脈と実行支援',
    },
    pause: 'イラストを一時停止',
    resume: 'イラストを再開',
    reduced: '動きを減らす設定が有効です',
  },
}

export const capabilityNumber = (value: number, locale: Locale) =>
  new Intl.NumberFormat(locale, { useGrouping: false }).format(value)
