import React, { useCallback, useRef, useState } from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  ViewProps,
  ImageRequireSource,
  ImageURISource,
} from 'react-native';
import DrawCore from '../DrawCore';
import type { DrawItemType, DrawCoreProps } from '../../types';
import CircleSvg from './CircleSvg';
import CloseSvg from './CloseSvg';
import ThrashSvg from './ThrashSvg';
import SendSvg from './SendSvg';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  option: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 30,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  drawOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: '#3a6cff',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  bottomToolBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
});

export default function DrawWithOptions({
  close,
  takeSnapshot,
  linearGradient,
  image,
}: {
  close?: () => void;
  takeSnapshot?: (snap: Promise<string | undefined>) => void;
  linearGradient: React.ComponentType<{ colors: any[] } & ViewProps>;
  image?: ImageRequireSource | ImageURISource;
}) {
  const drawRef = useRef<DrawCoreProps>(null);

  const [drawingMode, setDrawingMode] = useState<DrawItemType>('ellipse');

  const [selectedItem, setSelectedItem] = useState(false);

  const onPressSend = useCallback(() => {
    setDrawingMode('doubleHead');
    if (drawRef.current) {
      
      
      takeSnapshot?.(drawRef.current.takeSnapshot());
    }
  }, [takeSnapshot]);

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Pressable style={styles.option} onPress={close}>
          <CloseSvg height={20} width={20} fill="#ffffff" />
        </Pressable>
        <View style={styles.drawOptions}>
   
  
          
          <Pressable
            style={styles.option}
            onPress={() => {
              setDrawingMode('ellipse');
            }}
          >
            <CircleSvg
              fill="#ffffff"
              height={26}
              width={26}
              opacity={drawingMode === 'ellipse' ? 1 : 0.5}
            />
          </Pressable>

        
        </View>
      </View>
      <DrawCore
        ref={drawRef}
        drawingMode={drawingMode}
        image={image}
        linearGradient={linearGradient}
        onSelectionChange={setSelectedItem}
      />

      <View style={styles.bottomToolBar}>
        {selectedItem ? (
          <Pressable
            style={styles.option}
            onPress={() => {
              drawRef.current?.deleteSelectedItem();
            }}
          >
            <ThrashSvg width={28} height={28} fill="white" />
          </Pressable>
        ) : null}
        <Pressable style={styles.sendButton} onPress={onPressSend}>
          <SendSvg fill="#fff" width={20} height={20} />
        </Pressable>
      </View>
    </View>
  );
}
