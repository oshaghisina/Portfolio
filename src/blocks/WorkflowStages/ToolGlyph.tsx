import { Activity, Box, ChartColumn, CodeXml, type LucideIcon, Megaphone, PenTool, Shapes, Sparkles } from 'lucide-react'
import React from 'react'

/**
 * Icon for a tool name in the phone tile grid. Semantic lucide glyphs (what the tool is *for*),
 * not brand marks — the site stays monochrome and nothing is hand-approximated. Only the tools
 * currently seeded are mapped; anything else falls back to a neutral box.
 */
const GLYPHS: Record<string, LucideIcon> = {
  ga4: ChartColumn,
  amplitude: Activity,
  figma: PenTool,
  figjam: Shapes,
  cursor: CodeXml,
  claude: Sparkles,
  'google ads': Megaphone,
}

export const ToolGlyph: React.FC<{ className?: string; name: string }> = ({ className, name }) => {
  const Icon = GLYPHS[name.trim().toLowerCase()] ?? Box
  return <Icon aria-hidden className={className} strokeWidth={1.5} />
}
