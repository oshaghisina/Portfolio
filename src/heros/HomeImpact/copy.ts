import type { Locale } from '@/utilities/locale'

type ThoughtCopy = {
  stages: readonly [string, string, string]
  description: string
}

export const thoughtCopy: Record<Locale, ThoughtCopy> = {
  en: {
    stages: ['Understand', 'Build', 'Learn'],
    description:
      'One continuous line, inspired by Sina’s handwritten S: research informs a choice, that choice becomes a working product, and evidence from use returns to the next decision.',
  },
  fa: {
    stages: ['فهمیدن', 'ساختن', 'یادگرفتن'],
    description:
      'یک خط پیوسته، با الهام از S امضای سینا: پژوهش به انتخاب مسیر می‌رسد، این انتخاب به محصول تبدیل می‌شود و شواهد استفاده، تصمیم بعدی را شکل می‌دهند.',
  },
  ar: {
    stages: ['الفهم', 'البناء', 'التعلّم'],
    description:
      'خط متصل مستوحى من حرف S في توقيع سينا: البحث يوجّه الاختيار، والاختيار يتحوّل إلى منتج يعمل، وأدلة الاستخدام تعود لتوجّه القرار التالي.',
  },
  es: {
    stages: ['Comprender', 'Construir', 'Aprender'],
    description:
      'Una línea continua inspirada en la S de la firma de Sina: la investigación orienta una decisión, esta se convierte en un producto y la evidencia de uso guía la siguiente decisión.',
  },
  de: {
    stages: ['Verstehen', 'Umsetzen', 'Lernen'],
    description:
      'Eine durchgehende Linie, inspiriert vom S in Sinas Unterschrift: Erkenntnisse führen zu einer Entscheidung, daraus entsteht ein Produkt, und Nutzungserkenntnisse fließen in die nächste Entscheidung ein.',
  },
  fr: {
    stages: ['Comprendre', 'Construire', 'Apprendre'],
    description:
      'Une ligne continue inspirée du S de la signature de Sina : la recherche éclaire un choix, ce choix devient un produit et les observations d’usage nourrissent la décision suivante.',
  },
  ja: {
    stages: ['理解する', 'つくる', '学ぶ'],
    description:
      'SinaのサインのSをモチーフにした一本の線。調査が判断を導き、判断がプロダクトになり、利用から得た知見が次の判断につながります。',
  },
}
