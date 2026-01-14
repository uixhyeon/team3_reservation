<template>
  <div>
    <!-- 리뷰 -->
    <ReviewSection />
    
    <!-- 예약 -->
    <ReservationSection />
    
    <!-- 전시-1 -->
    <Display1Section />
    
    <!-- 전시-2 -->
    <Display2Section />
    
    <!-- 액티비티 -->
    <ActivitySection />
    
    <!-- 케데헌 -->
    <KDHSection />
    
    <!-- 인포메이션 -->
    <InfoSection />
  </div>
</template>

<script setup>
import ReviewSection from '../components/sections/ReviewSection.vue'
import ReservationSection from '../components/sections/ReservationSection.vue'
import Display1Section from '../components/sections/Display1Section.vue'
import Display2Section from '../components/sections/Display2Section.vue'
import ActivitySection from '../components/sections/ActivitySection.vue'
import KDHSection from '../components/sections/KDHSection.vue'
import InfoSection from '../components/sections/InfoSection.vue'
</script>
