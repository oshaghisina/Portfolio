import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CapabilityEvidenceBlock } from '@/blocks/CapabilityEvidence/Component'
import { CapabilityMatrixBlock } from '@/blocks/CapabilityMatrix/Component'
import { CapabilityModelBlock } from '@/blocks/CapabilityModel/Component'
import { CapabilitySpotlightBlock } from '@/blocks/CapabilitySpotlight/Component'
import { CareerJourneyBlock } from '@/blocks/CareerJourney/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { ExperienceCatalogueBlock } from '@/blocks/ExperienceCatalogue/Component'
import { ExperienceTeaserBlock } from '@/blocks/ExperienceTeaser/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MetricsStripBlock } from '@/blocks/MetricsStrip/Component'
import { NowSectionBlock } from '@/blocks/NowSection/Component'
import { PersonalSideBlock } from '@/blocks/PersonalSide/Component'
import { PrinciplesBlock } from '@/blocks/Principles/Component'
import { ProjectArchiveBlock } from '@/blocks/ProjectArchive/Component'
import { SelectedWorkBlock } from '@/blocks/SelectedWork/Component'
import { TeamProcessBlock } from '@/blocks/TeamProcess/Component'
import { ThinkingMapBlock } from '@/blocks/ThinkingMap/Component'
import { TracksBlock } from '@/blocks/Tracks/Component.client'
import { WorkflowStagesBlock } from '@/blocks/WorkflowStages/Component'
import { WorkMosaicBlock } from '@/blocks/WorkMosaic/Component'
import { WorkspaceBlock } from '@/blocks/Workspace/Component'

const blockComponents = {
  archive: ArchiveBlock,
  capabilityEvidence: CapabilityEvidenceBlock,
  capabilityMatrix: CapabilityMatrixBlock,
  capabilityModel: CapabilityModelBlock,
  capabilitySpotlight: CapabilitySpotlightBlock,
  careerJourney: CareerJourneyBlock,
  content: ContentBlock,
  experienceCatalogue: ExperienceCatalogueBlock,
  experienceTeaser: ExperienceTeaserBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  metricsStrip: MetricsStripBlock,
  nowSection: NowSectionBlock,
  personalSide: PersonalSideBlock,
  principles: PrinciplesBlock,
  projectArchive: ProjectArchiveBlock,
  selectedWork: SelectedWorkBlock,
  teamProcess: TeamProcessBlock,
  thinkingMap: ThinkingMapBlock,
  tracks: TracksBlock,
  workflowStages: WorkflowStagesBlock,
  workMosaic: WorkMosaicBlock,
  workspace: WorkspaceBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  locale: Locale
}> = (props) => {
  const { blocks, locale } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                // `first:mt-0` keeps a page that opens straight on a block (no hero, e.g. /work)
                // flush against the header, exactly as the homepage's opener is.
                <div className="my-block first:mt-0" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} locale={locale} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
