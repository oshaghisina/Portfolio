import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CapabilitiesBlock } from '@/blocks/Capabilities/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { ExperienceCatalogueBlock } from '@/blocks/ExperienceCatalogue/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MetricsStripBlock } from '@/blocks/MetricsStrip/Component'
import { SelectedWorkBlock } from '@/blocks/SelectedWork/Component'
import { WorkflowStagesBlock } from '@/blocks/WorkflowStages/Component'
import { WorkspaceBlock } from '@/blocks/Workspace/Component'

const blockComponents = {
  archive: ArchiveBlock,
  capabilities: CapabilitiesBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  experienceCatalogue: ExperienceCatalogueBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  metricsStrip: MetricsStripBlock,
  selectedWork: SelectedWorkBlock,
  workflowStages: WorkflowStagesBlock,
  workspace: WorkspaceBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

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
                <div className="my-block" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
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
