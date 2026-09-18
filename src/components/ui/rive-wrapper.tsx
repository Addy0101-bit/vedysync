import pkg from '@rive-app/react-canvas'
import React from 'react'

const { useRive, Layout, Fit, Alignment } = pkg as any;

interface RiveWrapperProps {
  src: string;
  stateMachine: string;
}

export const RiveWrapper = React.memo(({ src, stateMachine }: RiveWrapperProps) => {
  const { RiveComponent } = useRive({
    src,
    stateMachine,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  })

  return <RiveComponent className="w-full h-full" />
})
