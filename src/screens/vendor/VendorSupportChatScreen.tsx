import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Phone,
  Send,
  Paperclip,
  CheckCheck,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';

interface Message {
  id: string;
  sender: 'user' | 'support';
  text: string;
  time: string;
}

export const VendorSupportChatScreen = ({ navigation, route }: any) => {
  const { bookingId = 'BK-9824', topic = 'General Support' } = route.params || {};

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'support',
      text: `Hello Ramesh! I am Priya from WashOn Partner Ops. How can I help you regarding Booking #${bookingId}?`,
      time: '11:40 AM',
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
      time: '11:42 AM',
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulated quick support reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'support',
        text: 'Got it! I am looking into the details right now. Please give me 1 minute.',
        time: '11:42 AM',
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Partner Ops Chat</Text>
          <Text style={styles.headerSubtitle}>Online</Text>
        </View>
        <TouchableOpacity
          style={styles.callBtn}
          onPress={() => Alert.alert('Helpline Call', 'Connecting to partner operations desk...')}
        >
          <Phone size={18} color="#059669" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.chatScroll} showsVerticalScrollIndicator={false}>
        {messages.map(m => {
          const isUser = m.sender === 'user';
          return (
            <View
              key={m.id}
              style={[styles.msgRow, isUser ? styles.msgRowUser : styles.msgRowSupport]}
            >
              <View
                style={[
                  styles.bubble,
                  isUser ? styles.bubbleUser : styles.bubbleSupport,
                ]}
              >
                <Text style={[styles.msgText, isUser ? styles.msgTextUser : styles.msgTextSupport]}>
                  {m.text}
                </Text>
                <View style={styles.metaRow}>
                  <Text style={[styles.timeText, isUser ? styles.timeTextUser : styles.timeTextSupport]}>
                    {m.time}
                  </Text>
                  {isUser && <CheckCheck size={12} color="#0F172A" />}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TouchableOpacity
          style={styles.attachBtn}
          onPress={() => Alert.alert('Attach Photo', 'Camera opened to upload screenshot/evidence.')}
        >
          <Paperclip size={20} color="#64748B" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type your message to support..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Send size={18} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
    marginTop: 1,
  },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatScroll: {
    padding: 16,
    paddingBottom: 24,
  },
  msgRow: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  msgRowUser: {
    justifyContent: 'flex-end',
  },
  msgRowSupport: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 14,
  },
  bubbleUser: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 2,
  },
  bubbleSupport: {
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  msgText: {
    fontSize: 13,
    lineHeight: 18,
  },
  msgTextUser: {
    color: '#0F172A',
    fontWeight: '500',
  },
  msgTextSupport: {
    color: '#334155',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
    gap: 4,
  },
  timeText: {
    fontSize: 10,
  },
  timeTextUser: {
    color: 'rgba(15, 23, 42, 0.7)',
  },
  timeTextSupport: {
    color: '#94A3B8',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 8,
  },
  attachBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#F8FAFC',
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
