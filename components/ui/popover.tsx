import React, { createContext, useContext, useRef, useState } from 'react'
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  LayoutRectangle,
} from 'react-native'

type PopoverState = {
  visible: boolean
  content: React.ReactNode
  position: { top?: number; left?: number; right?: number; bottom?: number }
}

type PopoverContextType = {
  openPopover: (options: { content: React.ReactNode; anchorRef: React.RefObject<View> }) => void
  closePopover: () => void
}

const PopoverContext = createContext<PopoverContextType | null>(null)

export function usePopover() {
  const ctx = useContext(PopoverContext)
  if (!ctx) throw new Error('usePopover must be used within PopoverProvider')
  return ctx
}

export function PopoverProvider({ children }) {
  const [popover, setPopover] = useState<PopoverState>({
    visible: false,
    content: null,
    position: { top: 0, left: 0 },
  })

  const openPopover = ({
    content,
    anchorRef,
  }: {
    content: React.ReactNode
    anchorRef: React.RefObject<View>
  }) => {
    anchorRef.current?.measureInWindow((x, y, width) => {
      setPopover({
        visible: true,
        content,
        position: {
          left: Math.max(Dimensions.get('window').width - 2 * x, x - width),
          bottom: Dimensions.get('window').height - y - 10,
        },
      })
    })
  }

  const closePopover = () => {
    setPopover({ visible: false, content: null, position: { top: 0, left: 0 } })
  }

  return (
    <PopoverContext.Provider value={{ openPopover, closePopover }}>
      {children}

      <Modal
        visible={popover.visible}
        transparent
        animationType="fade"
        onRequestClose={closePopover}
      >
        <TouchableWithoutFeedback onPress={closePopover}>
          <View style={styles.backdrop}>
            <TouchableWithoutFeedback>
              <View style={[styles.popover, popover.position]}>{popover.content}</View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </PopoverContext.Provider>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  popover: {
    position: 'absolute',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
})
