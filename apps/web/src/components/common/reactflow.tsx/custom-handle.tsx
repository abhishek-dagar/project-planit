import { Handle, HandleProps } from '@xyflow/react'
import React, { CSSProperties } from 'react'

type Props = HandleProps & { style?: CSSProperties }

const selector = (s: any) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
})

const CustomHandle = (props: Props) => {

  return (
    <Handle
      {...props}
      className="!-bottom-2 !h-4 !w-4 dark:bg-neutral-800"
    />
  )
}

export default CustomHandle