import Link from 'next/link'
import React from 'react'

import { PageFrame } from '@/components/PageFrame'
import { PageOpener } from '@/components/PageOpener'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <PageFrame>
      <PageOpener
        actions={
          <Button asChild variant="default">
            <Link href="/">Go home</Link>
          </Button>
        }
        lede="This page could not be found."
        title="404"
      />
    </PageFrame>
  )
}
