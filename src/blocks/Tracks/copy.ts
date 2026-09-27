import type { Locale } from '@/utilities/locale'
import type { TrackKey } from './Illustrations'

/** Noun in the active-track eyebrow (`01 / Track`). Kept out of CMS — same role as stage labels. */
export const trackNoun: Record<Locale, string> = {
  en: 'Track',
  fa: 'مسیر',
  ar: 'مسار',
  es: 'Línea',
  de: 'Schwerpunkt',
  fr: 'Axe',
  ja: 'トラック',
}

type TrackCopy = Record<TrackKey, readonly [string, string, string]>
export const trackStageCopy: Record<Locale, TrackCopy> = {
  en: {
    productDesign: ['Research & evidence', 'Priorities & flows', 'Product experience'],
    aiWorkflow: ['Documented context', 'Assisted execution', 'Human review'],
    designSystems: ['Shared tokens', 'Reusable components', 'Consistent products'],
  },
  fa: {
    productDesign: ['پژوهش و شواهد', 'اولویت‌ها و جریان‌ها', 'تجربه‌ی محصول'],
    aiWorkflow: ['زمینه‌ی مستند', 'اجرای همراه با AI', 'بازبینی انسانی'],
    designSystems: ['توکن‌های مشترک', 'اجزای تکرارپذیر', 'محصولات هماهنگ'],
  },
  ar: {
    productDesign: ['البحث والأدلة', 'الأولويات والمسارات', 'تجربة المنتج'],
    aiWorkflow: ['سياق موثّق', 'تنفيذ بمساعدة AI', 'مراجعة بشرية'],
    designSystems: ['رموز تصميم مشتركة', 'مكوّنات قابلة لإعادة الاستخدام', 'منتجات متسقة'],
  },
  es: {
    productDesign: ['Investigación y evidencia', 'Prioridades y flujos', 'Experiencia de producto'],
    aiWorkflow: ['Contexto documentado', 'Ejecución asistida', 'Revisión humana'],
    designSystems: ['Tokens compartidos', 'Componentes reutilizables', 'Productos coherentes'],
  },
  de: {
    productDesign: ['Recherche und Belege', 'Prioritäten und Abläufe', 'Produkterlebnis'],
    aiWorkflow: ['Dokumentierter Kontext', 'Unterstützte Umsetzung', 'Menschliche Prüfung'],
    designSystems: ['Gemeinsame Tokens', 'Wiederverwendbare Komponenten', 'Konsistente Produkte'],
  },
  fr: {
    productDesign: ['Recherche et preuves', 'Priorités et parcours', 'Expérience produit'],
    aiWorkflow: ['Contexte documenté', 'Exécution assistée', 'Relecture humaine'],
    designSystems: ['Tokens partagés', 'Composants réutilisables', 'Produits cohérents'],
  },
  ja: {
    productDesign: ['調査と根拠', '優先順位とフロー', '製品体験'],
    aiWorkflow: ['文書化した文脈', 'AIによる実行支援', '人によるレビュー'],
    designSystems: ['共通トークン', '再利用できる部品', '一貫した製品'],
  },
}
