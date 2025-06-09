import React from 'react'
import { View } from 'react-native'
import Svg, { Circle as SvgCircle } from 'react-native-svg'

export const Circle = ({ children = null, width = 100, progress = 0 }) => {
  const strokeWidth = 6
  const radius = (width - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress / 100)

  return (
    <View style={{ width, height: width, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={width} height={width}>
        <SvgCircle
          stroke="#e5e7eb" // Tailwind bg-gray-200
          fill="none"
          cx={width / 2}
          cy={width / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <SvgCircle
          stroke="#3b82f6" // Tailwind blue-500
          fill="none"
          cx={width / 2}
          cy={width / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          originX={width / 2}
          originY={width / 2}
        />
      </Svg>

      {/* Inner white circle & children */}
      <View
        style={{
          position: 'absolute',
          width: width - 15,
          height: width - 15,
          borderRadius: (width - 15) / 2,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </View>
    </View>
  )
}
