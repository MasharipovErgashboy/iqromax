import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, 
  StatusBar, Dimensions, Image, Animated, ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext.js';
import { 
  ArrowLeft, Mic, MicOff, Video, VideoOff, 
  Users, MessageSquare, Shield, X, 
  Monitor, Hand, Share2, MoreHorizontal, Settings,
  Maximize, Minimize2, Cloud
} from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const ParticipantAvatar = ({ id, name, isTalking }) => (
  <View style={styles.participantContainer}>
     <View style={[styles.avatarRing, isTalking && styles.talkingRing]}>
        <Image source={{ uri: `https://i.pravatar.cc/100?u=${id}` }} style={styles.participantImg} />
     </View>
     <View style={styles.participantBadge}>
        <Text style={styles.participantName}>{name}</Text>
     </View>
     {isTalking && <View style={styles.talkingIndicator} />}
  </View>
);

const TeacherLiveLesson = ({ navigation }) => {
  const { isDark, theme } = useTheme();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeTab, setActiveTab] = useState('Chat'); // Chat, Participants

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Background Main Feed */}
      <View style={styles.mainFeed}>
         <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?auto=format&fit=crop&q=80&w=2070' }} 
            style={styles.backgroundImage} 
            blurRadius={20}
         />
         <LinearGradient 
            colors={['rgba(15, 23, 42, 0.4)', 'rgba(15, 23, 42, 0.8)']} 
            style={StyleSheet.absoluteFill} 
         />
         
         {/* Teacher Main Placeholder */}
         <View style={styles.teacherView}>
            <Image source={{ uri: 'https://i.pravatar.cc/500?u=teacher' }} style={styles.teacherImg} />
            <BlurView intensity={30} style={styles.teacherLabel} tint="dark">
               <Text style={styles.teacherLabelText}>Sardor Karimov (Asosiy)</Text>
               <View style={styles.signalDot} />
            </BlurView>
         </View>
      </View>

      {/* Top Controls Overlay */}
      <SafeAreaView style={styles.topControls}>
         <View style={styles.topRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.glassBtn}>
               <ArrowLeft color="white" size={22} />
            </TouchableOpacity>
            
            <View style={styles.lessonBubble}>
               <BlurView intensity={20} style={styles.bubbleInner} tint="light">
                  <View style={styles.liveDot} />
                  <Text style={styles.lessonTitle}>Abakus - Pro daraja</Text>
                  <View style={styles.divider} />
                  <Text style={styles.timer}>00:45:12</Text>
               </BlurView>
            </View>

            <TouchableOpacity style={styles.glassBtn}>
               <Settings color="white" size={22} />
            </TouchableOpacity>
         </View>
      </SafeAreaView>

      {/* Floating Participants Row */}
      <View style={styles.participantsOverlay}>
         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.participantsScroll}>
            {[
              { id: 1, name: 'Alisher', talking: true },
              { id: 2, name: 'Malika', talking: false },
              { id: 3, name: 'Jasur', talking: false },
              { id: 4, name: 'Zahro', talking: false },
              { id: 5, name: 'Bekzod', talking: false },
            ].map((p, index) => (
               <ParticipantAvatar key={index} id={p.id} name={p.name} isTalking={p.talking} />
            ))}
            <TouchableOpacity style={styles.addParticipant}>
               <Users color="white" size={20} />
               <Text style={styles.addText}>+12</Text>
            </TouchableOpacity>
         </ScrollView>
      </View>

      {/* Bottom Actions Overlay */}
      <View style={styles.bottomOverlay}>
         <BlurView intensity={50} style={styles.actionDock} tint="dark">
            <View style={styles.dockRow}>
               <TouchableOpacity 
                 onPress={() => setIsMicOn(!isMicOn)}
                 style={[styles.dockBtn, !isMicOn && styles.dockBtnOff]}
               >
                  {isMicOn ? <Mic color="white" size={24} /> : <MicOff color="#EF4444" size={24} />}
               </TouchableOpacity>

               <TouchableOpacity 
                 onPress={() => setIsCamOn(!isCamOn)}
                 style={[styles.dockBtn, !isCamOn && styles.dockBtnOff]}
               >
                  {isCamOn ? <Video color="white" size={24} /> : <VideoOff color="#EF4444" size={24} />}
               </TouchableOpacity>

               <TouchableOpacity 
                 onPress={() => setIsScreenSharing(!isScreenSharing)}
                 style={[styles.dockBtn, styles.mainAction, isScreenSharing && { backgroundColor: '#10B981' }]}
               >
                  <Monitor color="white" size={28} />
               </TouchableOpacity>

               <TouchableOpacity style={styles.dockBtn}>
                  <MessageSquare color="white" size={24} />
                  <View style={styles.badge} />
               </TouchableOpacity>

               <TouchableOpacity style={[styles.dockBtn, styles.endCall]} onPress={() => navigation.goBack()}>
                  <X color="white" size={24} strokeWidth={3} />
               </TouchableOpacity>
            </View>
         </BlurView>

         {/* Secondary Teacher Tools */}
         <View style={styles.teacherTools}>
            <TouchableOpacity style={styles.toolItem}>
               <Shield color="#4ADE80" size={20} />
               <Text style={styles.toolLabel}>Xavfsiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolItem}>
               <Users color="#60A5FA" size={20} />
               <Text style={styles.toolLabel}>Boshqaruv</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolItem}>
               <Hand color="#FBBF24" size={20} />
               <Text style={styles.toolLabel}>Qo'l ko'tarish</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolItem}>
               <Cloud color="#A78BFA" size={20} />
               <Text style={styles.toolLabel}>Yozib olish</Text>
            </TouchableOpacity>
         </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  mainFeed: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backgroundImage: { ...StyleSheet.absoluteFillObject },
  teacherView: { width: width * 0.9, height: height * 0.45, borderRadius: 32, overflow: 'hidden', ...SHADOWS.dark, elevation: 10 },
  teacherImg: { width: '100%', height: '100%', borderRadius: 32 },
  teacherLabel: { position: 'absolute', bottom: 20, left: 20, paddingHorizontal: 15, paddingVertical: 8, borderRadius: 15, flexDirection: 'row', alignItems: 'center', gap: 8, overflow: 'hidden' },
  teacherLabelText: { color: 'white', fontSize: 13, fontWeight: '800' },
  signalDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4ADE80' },
  topControls: { position: 'absolute', top: 0, left: 0, right: 0 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
  glassBtn: { width: 48, height: 48, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  lessonBubble: { flex: 1, marginHorizontal: 15 },
  bubbleInner: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#EF4444' },
  lessonTitle: { color: 'white', fontSize: 14, fontWeight: '900' },
  divider: { width: 1, height: 12, backgroundColor: 'rgba(255,255,255,0.2)' },
  timer: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '700', fontVariant: ['tabular-nums'] },
  participantsOverlay: { position: 'absolute', top: height * 0.55, left: 0, right: 0 },
  participantsScroll: { paddingHorizontal: 20, gap: 15, paddingBottom: 20 },
  participantContainer: { width: 70, alignItems: 'center', gap: 8 },
  avatarRing: { width: 64, height: 64, borderRadius: 32, padding: 3, backgroundColor: 'rgba(255,255,255,0.1)' },
  talkingRing: { backgroundColor: '#4ADE80' },
  participantImg: { width: '100%', height: '100%', borderRadius: 30 },
  participantBadge: { backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  participantName: { color: 'white', fontSize: 9, fontWeight: '800' },
  talkingIndicator: { position: 'absolute', top: 0, right: 5, width: 12, height: 12, borderRadius: 6, backgroundColor: '#4ADE80', borderWidth: 2, borderColor: '#020617' },
  addParticipant: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', gap: 2, borderStyle: 'dashed', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  addText: { color: 'white', fontSize: 10, fontWeight: '800' },
  bottomOverlay: { position: 'absolute', bottom: 40, left: 20, right: 20 },
  actionDock: { borderRadius: 35, padding: 12, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  dockRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dockBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  dockBtnOff: { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
  mainAction: { backgroundColor: COLORS.secondary, width: 68, height: 68, borderRadius: 34, ...SHADOWS.medium },
  endCall: { backgroundColor: '#EF4444' },
  badge: { position: 'absolute', top: 15, right: 15, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', borderWidth: 1, borderColor: '#020617' },
  teacherTools: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 25, backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: 15, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  toolItem: { alignItems: 'center', gap: 6 },
  toolLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '700' },
});

export default TeacherLiveLesson;
;
