<template>
  <div class="av-modal">
    <div class="modal-container">
      <!-- Modal Screen -->
      <transition name="fade">
        <div
          v-if="visible"
          class="modal-screen"
          @click="screenClose && canCloseSelf ? closeModal() : null"
        ></div>
      </transition>

      <!-- Modal Dialog Box -->
      <transition name="slide-fade">
        <div
          v-if="visible"
          class="modal-dialog-container"
        >
          <div class="modal-dialog">
            <!-- Button to close the modal -->
            <svg
              v-if="showClose"
              class="close-modal"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              @click="closeModal()"
            >
              <polygon points="200,26 174,0 100,74 26,0 0,26 74,100 0,174 26,200 100,126 174,200 200,174 126,100 " />
            </svg>

            <!-- Modal Content -->
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvModal',

  props: {
    visible: { default: false },
    includeScreen: { default: true },
    screenClose: { default: true },
    canCloseSelf: { default: true },
    showClose: { default: true }
  },

  methods: {
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  will-change: opacity;
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  // overflow: hidden;
}

.fade-enter {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}


// Router Slide Fade
.slide-fade-enter-active,
.slide-fade-leave-active {
  will-change: transform;
  transition-duration: 0.3s;
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  // overflow: hidden;
}

.slide-fade-enter {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>


