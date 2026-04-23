import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  X, 
  Send, 
  MessageCircle, 
  Users, 
  MicOff, 
  Video, 
  Hand, 
  Smile, 
  Calculator,
  Share2,
  Heart
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const FloatingEmoji = ({ emoji, onComplete }) => {
  const anim = useRef(new Animated.Value(0)).current;
  const xOffset = useRef(Math.random() * 100 - 50).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => onComplete());
  }, []);

  const opacity = anim.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0, 1, 1, 0] });
  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -height * 0.4] });
  const scale = anim.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0.5, 1.3, 1.1, 0] });

  return (
    <Animated.Text style={[
      styles.floatingEmoji, 
      { opacity, transform: [{ translateY }, { translateX: xOffset }, { scale }] }
    ]}>
      {emoji}
    </Animated.Text>
  );
};

const StudentLiveLesson = ({ navigation, route }) => {
  const { channel = { teacher: 'Shoxruh Ustoz', title: 'Mental Arifmetika', viewers: 245 } } = route.params || {};
  const [messages, setMessages] = useState([
    { id: '1', user: 'Admin', text: 'Xush kelibsiz! Dars boshlandi.' },
    { id: '2', user: 'Madina', text: 'Assalomu alaykum ustoz!' },
  ]);
  const [inputText, setInputText] = useState('');
  const [emojis, setEmojis] = useState([]);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showAbacus, setShowAbacus] = useState(false);

  const addEmoji = (emoji) => {
    const id = Date.now();
    setEmojis(prev => [...prev, { id, emoji }]);
  };

  const removeEmoji = (id) => {
    setEmojis(prev => prev.filter(e => e.id !== id));
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { id: Date.now().toString(), user: 'Siz', text: inputText }]);
      setInputText('');
    }
  };

  const handleExit = () => {
    Alert.alert(
      "Darsni tark etish",
      "Haqiqatdan ham darsdan chiqmoqchimisiz?",
      [
        { text: "Yo'q", style: 'cancel' },
        { text: "Ha, chiqish", onPress: () => navigation.goBack(), style: 'destructive' }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Live Video Mockup Background */}
      <View style={styles.videoBackground}>
         <Image 
           source={require('../../../assets/live_promo.png')} 
           style={styles.mainVideo} 
           resizeMode="cover" 
         />
         <LinearGradient 
           colors={['rgba(15, 23, 42, 0.7)', 'transparent', 'rgba(15, 23, 42, 0.9)']} 
           style={styles.overlayGradient} 
         />
      </View>

      <SafeAreaView style={styles.contentOverlay}>
         {/* Top HUD - Re-designed for Premium Feel */}
         <View style={styles.header}>
            <BlurView intensity={30} tint="dark" style={styles.metaBlur}>
               <View style={styles.lessonMeta}>
                  <View style={styles.liveBadge}>
                     <View style={styles.pulseDot} />
                     <Text style={styles.liveText}>LIVE</Text>
                  </View>
                  <View>
                     <Text style={styles.teacherName}>{channel.teacher}</Text>
                     <View style={styles.viewerRow}>
                        <Users size={10} color="rgba(255,255,255,0.6)" />
                        <Text style={styles.viewerCount}>{channel.viewers} ishtirokchi</Text>
                     </View>
                  </View>
               </View>
            </BlurView>

            <TouchableOpacity onPress={handleExit} style={styles.closeBtn}>
               <BlurView intensity={40} tint="dark" style={styles.closeBlur}>
                  <X color="white" size={24} />
               </BlurView>
            </TouchableOpacity>
         </View>

         {/* Floating Emojis Layer */}
         <View style={styles.emojiLayer}>
            {emojis.map(e => (
              <FloatingEmoji key={e.id} emoji={e.emoji} onComplete={() => removeEmoji(e.id)} />
            ))}
         </View>

         {/* Central Content (Mini Abacus) - Sci-Fi Design */}
         {showAbacus && (
           <Animated.View style={styles.abacusContainer}>
              <BlurView intensity={60} tint="dark" style={styles.abacusBlur}>
                 <View style={styles.abacusHeader}>
                    <Calculator color={COLORS.primary} size={16} />
                    <Text style={styles.abacusTitle}>VIRTUAL ABAKUS</Text>
                    <TouchableOpacity onPress={() => setShowAbacus(false)}>
                       <X color="white" size={16} />
                    </TouchableOpacity>
                 </View>
                 <View style={styles.abacusMock}>
                    <View style={styles.abacusBeam} />
                    <View style={styles.beadsRow}>
                       {[1, 2, 3, 4, 5, 6].map(i => <View key={i} style={[styles.bead, i === 2 && { backgroundColor: '#F59E0B' }]} />)}
                    </View>
                 </View>
              </BlurView>
           </Animated.View>
         )}

         {/* Bottom Interaction Area - Redesigned Floating Dock */}
         <KeyboardAvoidingView 
           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
           style={styles.footer}
         >
            {/* Chat History Overlay - Glassmorphism */}
            <View style={styles.chatWrapper}>
               <ScrollView 
                 showsVerticalScrollIndicator={false} 
                 contentContainerStyle={styles.chatScroll}
               >
                  {messages.map((m) => (
                    <BlurView key={m.id} intensity={15} tint="light" style={styles.msgItem}>
                       <Text style={styles.msgUser}>{m.user}: </Text>
                       <Text style={styles.msgText}>{m.text}</Text>
                    </BlurView>
                  ))}
               </ScrollView>
            </View>

            {/* Controls Bar - Floating Tablet Style */}
            <View style={styles.controlsBar}>
               <BlurView intensity={40} tint="dark" style={styles.dockBlur}>
                  <View style={styles.inputArea}>
                     <TextInput
                       style={styles.chatInput}
                       placeholder="Savol berish..."
                       placeholderTextColor="rgba(255,255,255,0.4)"
                       value={inputText}
                       onChangeText={setInputText}
                       onSubmitEditing={sendMessage}
                     />
                     <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
                        <Send color="white" size={18} />
                     </TouchableOpacity>
                  </View>
                  
                  <View style={styles.dockSeparator} />

                  <View style={styles.utilityBtns}>
                     <TouchableOpacity 
                       onPress={() => setIsHandRaised(!isHandRaised)}
                       style={[styles.utilBtn, isHandRaised && { backgroundColor: COLORS.primary }]}
                     >
                        <Hand color="white" size={22} fill={isHandRaised ? "white" : "transparent"} />
                     </TouchableOpacity>
                     <TouchableOpacity 
                       onPress={() => setShowAbacus(!showAbacus)}
                       style={[styles.utilBtn, showAbacus && { backgroundColor: COLORS.primary }]}
                     >
                        <Calculator color="white" size={22} />
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => addEmoji('❤️')} style={styles.utilBtn}>
                        <Heart color="#EF4444" size={22} fill="#EF4444" />
                     </TouchableOpacity>
                  </View>
               </BlurView>
            </View>
         </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  videoBackground: { ...StyleSheet.absoluteFillObject },
  mainVideo: { width: '100%', height: '100%' },
  overlayGradient: { ...StyleSheet.absoluteFillObject },
  
  contentOverlay: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, alignItems: 'center' },
  metaBlur: { borderRadius: 20, overflow: 'hidden', paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  lessonMeta: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#EF4444', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  pulseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'white' },
  liveText: { color: 'white', fontSize: 10, fontWeight: '900' },
  teacherName: { color: 'white', fontSize: 15, fontWeight: '800' },
  viewerRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  viewerCount: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '600' },
  
  closeBtn: { borderRadius: 22, overflow: 'hidden' },
  closeBlur: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },

  emojiLayer: { position: 'absolute', bottom: 180, right: 30, height: 300, width: 100, zIndex: 10, pointerEvents: 'none' },
  floatingEmoji: { fontSize: 32, position: 'absolute', bottom: 0 },

  abacusContainer: { position: 'absolute', top: 120, right: 20, width: 220, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', ...SHADOWS.large },
  abacusBlur: { padding: 20 },
  abacusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  abacusTitle: { color: 'white', fontSize: 10, fontWeight: '900', letterSpacing: 2, flex: 1, marginLeft: 10 },
  abacusMock: { height: 80, justifyContent: 'center' },
  abacusBeam: { height: 3, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2 },
  beadsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 },
  bead: { width: 18, height: 18, backgroundColor: COLORS.primary, borderRadius: 9, borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)' },

  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: Platform.OS === 'ios' ? 40 : 25 },
  chatWrapper: { height: 220, paddingHorizontal: 20, marginBottom: 15 },
  chatScroll: { paddingBottom: 20 },
  msgItem: { flexDirection: 'row', marginBottom: 8, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, alignSelf: 'flex-start', overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  msgUser: { color: COLORS.primaryLight, fontSize: 13, fontWeight: '900' },
  msgText: { color: 'white', fontSize: 13, fontWeight: '500' },

  controlsBar: { paddingHorizontal: 15 },
  dockBlur: { flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  inputArea: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 18, paddingLeft: 15, paddingRight: 5, height: 48 },
  chatInput: { flex: 1, color: 'white', fontSize: 14, fontWeight: '600' },
  sendBtn: { width: 38, height: 38, borderRadius: 16, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  
  dockSeparator: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.15)', marginHorizontal: 12 },
  
  utilityBtns: { flexDirection: 'row', gap: 10 },
  utilBtn: { width: 44, height: 44, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
});

export default StudentLiveLesson;
