'use client'

import { useEffect, useState } from 'react'
import { useClient } from 'sanity'
import type { FieldProps, ImageValue } from 'sanity'
import { Box, Card, Flex, Stack, Text } from '@sanity/ui'

type AssetMeta = {
  size?: number
  mimeType?: string
  originalFilename?: string
  metadata?: { dimensions?: { width: number; height: number } }
}

function formatBytes(bytes: number) {
  const kb = bytes / 1024
  const mb = kb / 1024
  if (mb >= 1) return `${mb.toFixed(2)} MB`
  return `${kb.toFixed(1)} KB`
}

export function ImageFieldWithSize(props: FieldProps) {
  const value = props.value as ImageValue | undefined
  const assetRef = value?.asset?._ref
  const [meta, setMeta] = useState<AssetMeta | null>(null)
  const client = useClient({ apiVersion: '2024-01-01' })

  useEffect(() => {
    if (!assetRef) {
      setMeta(null)
      return
    }
    let cancelled = false
    client
      .fetch<AssetMeta | null>(
        `*[_id == $id][0]{ size, mimeType, originalFilename, metadata { dimensions } }`,
        { id: assetRef }
      )
      .then((res) => {
        if (!cancelled) setMeta(res)
      })
      .catch(() => {
        if (!cancelled) setMeta(null)
      })
    return () => {
      cancelled = true
    }
  }, [assetRef, client])

  const dims = meta?.metadata?.dimensions

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      {meta && (meta.size != null || dims || meta.mimeType) && (
        <Card padding={3} radius={2} tone="transparent" border>
          <Flex gap={4} wrap="wrap">
            {meta.size != null && (
              <Box>
                <Text size={0} weight="medium" muted>SIZE</Text>
                <Box marginTop={2}>
                  <Text size={1}>{formatBytes(meta.size)}</Text>
                </Box>
              </Box>
            )}
            {dims && (
              <Box>
                <Text size={0} weight="medium" muted>DIMENSIONS</Text>
                <Box marginTop={2}>
                  <Text size={1}>{dims.width} × {dims.height}</Text>
                </Box>
              </Box>
            )}
            {meta.mimeType && (
              <Box>
                <Text size={0} weight="medium" muted>TYPE</Text>
                <Box marginTop={2}>
                  <Text size={1}>{meta.mimeType}</Text>
                </Box>
              </Box>
            )}
            {meta.originalFilename && (
              <Box>
                <Text size={0} weight="medium" muted>FILENAME</Text>
                <Box marginTop={2}>
                  <Text size={1}>{meta.originalFilename}</Text>
                </Box>
              </Box>
            )}
          </Flex>
        </Card>
      )}
    </Stack>
  )
}
