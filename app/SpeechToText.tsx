import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Voice from '@react-native-voice/voice';

const AutoStartSpeechToTextPage = () => {
  const [text, setText] = useState('');

  const startListening = () => {
    Voice.start('pt-BR');
  };

  useEffect(() => {
    Voice.onSpeechPartialResults = (e) => {
      setText(e.value[0]);
    };

    startListening();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
};

export default AutoStartSpeechToTextPage;